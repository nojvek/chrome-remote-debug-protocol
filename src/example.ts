/// <reference path="../typings/index.d.ts" />

import Crdi from './crdi'
import * as fs from 'fs'

let client: Crdi.DebuggerAdapter;

client.onEnable(() => new Promise((resolve, reject) => {
    resolve()
}))

