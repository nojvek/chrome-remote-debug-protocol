/// <reference path="../typings/index.d.ts" />

import Crdi from './crdi'
import * as fs from 'fs'

let client: Crdi.DebuggerAdapter;

// TODO: build real example of simple client and adapter that works with chrome devtools

client.onEnable(() => new Promise((resolve, reject) => {
    resolve()
}))
