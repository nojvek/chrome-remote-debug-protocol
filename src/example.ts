/// <reference path="../typings/index.d.ts" />

import Crdi from './crdi'
import * as fs from 'fs'
import * as ws from 'ws'

let adapter: Crdi.DebuggerAdapter;
let client: Crdi.DebuggerClient

// TODO: build real example of simple client and adapter that works with chrome devtools

adapter.onEnable(() => new Promise((resolve, reject) => {
    resolve()
}))

export async function hello() { 
    return new Promise<any>(() => {})
}

async function takeHeapTrace() {
    await client.enable()
    await client.disable()
    await Promise.all([client.enable(), client.enable()])
}
takeHeapTrace()