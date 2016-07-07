http = require 'http'
promisify = require 'promisify-node'
fs = promisify 'fs'
fetch = require 'node-fetch'
async = require('es6-simple-async');
exec = require('child_process').exec
log = jake.logger.log
error = jake.logger.error

## Tasks
task 'default', ['download-protocols', 'generate-crdi']

desc 'Download latest protocol.json files from Chromium source and append typescript protocol stub to them'
task 'download-protocols', async: true, async ->
    try
        protocolDefDir = "#{__dirname}/generator/protocolDef"
        protocolDefHeader = "import {IProtocol} from '../protocol'\n" + 'export const protocol: IProtocol = \n'
        jsProtocolStr = protocolDefHeader + yield fetchProtocolJson('https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/platform/v8_inspector/js_protocol.json?format=TEXT')
        browserProtocolStr = protocolDefHeader + yield fetchProtocolJson('https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/inspector/browser_protocol.json?format=TEXT')
        yield fs.writeFile("#{protocolDefDir}/js_protocol.ts", jsProtocolStr ,'utf-8')
        yield fs.writeFile("#{protocolDefDir}/browser_protocol.ts", browserProtocolStr ,'utf-8')
        log("protocolDefs updated")
    catch e
        error(e.message)
    
    complete()

desc 'Generate crdi.ts class from protocol definitions'
task 'generate-crdi', async: true, async ->
    try
        log(yield exc 'tsc -p generator/tsconfig.json')
    catch e
        error(e.message)
    complete()
    # yield exec


### Helpers ### 
fetchProtocolJson = async (url) ->
    log("Downloading #{url}")
    res = yield fetch(url)
    contents = yield res.text()
    # googlesource returns base64 encoded string, so lets decode it
    return Buffer.from(contents, 'base64').toString()

# Promisified version of exec
exc  = (cmd, opts = {}) -> new Promise (resolve, reject) ->
    log (cmd)
    exec cmd, opts, (err, stdout, stderr) ->
        if stdout then return resolve(stdout)
        if stderr then return reject({message: stderr})
        if err then return reject(err)
