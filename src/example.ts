/// <reference path="../typings/index.d.ts" />
import * as WebSocket from 'ws'
import {EventEmitter} from 'events'


interface WsRpcRequest {
    id: number,
    method: string,
    params?: any
}

interface WsRpcResponse {
    id: number,
    method: string,
    result?: any
    error?: {
        code: string,
        message: string
    }
}

interface WsRpcEvent {
    method: string,
    params?: any
}

class WsRpcClient extends EventEmitter {
    private static ConnectTimeout = 5000

    private _address: string
    private _connectedPromise: Promise<WsRpcClient>
    private _webSocket: WebSocket
    private _pendingMessageMap: Map<number, {resolve: Function, reject: Function}> = new Map()
    private _nextMessageId: number = 0

    // We return promise so usage can be something like:
    // client = await WsRpcClient.connect("ws://localhost:9229/node")
    public static connect(address: string): Promise<WsRpcClient> {
        const client = new WsRpcClient(address)
        return client._connectedPromise
    }

    public constructor(address: string){
        super()

        this._address = address
        this._connectedPromise = new Promise((resolve, reject) => {
            try {
                console.log("creating", address)
                this._webSocket = new WebSocket(address)
            } catch (e) {
                return reject(e)
            }

            // If connection is hung, error after timeout
            const webSocket = this._webSocket
            setTimeout(() => reject(new Error('WebSocket connection timed out')), WsRpcClient.ConnectTimeout)

            webSocket.on('error', reject)
            webSocket.on('open', () => {
                // Replace the promise-rejecting handler
                webSocket.removeListener('error', reject)
                webSocket.on('error', e => this.emit('error', e))
                webSocket.on('close', () => this.emit('close'))
                resolve(this)
            })

            webSocket.on('message', messageStr => {
                console.log("<", messageStr)
                let message: WsRpcResponse & WsRpcEvent

                // Ensure JSON is not malformed
                try {
                    message = JSON.parse(messageStr)
                } catch (e) {
                    this.emit('error', e)
                    return
                }

                // All messages will be emitted so host can have a global message handler
                this.emit('message', message)

                if (message.id) {
                    const id = message.id
                    if (this._pendingMessageMap.has(id)) {
                        // Resolve promise from pending message
                        const promise = this._pendingMessageMap.get(id)
                        if (message.result) {
                            promise.resolve(message.result)
                        } else if (message.error) {
                            promise.reject(message.error)
                        } else {
                            this.emit('error', new Error(`Invalid message: ${messageStr}`))
                        }
                    } else {
                        this.emit('error', new Error(`Response with id ${message.id} has no pending request.`))
                    }
                } else if (message.method) {
                    this.emit(message.method, message.params)
                }
            })
        })
    }

    public send(method: string, params?: any): Promise<any> {
        const message: WsRpcRequest = {
            id: ++this._nextMessageId,
            method,
            params
        }

        return new Promise((resolve, reject) => {
            this._pendingMessageMap.set(message.id, {resolve, reject})
            this._connectedPromise.then(() => {
                //TODO: Only log if logging is enabled
                console.log(">", JSON.stringify(message))
                this.emit('send', message);
                this._webSocket.send(JSON.stringify(message))
            })
        })
    }

    public get address(): string {
        return this._address
    }
}


async function main() {
    try {
        //const client = await WsRpcClient.connect("ws://localhost:9222/devtools/page/758107cd-dc4a-4263-b089-e2ef82260125")
        const client = await WsRpcClient.connect("ws://localhost:9229/node")
        client.on('error', (e: Error) => console.log(e));

        await Promise.all([
            client.send("Runtime.enable"),
            client.send("Debugger.enable"),
            //client.send("Console.enable"),
            client.send("Profiler.enable"),
            client.send("Runtime.run")
        ])

        await client.send("Profiler.start")
        setTimeout(() => {
            client.send("Profiler.stop")
        }, 1000)
    } catch (e) {
        console.error(e)
    }
}

main()
