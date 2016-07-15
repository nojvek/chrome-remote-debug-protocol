/// <reference path="../typings/index.d.ts" />
import * as fs from 'fs'
import Crdi from './crdi'
import * as rpc from './websocket-json-rpc'

async function main() {
    try {
        //const client = await WsRpcClient.connect("ws://localhost:9222/devtools/page/758107cd-dc4a-4263-b089-e2ef82260125")
        const client = await rpc.Client.connect("ws://localhost:9229/node")
        //client.on('error', (e: Error) => console.log(e));

        await Promise.all([
            client.send("Runtime.enable"),
            client.send("Debugger.enable"),
            //client.send("Console.enable"),
            client.send("Profiler.enable"),
            client.send("Runtime.run")
        ])

        await client.send("Profiler.start")
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1000 ms
        await client.send("Profiler.stop")

    } catch (e) {
        console.error(e)
    }
}

main()
