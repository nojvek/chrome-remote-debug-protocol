/// <reference path="../typings/index.d.ts" />
import * as fs from 'fs'
import * as http from 'http'
import Crdi from './crdi'
import * as rpc from './websocket-json-rpc'

async function setupClient() {
    try {
        // const client = await WsRpcClient.connect("ws://localhost:9222/devtools/page/758107cd-dc4a-4263-b089-e2ef82260125")
        // const client = await rpc.Client.connect("ws://localhost:9229/node")
        const client = await rpc.Client.connect("ws://localhost:8080")
        const api = client.api()

        //client.on('error', (e: Error) => console.log(e));

        await Promise.all([
            api.Runtime.enable(),
            api.Debugger.enable(),
            api.Profiler.enable(),
            api.Runtime.run(),
        ])

        await api.Profiler.start()
        await new Promise((resolve) => api.Runtime.onExecutionContextDestroyed(resolve)); // Wait for 1000 ms
        await api.Profiler.stop()

    } catch (e) {
        console.error(e)
    }
}

function setupServer() {
    const httpServer = http.createServer();
    const api = new rpc.Server(httpServer).api();
    httpServer.listen(8080, "0.0.0.0")

    const enable = () => {}

    api.Debugger.expose({enable})
    api.Profiler.expose({enable})
    api.Runtime.expose({
        enable,
        run() {}
    })
    api.Profiler.expose({
        hello: "world",
        enable,
        start() {
            setTimeout(() => {
                api.Runtime.emitExecutionContextDestroyed()
            }, 1000)
        },
        stop() {
            console.log(this.hello)
            return {cpu: "yo"}
        }
    })

    // rpcServer.expose("Debugger.enable", () => Promise.resolve())
    // rpcServer.expose("Profiler.enable", () => Promise.resolve())
    // rpcServer.expose("Runtime.enable", () => Promise.resolve())
    // rpcServer.expose("Runtime.run", () => Promise.resolve())
    // rpcServer.expose("Profiler.start", () => Promise.resolve())
    // rpcServer.expose("Profiler.stop", () => Promise.resolve({cpu: "uo"}))




}

setupServer()
setupClient()