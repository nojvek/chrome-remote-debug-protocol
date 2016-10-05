/// <reference path="../typings/index.d.ts" />

import * as fs from 'fs'
import * as path from 'path'
import {IProtocol, Protocol as P} from './protocol'
// Rather than reading json as JSON.parse, we import a typed object
import {protocol as jsProtocol} from './protocolDef/js_protocol'
import {protocol as browserProtocol} from './protocolDef/browser_protocol'


// This is used to hold adapter and client interface definitions
interface ClientServerDef {
    name: string
    client: P.FunctionType
    server: P.FunctionType
}

type ParamOrFunction = P.ParameterType | P.FunctionType

let numIndents = 0
let emitStr = ""

const emit = (str: string) => {
    emitStr += str
}

const emitIndent = () => {
    for (let i = 0; i < numIndents; ++i) {
        emitStr += "    " // 4 spaced indents
    }
}

const emitLine = (str = "") => {
    if (str) {
        emitIndent()
        emit(`${str}\n`)
    } else {
        emit("\n")
    }
}

const emitOpenBlock = (str: string, openChar = ' {') => {
    emitLine(`${str}${openChar}`)
    numIndents++
}

const emitCloseBlock = (closeChar = '}') => {
    numIndents--
    emitLine(closeChar)
}

const emitHeaderComments = () => {
    emitLine("/***********************************************************")
    emitLine(" * Auto-generated by protocolToCrdp. Do not edit manually.")
    emitLine(" ***********************************************************/")
    emitLine()
}

const emitModule = (moduleName:string, domains: P.Domain[]) => {
    moduleName = toTitleCase(moduleName)
    emitHeaderComments()
    emitOpenBlock(`export namespace ${moduleName}`)
    emitGlobalTypeDefs()
    emitInterface(`${moduleName}Client`, domains.map(d => getDomainDef(d.domain, 'Client')))
    emitInterface(`${moduleName}Server`, domains.map(d => getDomainDef(d.domain, 'Server')))
    domains.forEach(emitDomain)
    emitCloseBlock()
    emitLine()
    emitLine(`export default ${moduleName};`)
}

const emitGlobalTypeDefs = () => {
    emitLine()
    emitLine(`export type integer = number`)
}

const emitDomain = (domain: P.Domain) => {
    const domainName = toTitleCase(domain.domain)
    emitLine()
    emitDescription(domain.description)
    emitOpenBlock(`export module ${domainName}`)
    domain.types ? domain.types.forEach(emitType) : null
    const commandDefs = domain.commands ? domain.commands.map(c => emitCommand(c, domainName)) : []
    const eventDefs = domain.events ? domain.events.map(e => emitEvent(e, domainName)) : []
    const functionDefs = commandDefs.concat(eventDefs)
    emitCloseBlock()
    emitInterface(`${domainName}Commands`, commandDefs.map(d => d.client))
    emitInterface(`${domainName}Client extends ${domainName}Commands`, eventDefs.map(d => d.client))
    emitInterface(`${domainName}Server`, eventDefs.concat(commandDefs[0]).map(d => d.server))
}

const getDomainDef = (domainName: string, $ref:string ) => {
    return {name: domainName, $ref: `${domainName}${$ref}`}
}

const formatDescription = (description: string) => `/** ${description.replace(/<code>(.*)<\/code>/g, "'$1'")} */`

const emitDescription = (description: string) => {
    description ? emitLine(formatDescription(description)) : null
}

const getPropertyDef = (prop: P.ParameterType) => {
    if ((<any>prop).type == "function") {
        return `${prop.name}${getPropertyType(prop)}`
    } else  {
        return `${prop.name}${prop.optional ? '?' : ''}: ${getPropertyType(prop)}`
    }
}

const getPropertyType = (prop: any): string  => {
    if (prop.$ref)
        return prop.$ref
    else if (prop.type == 'array')
        return `${getPropertyType(prop.items)}[]`
    else if (prop.type == 'object')
        return `any`
    else if (prop.type == 'function')
        return `(${prop.accepts.map(getPropertyDef).join(', ')}): ${prop.returns || 'void'}`
    else if (prop.type == 'lambda')
        return `(${prop.accepts.map(getPropertyDef).join(', ')}) => ${prop.returns || 'void'}`
    else if (prop.type == 'string' && prop.enum)
        return '(' + prop.enum.map((v: string) => `'${v}'`).join(' | ') + ')'
    return prop.type
}

const emitProperty = (prop: P.ParameterType) => {
    emitDescription(prop.description)
    emitLine(`${getPropertyDef(prop)};`)
    emitLine()
}

const emitInterface = (interfaceName: string, props: ParamOrFunction[], emitNewLine = true): string => {
    emitNewLine ? emitLine() : null
    emitOpenBlock(`export interface ${interfaceName}`)
    props ? props.forEach(emitProperty) : emitLine('[key: string]: string;')
    emitCloseBlock()
    return interfaceName
}

const emitType = (type: P.PropertyType) => {
    emitLine()
    emitDescription(type.description)

    if (type.type === "object") {
        emitInterface(type.id, (<P.ObjectType & P.PropBaseType>type).properties, false)
    } else {
        emitLine(`export type ${type.id} = ${getPropertyType(type)};`)
    }
}

const toTitleCase = (str: string) => str[0].toUpperCase() + str.substr(1)

const emitCommand = (command: P.Command, domain: string): ClientServerDef => {
    const titleCase = toTitleCase(command.name)
    const requestType = command.parameters ? `${domain}.${emitInterface(`${titleCase}Request`, command.parameters)}` : null
    const responseType = command.returns ? `${domain}.${emitInterface(`${titleCase}Response`, command.returns)}` : null
    const paramsDef = requestType ? [{name: 'params', $ref: requestType}] : []
    const methodDef = [{name: 'method', $ref: `'${domain}.${command.name}'`}]

    const clientDef: P.FunctionType = {
        type: 'lambda',
        description: command.description,
        name: command.name,
        optional: true,
        accepts: paramsDef,
        returns: `Promise<${responseType || 'void'}>`
    }

    const serverDef: P.FunctionType = {
        type: "function",
        name: "expose",
        accepts: [
            {name: "domain", $ref: `${domain}Commands`}
        ],
    }

    const commandDef: ClientServerDef = {
        name: command.name,
        client: clientDef,
        server: serverDef
    }

    return commandDef
}

const emitEvent = (event: P.Event, domain: string): ClientServerDef => {
    const titleCase = toTitleCase(event.name)
    const eventType = event.parameters ? `${domain}.${emitInterface(`${titleCase}Event`, event.parameters)}` : ''
    const paramsDef = eventType ? [{name: 'params', $ref: eventType}] : []

    const clientDef: P.FunctionType = {
        type: 'function',
        description: event.description,
        name: `on${titleCase}`,
        accepts: [
            {
                name: "handler",
                type: "lambda",
                accepts: paramsDef
            }
        ],
    }

    const eventDef: ClientServerDef = {
        name: event.name,
        client: clientDef,
        server: Object.assign({}, clientDef, {
            name: `emit${titleCase}`,
            accepts: paramsDef
        })
    }

    return eventDef
}

const emitNames = (names: ClientServerDef[], arrayName: string) => {
    emitLine()
    emitOpenBlock(`export const ${arrayName}: string[] = `, '[')
    names.forEach(s => emitLine(`'${s.name}',`))
    emitCloseBlock(']')
}

/// Main
const destFilePath = `${__dirname}/../lib/crdp.d.ts`
const moduleName = path.basename(destFilePath, ".d.ts")
const protocolDomains: P.Domain[] = jsProtocol.domains.concat(browserProtocol.domains)

emitModule(moduleName, protocolDomains)
console.log(`Writing to ${destFilePath}`)
fs.writeFileSync(destFilePath, emitStr, 'utf-8')
