const fs = require('fs')

const srcFilePath = process.argv[2]
const destFilePath = process.argv[3]
const moduleName = process.argv[4]
let numIndents = 0

if (!srcFilePath || !destFilePath || !moduleName) {
    console.error("Usage: protocolJson2Tsd <somedir/protocol.json> <somedir/protocol.d.ts> <moduleName>")
    process.exit(1)
}

const protocolObj = JSON.parse(fs.readFileSync(srcFilePath))

//console.log(srcFilePath, destFilePath)

const indent = (str) => {
    write(str)
    numIndents++
}

const dedent = (str) => {
    numIndents--
    write(str)
}

const write = (str) => {
    let outStr = "";

    for (let i = 0; i < numIndents; ++i) {
        outStr += "    " // 4 spaced indents
    }
    
    outStr += `${str}`
    console.log(outStr);
}

indent(`declare module '${moduleName}' {`)

for (let domain of protocolObj.domains) {
    write("")
    domain.description ?
        write(`// ${domain.description}`) :
        null    

    indent(`interface I${domain.domain} {`)
    
    for (let command of domain.commands) {
        write("")
        command.description ?
            write(`// ${command.description}`) :
            null

        command.parameters ? 
            write(`${command.name}(${command.parameters.map( p => `${p.name}: ${p.type || p['$ref']}`).join(", ")});`) :
            write(`${command.name}();`)
    }

    dedent("}")
}

dedent("}")
