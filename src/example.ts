/// <reference path="../typings/index.d.ts" />

import Crdi from './crdi'
import * as fs from 'fs'
import * as WebSocket from 'ws'
import {EventEmitter} from 'events'


// // TODO: build real example of simple client and adapter that works with chrome devtools

// adapter.onEnable(() => new Promise((resolve, reject) => {
//     resolve()
// }))

// export async function hello() {
//     return new Promise<any>(() => {})
// }

// async function takeHeapTrace() {
//     await client.enable()
//     await client.disable()
//     await Promise.all([client.enable(), client.enable()])
// }
// takeHeapTrace()

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
                console.log("Response", messageStr)
                const message: WsRpcResponse & WsRpcEvent = JSON.parse(messageStr)

                if (message.id) {
                    // TODO fix parseInt definition in typescript lib.d.ts
                    const id = parseInt(<any>message.id)
                    if (this._pendingMessageMap.has(id)) {
                        // Resolve promise from message
                        const promise = this._pendingMessageMap.get(id)
                        if (message.result) {
                            promise.resolve(message.result)
                        } else if (message.error) {
                            promise.reject(message.error)
                        } else {
                            console.error(`Invalid message: ${messageStr}`)
                        }
                    } else {
                        console.error(`Got a response with id ${message.id} for which there is no pending request.`)
                    }
                } else if (message.method) {
                    this.emit(message.method, message.params)
                }
            })
        })
    }

    public sendMessage(method: string, params?: any): Promise<any> {
        const message: WsRpcRequest = {
            id: ++this._nextMessageId,
            method
        }


        if (params) message.params = params;

        const promise = new Promise((resolve, reject) => {
            this._pendingMessageMap.set(message.id, {resolve, reject})
            this._connectedPromise.then(() => {
                console.log("Request", message)
                this._webSocket.send(JSON.stringify(message))
            })
        })


        return promise
    }

    public get address(): string {
        return this._address
    }
}


async function main() {
    try {
        const client = await WsRpcClient.connect("ws://localhost:9222/devtools/page/758107cd-dc4a-4263-b089-e2ef82260125")
        //const client = await WsRpcClient.connect("ws://localhost:9229/node")

        client.sendMessage("Runtime.enable")
        client.sendMessage("Debugger.enable")
        client.sendMessage("Console.enable")
        await client.sendMessage("Profiler.enable")

    } catch (e) {
        console.error(e)
    }
}

main()
