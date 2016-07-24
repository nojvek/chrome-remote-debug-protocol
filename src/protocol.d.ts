/**  Definition for protocol.json types */
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
        /** Is domain for internal use ? */
        hidden?: boolean
        /** Types used by the domain. */
        types?: PropertyType[]
        /** Commands accepted by the domain */
        commands?: Command[]
        /** Events fired by domain */
        events?: Event[]
        /** Is the domain deprecated for future use? */
        deprecated?: boolean
    }

    export interface Command extends Event {
        returns?: ParameterType[]
        async?: boolean
        redirect?: string
    }

    export interface Event {
        name: string
        description?: string
        parameters?: ParameterType[]
        hidden?: boolean
        handlers?: string[]
        deprecated?: boolean
    }

    type PropertyType = (
        (StringType & PropBaseType) |
        (ObjectType & PropBaseType) |
        (ArrayType & PropBaseType) |
        (PrimitiveType & PropBaseType)
    )

    type ParameterType = (
        (ObjectType & ParamBaseType) |
        (ArrayType & ParamBaseType) |
        (StringType & ParamBaseType) |
        (PrimitiveType & ParamBaseType) |
        (AnyType & ParamBaseType) |
        (RefType & ParamBaseType)
    )

    export interface ArrayType {
        type: "array"
        /** Maps to a typed array e.g string[] */
        items: RefType | PrimitiveType | StringType | AnyType | ObjectType
        /** Cardinality of length of array type */
        minItems?: number
        maxItems?: number
    }

    export interface ObjectType {
        type: "object"
        /** Properties of the type. Maps to a typed object */
        properties?: ParameterType[]
    }

    export interface StringType {
        type: "string"
        /** Possible values of a string. */
        enum?: string[]
    }

    export interface PrimitiveType {
        type: "number" | "integer" | "boolean"
    }

    export interface AnyType {
        type: "any"
    }

    export interface RefType {
        /** Reference to a domain defined type */
        $ref: string
    }

    export interface ParamBaseType extends BaseType {
        /** Name of param */
        name: string
        /** Is the property optional ? */
        optional?: boolean
    }

    export interface PropBaseType extends BaseType {
        /** Name of property */
        id: string
    }

    export interface BaseType {
        /** Description of the type */
        description?: string
        /** ?? */
        hidden?: boolean
        /** Is the api deprecated for future use ? */
        deprecated?: boolean
        /** See: https://codereview.chromium.org/2159633002/ Not sure what it exactly means */
        exported?: boolean
    }

    /** Interface that aids in the generation of client and adapter interfaces */
    export interface FunctionType extends ParamBaseType {
        type: "function" | "lambda"
        accepts?: (FunctionType | ParameterType)[]
        returns?: FunctionType | string
    }
}
