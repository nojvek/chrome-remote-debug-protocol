const promisify = require('promisify-node');
const fs = promisify('fs');
const fetch = require('node-fetch');

getProtocolDefHeader = function(url) {
  return ("// Auto-generated from " + url + "\n") + "import {IProtocol} from '../protocol'\n" + 'export const protocol: IProtocol =\n';
};

async function fetchProtocolJson (url) {
  console.log(`Downloading ${url}`);
  const res = await(fetch(url));
  const contents = await(res.text());
  if (res.ok) {
    return contents;
  } else {
    throw new Error(`${res.status} - ${res.statusText}`);
  }
};

async function downloadProtocolJsons() {
  try{
    jsProtocolUrl = "https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/json/js_protocol.json";
    browserProtocolUrl = "https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/json/browser_protocol.json";
    protocolDefDir = `${__dirname}/src/protocolDef`;
    jsProtocolStr = getProtocolDefHeader(jsProtocolUrl) + await(fetchProtocolJson(jsProtocolUrl));
    browserProtocolStr = getProtocolDefHeader(browserProtocolUrl) + await(fetchProtocolJson(browserProtocolUrl));
    await fs.writeFile(`${protocolDefDir}/js_protocol.ts`, jsProtocolStr ,'utf-8')
    await fs.writeFile(`${protocolDefDir}/browser_protocol.ts`, browserProtocolStr ,'utf-8')
    console.log(`protocolDefs updated at ${protocolDefDir}`);
  } catch (e) {
    console.error(e.message);
  }
}


/// main
downloadProtocolJsons()
