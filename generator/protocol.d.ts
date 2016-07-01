export module Crdi {
    /**  Definition for protocol.js types */
    export interface IProtocol {
        version: Protocol.Version
        domains: Protocol.Domain[]
    }

    export module Protocol {
        export interface Version {
            major: string
            minor: string
        }

        export interface Domain {
            /** Name of domain */
            domain: string
            /**  Description of the domain scope */
            description?: string
            /** Dependencies on other domains */
            dependencies?: string[]
            /** Is domain for internal use ??? */
            hidden?: boolean
            /** Types used by the domain. $ref properties map to a type */
            types?: Type[]
            /** Commands accepted by the domain */
            commands?: Command[]
            /** Events fired by domain */
            events?: Event[]            
        }

        export interface Command extends Event {
            returns?: Type[]
            async?: boolean
            redirect?: string
        }

        export interface Event {
            name: string
            description?: string
            parameters?: Type[]  
            hidden?: boolean
            handlers?: string[]
            deprecated?: boolean                                              
        }

        export interface Type{
            // This needs to be better typed
            /** Name of type */
            id?: string
            /** Name of property */
            name?: string
            /** Type of object */
            type?: "object" | "array" | "string" | "number" | "integer" | "boolean" | "any"
            /** Description of the type */
            description?: string
            /** ??? */
            hidden?: boolean
            /** Properties of the type. Maps to an object interface. Only 'valid for type: 'object */
            properties?: Type[]
            /** Possible values of a string. Only valid for type: 'string' */
            enum?: string[]
            /** Maps to typed Array. Only valid for type: 'array' */
            items?: Type
            /** Reference to a domain defined type */
            $ref?: string
            /** Is the property optional ? */
            optional?: boolean
            /** Cardinality of length of array type */
            minItems?: number
            maxItems?: number
            deprecated?: boolean
        }     
    }
}

export default Crdi