# Chrome Remote Debug Protocol
[![build status](https://travis-ci.org/nojvek/chrome-remote-debug-protocol.svg?branch=master)](https://travis-ci.org/nojvek/chrome-remote-debug-protocol)
[![npm version](https://badge.fury.io/js/chrome-remote-debug-protocol.svg)](https://badge.fury.io/js/chrome-remote-debug-protocol)

## Goals
 * Auto-generate Client interface so third party tools can connect to Chrome, Node and other CRDP compliant servers
 * Auto-generate Server interface so ChromeDevTools can connect to engines other than Chrome and Node

## How

This package is purely a typings typescript d.ts interface that is automatically generated.

It has scripts to download the latest protocol.json files from the [Chromium repo](https://chromium.googlesource.com/), verify structural integrity based on [protocol.d.ts](generator/protocol.d.ts) and generate a crdp.d.ts typescript interface. 

Travis CI runs a nightly job to check that protocol.json from google doesn't have structural breaks. Thanks to this project, a few have already been detected and fixed.

## Usage

crdp.d.ts is a JsonRpc2 compliant interface. It is meant to be used with [noice-json-rpc](https://github.com/nojvek/noice-json-rpc) package.

Rather than callbacks, [noice-json-rpc](https://github.com/nojvek/noice-json-rpc) returns Promises. This means it can be used async-await style. 

[noice-json-rpc](https://github.com/nojvek/noice-json-rpc) also provides a `.api()` to return an ES6 proxy which provides a clean api.Domain.function() calls.

## Building

Checkout this project. Install the dependencies (see [.travis.yml](.travis.yml)) and run

```
npm run download-protocols
npm run generate-crdp
```

## Example

 ```js
import fs from 'fs'
import Crdp from 'chrome-remote-debug-protocol'
import {Client} from 'noice-json-rpc'

// run connects to `node --inspect --debug-brk` process, and profiles the execution of a script
async function run() {
    try {
        // We want the api to be a CrdpClient
        const api:Crdp.CrdpClient = new Client(new WebSocket("ws://localhost:8080"), {logConsole: true}).api()

        // Initialize debugging
        await Promise.all([
            api.Runtime.enable(),
            api.Debugger.enable(),
            api.Profiler.enable(),
            api.Runtime.run(),
        ])

        // Wait until the script finishes
        await new Promise((resolve) => api.Runtime.onExecutionContextDestroyed(resolve))

        // Get the cpuProfile back
        const cpuProfile = await api.Profiler.stop()

        // Save it to a file
        fs.writeFileSync("profile.cpuProfile", JSON.stringify(cpuProfile), 'utf-8')


    } catch (e) {
        console.error(e)
    }
}
run()
 ```

