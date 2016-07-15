import * as WebSocket from 'ws'
import {EventEmitter} from 'events'
import * as JsonRpc from './jsonRpc'

export class Client extends EventEmitter implements JsonRpc.Client{
    private static ConnectTimeout = 5000

    private _address: string
    private _connectedPromise: Promise<Client>
    private _webSocket: WebSocket
    private _pendingMessageMap: Map<number, {resolve: Function, reject: Function}> = new Map()
    private _nextMessageId: number = 0

    public static connect(address: string): Promise<Client> {
        const client = new Client(address)
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
            setTimeout(() => reject(new Error('WebSocket connection timed out')), Client.ConnectTimeout)

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
                let message: JsonRpc.Response & JsonRpc.Notification

                // Ensure JSON is not malformed
                try {
                    message = JSON.parse(messageStr)
                } catch (e) {
                    this.emit('error', e)
                    return
                }

                // Emit message events so host can log if needed
                this.emit('message', message)

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
        const id = ++this._nextMessageId;
        const message: JsonRpc.Request = {id, method, params}

        return new Promise((resolve, reject) => {
            this._pendingMessageMap.set(id, {resolve, reject})
            this._connectedPromise.then(() => {
                console.log(">", JSON.stringify(message))
                this.emit('send', message);
                this._webSocket.send(JSON.stringify(message))
            })
        })
    }

    public notify(method: string, params?: any) {
        const message: JsonRpc.Notification = {method, params}
        this._webSocket.send(JSON.stringify(message))
    }

    public get address(): string {
        return this._address
    }
}
