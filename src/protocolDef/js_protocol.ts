// Auto-generated from https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/json/js_protocol.json
import {IProtocol} from '../protocol'
export const protocol: IProtocol =
{
    "version": {
        "major": "1",
        "minor": "3"
    },
    "domains": [
        {
            "domain": "Console",
            "description": "This domain is deprecated - use Runtime or Log instead.",
            "deprecated": true,
            "dependencies": [
                "Runtime"
            ],
            "types": [
                {
                    "id": "ConsoleMessage",
                    "description": "Console message.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "source",
                            "description": "Message source.",
                            "type": "string",
                            "enum": [
                                "xml",
                                "javascript",
                                "network",
                                "console-api",
                                "storage",
                                "appcache",
                                "rendering",
                                "security",
                                "other",
                                "deprecation",
                                "worker"
                            ]
                        },
                        {
                            "name": "level",
                            "description": "Message severity.",
                            "type": "string",
                            "enum": [
                                "log",
                                "warning",
                                "error",
                                "debug",
                                "info"
                            ]
                        },
                        {
                            "name": "text",
                            "description": "Message text.",
                            "type": "string"
                        },
                        {
                            "name": "url",
                            "description": "URL of the message origin.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "line",
                            "description": "Line number in the resource that generated this message (1-based).",
                            "optional": true,
                            "type": "integer"
                        },
                        {
                            "name": "column",
                            "description": "Column number in the resource that generated this message (1-based).",
                            "optional": true,
                            "type": "integer"
                        }
                    ]
                }
            ],
            "commands": [
                {
                    "name": "clearMessages",
                    "description": "Does nothing."
                },
                {
                    "name": "disable",
                    "description": "Disables console domain, prevents further console messages from being reported to the client."
                },
                {
                    "name": "enable",
                    "description": "Enables console domain, sends the messages collected so far to the client by means of the\n`messageAdded` notification."
                }
            ],
            "events": [
                {
                    "name": "messageAdded",
                    "description": "Issued when new console message is added.",
                    "parameters": [
                        {
                            "name": "message",
                            "description": "Console message that has been added.",
                            "$ref": "ConsoleMessage"
                        }
                    ]
                }
            ]
        },
        {
            "domain": "Debugger",
            "description": "Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing\nbreakpoints, stepping through execution, exploring stack traces, etc.",
            "dependencies": [
                "Runtime"
            ],
            "types": [
                {
                    "id": "BreakpointId",
                    "description": "Breakpoint identifier.",
                    "type": "string"
                },
                {
                    "id": "CallFrameId",
                    "description": "Call frame identifier.",
                    "type": "string"
                },
                {
                    "id": "Location",
                    "description": "Location in the source code.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "scriptId",
                            "description": "Script identifier as reported in the `Debugger.scriptParsed`.",
                            "$ref": "Runtime.ScriptId"
                        },
                        {
                            "name": "lineNumber",
                            "description": "Line number in the script (0-based).",
                            "type": "integer"
                        },
                        {
                            "name": "columnNumber",
                            "description": "Column number in the script (0-based).",
                            "optional": true,
                            "type": "integer"
                        }
                    ]
                },
                {
                    "id": "ScriptPosition",
                    "description": "Location in the source code.",
                    "experimental": true,
                    "type": "object",
                    "properties": [
                        {
                            "name": "lineNumber",
                            "type": "integer"
                        },
                        {
                            "name": "columnNumber",
                            "type": "integer"
                        }
                    ]
                },
                {
                    "id": "CallFrame",
                    "description": "JavaScript call frame. Array of call frames form the call stack.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "callFrameId",
                            "description": "Call frame identifier. This identifier is only valid while the virtual machine is paused.",
                            "$ref": "CallFrameId"
                        },
                        {
                            "name": "functionName",
                            "description": "Name of the JavaScript function called on this call frame.",
                            "type": "string"
                        },
                        {
                            "name": "functionLocation",
                            "description": "Location in the source code.",
                            "optional": true,
                            "$ref": "Location"
                        },
                        {
                            "name": "location",
                            "description": "Location in the source code.",
                            "$ref": "Location"
                        },
                        {
                            "name": "url",
                            "description": "JavaScript script name or url.",
                            "type": "string"
                        },
                        {
                            "name": "scopeChain",
                            "description": "Scope chain for this call frame.",
                            "type": "array",
                            "items": {
                                "$ref": "Scope"
                            }
                        },
                        {
                            "name": "this",
                            "description": "`this` object for this call frame.",
                            "$ref": "Runtime.RemoteObject"
                        },
                        {
                            "name": "returnValue",
                            "description": "The value being returned, if the function is at return point.",
                            "optional": true,
                            "$ref": "Runtime.RemoteObject"
                        }
                    ]
                },
                {
                    "id": "Scope",
                    "description": "Scope description.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "type",
                            "description": "Scope type.",
                            "type": "string",
                            "enum": [
                                "global",
                                "local",
                                "with",
                                "closure",
                                "catch",
                                "block",
                                "script",
                                "eval",
                                "module"
                            ]
                        },
                        {
                            "name": "object",
                            "description": "Object representing the scope. For `global` and `with` scopes it represents the actual\nobject; for the rest of the scopes, it is artificial transient object enumerating scope\nvariables as its properties.",
                            "$ref": "Runtime.RemoteObject"
                        },
                        {
                            "name": "name",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "startLocation",
                            "description": "Location in the source code where scope starts",
                            "optional": true,
                            "$ref": "Location"
                        },
                        {
                            "name": "endLocation",
                            "description": "Location in the source code where scope ends",
                            "optional": true,
                            "$ref": "Location"
                        }
                    ]
                },
                {
                    "id": "SearchMatch",
                    "description": "Search match for resource.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "lineNumber",
                            "description": "Line number in resource content.",
                            "type": "number"
                        },
                        {
                            "name": "lineContent",
                            "description": "Line with match content.",
                            "type": "string"
                        }
                    ]
                },
                {
                    "id": "BreakLocation",
                    "type": "object",
                    "properties": [
                        {
                            "name": "scriptId",
                            "description": "Script identifier as reported in the `Debugger.scriptParsed`.",
                            "$ref": "Runtime.ScriptId"
                        },
                        {
                            "name": "lineNumber",
                            "description": "Line number in the script (0-based).",
                            "type": "integer"
                        },
                        {
                            "name": "columnNumber",
                            "description": "Column number in the script (0-based).",
                            "optional": true,
                            "type": "integer"
                        },
                        {
                            "name": "type",
                            "optional": true,
                            "type": "string",
                            "enum": [
                                "debuggerStatement",
                                "call",
                                "return"
                            ]
                        }
                    ]
                }
            ],
            "commands": [
                {
                    "name": "continueToLocation",
                    "description": "Continues execution until specific location is reached.",
                    "parameters": [
                        {
                            "name": "location",
                            "description": "Location to continue to.",
                            "$ref": "Location"
                        },
                        {
                            "name": "targetCallFrames",
                            "optional": true,
                            "type": "string",
                            "enum": [
                                "any",
                                "current"
                            ]
                        }
                    ]
                },
                {
                    "name": "disable",
                    "description": "Disables debugger for given page."
                },
                {
                    "name": "enable",
                    "description": "Enables debugger for the given page. Clients should not assume that the debugging has been\nenabled until the result for this command is received.",
                    "returns": [
                        {
                            "name": "debuggerId",
                            "description": "Unique identifier of the debugger.",
                            "experimental": true,
                            "$ref": "Runtime.UniqueDebuggerId"
                        }
                    ]
                },
                {
                    "name": "evaluateOnCallFrame",
                    "description": "Evaluates expression on a given call frame.",
                    "parameters": [
                        {
                            "name": "callFrameId",
                            "description": "Call frame identifier to evaluate on.",
                            "$ref": "CallFrameId"
                        },
                        {
                            "name": "expression",
                            "description": "Expression to evaluate.",
                            "type": "string"
                        },
                        {
                            "name": "objectGroup",
                            "description": "String object group name to put result into (allows rapid releasing resulting object handles\nusing `releaseObjectGroup`).",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "includeCommandLineAPI",
                            "description": "Specifies whether command line API should be available to the evaluated expression, defaults\nto false.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "silent",
                            "description": "In silent mode exceptions thrown during evaluation are not reported and do not pause\nexecution. Overrides `setPauseOnException` state.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "returnByValue",
                            "description": "Whether the result is expected to be a JSON object that should be sent by value.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "generatePreview",
                            "description": "Whether preview should be generated for the result.",
                            "experimental": true,
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "throwOnSideEffect",
                            "description": "Whether to throw an exception if side effect cannot be ruled out during evaluation.",
                            "optional": true,
                            "type": "boolean"
                        }
                    ],
                    "returns": [
                        {
                            "name": "result",
                            "description": "Object wrapper for the evaluation result.",
                            "$ref": "Runtime.RemoteObject"
                        },
                        {
                            "name": "exceptionDetails",
                            "description": "Exception details.",
                            "optional": true,
                            "$ref": "Runtime.ExceptionDetails"
                        }
                    ]
                },
                {
                    "name": "getPossibleBreakpoints",
                    "description": "Returns possible locations for breakpoint. scriptId in start and end range locations should be\nthe same.",
                    "parameters": [
                        {
                            "name": "start",
                            "description": "Start of range to search possible breakpoint locations in.",
                            "$ref": "Location"
                        },
                        {
                            "name": "end",
                            "description": "End of range to search possible breakpoint locations in (excluding). When not specified, end\nof scripts is used as end of range.",
                            "optional": true,
                            "$ref": "Location"
                        },
                        {
                            "name": "restrictToFunction",
                            "description": "Only consider locations which are in the same (non-nested) function as start.",
                            "optional": true,
                            "type": "boolean"
                        }
                    ],
                    "returns": [
                        {
                            "name": "locations",
                            "description": "List of the possible breakpoint locations.",
                            "type": "array",
                            "items": {
                                "$ref": "BreakLocation"
                            }
                        }
                    ]
                },
                {
                    "name": "getScriptSource",
                    "description": "Returns source for the script with given id.",
                    "parameters": [
                        {
                            "name": "scriptId",
                            "description": "Id of the script to get source for.",
                            "$ref": "Runtime.ScriptId"
                        }
                    ],
                    "returns": [
                        {
                            "name": "scriptSource",
                            "description": "Script source.",
                            "type": "string"
                        }
                    ]
                },
                {
                    "name": "getStackTrace",
                    "description": "Returns stack trace with given `stackTraceId`.",
                    "experimental": true,
                    "parameters": [
                        {
                            "name": "stackTraceId",
                            "$ref": "Runtime.StackTraceId"
                        }
                    ],
                    "returns": [
                        {
                            "name": "stackTrace",
                            "$ref": "Runtime.StackTrace"
                        }
                    ]
                },
                {
                    "name": "pause",
                    "description": "Stops on the next JavaScript statement."
                },
                {
                    "name": "pauseOnAsyncCall",
                    "experimental": true,
                    "parameters": [
                        {
                            "name": "parentStackTraceId",
                            "description": "Debugger will pause when async call with given stack trace is started.",
                            "$ref": "Runtime.StackTraceId"
                        }
                    ]
                },
                {
                    "name": "removeBreakpoint",
                    "description": "Removes JavaScript breakpoint.",
                    "parameters": [
                        {
                            "name": "breakpointId",
                            "$ref": "BreakpointId"
                        }
                    ]
                },
                {
                    "name": "restartFrame",
                    "description": "Restarts particular call frame from the beginning.",
                    "parameters": [
                        {
                            "name": "callFrameId",
                            "description": "Call frame identifier to evaluate on.",
                            "$ref": "CallFrameId"
                        }
                    ],
                    "returns": [
                        {
                            "name": "callFrames",
                            "description": "New stack trace.",
                            "type": "array",
                            "items": {
                                "$ref": "CallFrame"
                            }
                        },
                        {
                            "name": "asyncStackTrace",
                            "description": "Async stack trace, if any.",
                            "optional": true,
                            "$ref": "Runtime.StackTrace"
                        },
                        {
                            "name": "asyncStackTraceId",
                            "description": "Async stack trace, if any.",
                            "experimental": true,
                            "optional": true,
                            "$ref": "Runtime.StackTraceId"
                        }
                    ]
                },
                {
                    "name": "resume",
                    "description": "Resumes JavaScript execution."
                },
                {
                    "name": "scheduleStepIntoAsync",
                    "description": "This method is deprecated - use Debugger.stepInto with breakOnAsyncCall and\nDebugger.pauseOnAsyncTask instead. Steps into next scheduled async task if any is scheduled\nbefore next pause. Returns success when async task is actually scheduled, returns error if no\ntask were scheduled or another scheduleStepIntoAsync was called.",
                    "experimental": true
                },
                {
                    "name": "searchInContent",
                    "description": "Searches for given string in script content.",
                    "parameters": [
                        {
                            "name": "scriptId",
                            "description": "Id of the script to search in.",
                            "$ref": "Runtime.ScriptId"
                        },
                        {
                            "name": "query",
                            "description": "String to search for.",
                            "type": "string"
                        },
                        {
                            "name": "caseSensitive",
                            "description": "If true, search is case sensitive.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "isRegex",
                            "description": "If true, treats string parameter as regex.",
                            "optional": true,
                            "type": "boolean"
                        }
                    ],
                    "returns": [
                        {
                            "name": "result",
                            "description": "List of search matches.",
                            "type": "array",
                            "items": {
                                "$ref": "SearchMatch"
                            }
                        }
                    ]
                },
                {
                    "name": "setAsyncCallStackDepth",
                    "description": "Enables or disables async call stacks tracking.",
                    "parameters": [
                        {
                            "name": "maxDepth",
                            "description": "Maximum depth of async call stacks. Setting to `0` will effectively disable collecting async\ncall stacks (default).",
                            "type": "integer"
                        }
                    ]
                },
                {
                    "name": "setBlackboxPatterns",
                    "description": "Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing in\nscripts with url matching one of the patterns. VM will try to leave blackboxed script by\nperforming 'step in' several times, finally resorting to 'step out' if unsuccessful.",
                    "experimental": true,
                    "parameters": [
                        {
                            "name": "patterns",
                            "description": "Array of regexps that will be used to check script url for blackbox state.",
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    ]
                },
                {
                    "name": "setBlackboxedRanges",
                    "description": "Makes backend skip steps in the script in blackboxed ranges. VM will try leave blacklisted\nscripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.\nPositions array contains positions where blackbox state is changed. First interval isn't\nblackboxed. Array should be sorted.",
                    "experimental": true,
                    "parameters": [
                        {
                            "name": "scriptId",
                            "description": "Id of the script.",
                            "$ref": "Runtime.ScriptId"
                        },
                        {
                            "name": "positions",
                            "type": "array",
                            "items": {
                                "$ref": "ScriptPosition"
                            }
                        }
                    ]
                },
                {
                    "name": "setBreakpoint",
                    "description": "Sets JavaScript breakpoint at a given location.",
                    "parameters": [
                        {
                            "name": "location",
                            "description": "Location to set breakpoint in.",
                            "$ref": "Location"
                        },
                        {
                            "name": "condition",
                            "description": "Expression to use as a breakpoint condition. When specified, debugger will only stop on the\nbreakpoint if this expression evaluates to true.",
                            "optional": true,
                            "type": "string"
                        }
                    ],
                    "returns": [
                        {
                            "name": "breakpointId",
                            "description": "Id of the created breakpoint for further reference.",
                            "$ref": "BreakpointId"
                        },
                        {
                            "name": "actualLocation",
                            "description": "Location this breakpoint resolved into.",
                            "$ref": "Location"
                        }
                    ]
                },
                {
                    "name": "setBreakpointByUrl",
                    "description": "Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this\ncommand is issued, all existing parsed scripts will have breakpoints resolved and returned in\n`locations` property. Further matching script parsing will result in subsequent\n`breakpointResolved` events issued. This logical breakpoint will survive page reloads.",
                    "parameters": [
                        {
                            "name": "lineNumber",
                            "description": "Line number to set breakpoint at.",
                            "type": "integer"
                        },
                        {
                            "name": "url",
                            "description": "URL of the resources to set breakpoint on.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "urlRegex",
                            "description": "Regex pattern for the URLs of the resources to set breakpoints on. Either `url` or\n`urlRegex` must be specified.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "scriptHash",
                            "description": "Script hash of the resources to set breakpoint on.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "columnNumber",
                            "description": "Offset in the line to set breakpoint at.",
                            "optional": true,
                            "type": "integer"
                        },
                        {
                            "name": "condition",
                            "description": "Expression to use as a breakpoint condition. When specified, debugger will only stop on the\nbreakpoint if this expression evaluates to true.",
                            "optional": true,
                            "type": "string"
                        }
                    ],
                    "returns": [
                        {
                            "name": "breakpointId",
                            "description": "Id of the created breakpoint for further reference.",
                            "$ref": "BreakpointId"
                        },
                        {
                            "name": "locations",
                            "description": "List of the locations this breakpoint resolved into upon addition.",
                            "type": "array",
                            "items": {
                                "$ref": "Location"
                            }
                        }
                    ]
                },
                {
                    "name": "setBreakpointOnFunctionCall",
                    "description": "Sets JavaScript breakpoint before each call to the given function.\nIf another function was created from the same source as a given one,\ncalling it will also trigger the breakpoint.",
                    "experimental": true,
                    "parameters": [
                        {
                            "name": "objectId",
                            "description": "Function object id.",
                            "$ref": "Runtime.RemoteObjectId"
                        },
                        {
                            "name": "condition",
                            "description": "Expression to use as a breakpoint condition. When specified, debugger will\nstop on the breakpoint if this expression evaluates to true.",
                            "optional": true,
                            "type": "string"
                        }
                    ],
                    "returns": [
                        {
                            "name": "breakpointId",
                            "description": "Id of the created breakpoint for further reference.",
                            "$ref": "BreakpointId"
                        }
                    ]
                },
                {
                    "name": "setBreakpointsActive",
                    "description": "Activates / deactivates all breakpoints on the page.",
                    "parameters": [
                        {
                            "name": "active",
                            "description": "New value for breakpoints active state.",
                            "type": "boolean"
                        }
                    ]
                },
                {
                    "name": "setPauseOnExceptions",
                    "description": "Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or\nno exceptions. Initial pause on exceptions state is `none`.",
                    "parameters": [
                        {
                            "name": "state",
                            "description": "Pause on exceptions mode.",
                            "type": "string",
                            "enum": [
                                "none",
                                "uncaught",
                                "all"
                            ]
                        }
                    ]
                },
                {
                    "name": "setReturnValue",
                    "description": "Changes return value in top frame. Available only at return break position.",
                    "experimental": true,
                    "parameters": [
                        {
                            "name": "newValue",
                            "description": "New return value.",
                            "$ref": "Runtime.CallArgument"
                        }
                    ]
                },
                {
                    "name": "setScriptSource",
                    "description": "Edits JavaScript source live.",
                    "parameters": [
                        {
                            "name": "scriptId",
                            "description": "Id of the script to edit.",
                            "$ref": "Runtime.ScriptId"
                        },
                        {
                            "name": "scriptSource",
                            "description": "New content of the script.",
                            "type": "string"
                        },
                        {
                            "name": "dryRun",
                            "description": "If true the change will not actually be applied. Dry run may be used to get result\ndescription without actually modifying the code.",
                            "optional": true,
                            "type": "boolean"
                        }
                    ],
                    "returns": [
                        {
                            "name": "callFrames",
                            "description": "New stack trace in case editing has happened while VM was stopped.",
                            "optional": true,
                            "type": "array",
                            "items": {
                                "$ref": "CallFrame"
                            }
                        },
                        {
                            "name": "stackChanged",
                            "description": "Whether current call stack  was modified after applying the changes.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "asyncStackTrace",
                            "description": "Async stack trace, if any.",
                            "optional": true,
                            "$ref": "Runtime.StackTrace"
                        },
                        {
                            "name": "asyncStackTraceId",
                            "description": "Async stack trace, if any.",
                            "experimental": true,
                            "optional": true,
                            "$ref": "Runtime.StackTraceId"
                        },
                        {
                            "name": "exceptionDetails",
                            "description": "Exception details if any.",
                            "optional": true,
                            "$ref": "Runtime.ExceptionDetails"
                        }
                    ]
                },
                {
                    "name": "setSkipAllPauses",
                    "description": "Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).",
                    "parameters": [
                        {
                            "name": "skip",
                            "description": "New value for skip pauses state.",
                            "type": "boolean"
                        }
                    ]
                },
                {
                    "name": "setVariableValue",
                    "description": "Changes value of variable in a callframe. Object-based scopes are not supported and must be\nmutated manually.",
                    "parameters": [
                        {
                            "name": "scopeNumber",
                            "description": "0-based number of scope as was listed in scope chain. Only 'local', 'closure' and 'catch'\nscope types are allowed. Other scopes could be manipulated manually.",
                            "type": "integer"
                        },
                        {
                            "name": "variableName",
                            "description": "Variable name.",
                            "type": "string"
                        },
                        {
                            "name": "newValue",
                            "description": "New variable value.",
                            "$ref": "Runtime.CallArgument"
                        },
                        {
                            "name": "callFrameId",
                            "description": "Id of callframe that holds variable.",
                            "$ref": "CallFrameId"
                        }
                    ]
                },
                {
                    "name": "stepInto",
                    "description": "Steps into the function call.",
                    "parameters": [
                        {
                            "name": "breakOnAsyncCall",
                            "description": "Debugger will issue additional Debugger.paused notification if any async task is scheduled\nbefore next pause.",
                            "experimental": true,
                            "optional": true,
                            "type": "boolean"
                        }
                    ]
                },
                {
                    "name": "stepOut",
                    "description": "Steps out of the function call."
                },
                {
                    "name": "stepOver",
                    "description": "Steps over the statement."
                }
            ],
            "events": [
                {
                    "name": "breakpointResolved",
                    "description": "Fired when breakpoint is resolved to an actual script and location.",
                    "parameters": [
                        {
                            "name": "breakpointId",
                            "description": "Breakpoint unique identifier.",
                            "$ref": "BreakpointId"
                        },
                        {
                            "name": "location",
                            "description": "Actual breakpoint location.",
                            "$ref": "Location"
                        }
                    ]
                },
                {
                    "name": "paused",
                    "description": "Fired when the virtual machine stopped on breakpoint or exception or any other stop criteria.",
                    "parameters": [
                        {
                            "name": "callFrames",
                            "description": "Call stack the virtual machine stopped on.",
                            "type": "array",
                            "items": {
                                "$ref": "CallFrame"
                            }
                        },
                        {
                            "name": "reason",
                            "description": "Pause reason.",
                            "type": "string",
                            "enum": [
                                "XHR",
                                "DOM",
                                "EventListener",
                                "exception",
                                "assert",
                                "debugCommand",
                                "promiseRejection",
                                "OOM",
                                "other",
                                "ambiguous"
                            ]
                        },
                        {
                            "name": "data",
                            "description": "Object containing break-specific auxiliary properties.",
                            "optional": true,
                            "type": "object"
                        },
                        {
                            "name": "hitBreakpoints",
                            "description": "Hit breakpoints IDs",
                            "optional": true,
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        {
                            "name": "asyncStackTrace",
                            "description": "Async stack trace, if any.",
                            "optional": true,
                            "$ref": "Runtime.StackTrace"
                        },
                        {
                            "name": "asyncStackTraceId",
                            "description": "Async stack trace, if any.",
                            "experimental": true,
                            "optional": true,
                            "$ref": "Runtime.StackTraceId"
                        },
                        {
                            "name": "asyncCallStackTraceId",
                            "description": "Just scheduled async call will have this stack trace as parent stack during async execution.\nThis field is available only after `Debugger.stepInto` call with `breakOnAsynCall` flag.",
                            "experimental": true,
                            "optional": true,
                            "$ref": "Runtime.StackTraceId"
                        }
                    ]
                },
                {
                    "name": "resumed",
                    "description": "Fired when the virtual machine resumed execution."
                },
                {
                    "name": "scriptFailedToParse",
                    "description": "Fired when virtual machine fails to parse the script.",
                    "parameters": [
                        {
                            "name": "scriptId",
                            "description": "Identifier of the script parsed.",
                            "$ref": "Runtime.ScriptId"
                        },
                        {
                            "name": "url",
                            "description": "URL or name of the script parsed (if any).",
                            "type": "string"
                        },
                        {
                            "name": "startLine",
                            "description": "Line offset of the script within the resource with given URL (for script tags).",
                            "type": "integer"
                        },
                        {
                            "name": "startColumn",
                            "description": "Column offset of the script within the resource with given URL.",
                            "type": "integer"
                        },
                        {
                            "name": "endLine",
                            "description": "Last line of the script.",
                            "type": "integer"
                        },
                        {
                            "name": "endColumn",
                            "description": "Length of the last line of the script.",
                            "type": "integer"
                        },
                        {
                            "name": "executionContextId",
                            "description": "Specifies script creation context.",
                            "$ref": "Runtime.ExecutionContextId"
                        },
                        {
                            "name": "hash",
                            "description": "Content hash of the script.",
                            "type": "string"
                        },
                        {
                            "name": "executionContextAuxData",
                            "description": "Embedder-specific auxiliary data.",
                            "optional": true,
                            "type": "object"
                        },
                        {
                            "name": "sourceMapURL",
                            "description": "URL of source map associated with script (if any).",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "hasSourceURL",
                            "description": "True, if this script has sourceURL.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "isModule",
                            "description": "True, if this script is ES6 module.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "length",
                            "description": "This script length.",
                            "optional": true,
                            "type": "integer"
                        },
                        {
                            "name": "stackTrace",
                            "description": "JavaScript top stack frame of where the script parsed event was triggered if available.",
                            "experimental": true,
                            "optional": true,
                            "$ref": "Runtime.StackTrace"
                        }
                    ]
                },
                {
                    "name": "scriptParsed",
                    "description": "Fired when virtual machine parses script. This event is also fired for all known and uncollected\nscripts upon enabling debugger.",
                    "parameters": [
                        {
                            "name": "scriptId",
                            "description": "Identifier of the script parsed.",
                            "$ref": "Runtime.ScriptId"
                        },
                        {
                            "name": "url",
                            "description": "URL or name of the script parsed (if any).",
                            "type": "string"
                        },
                        {
                            "name": "startLine",
                            "description": "Line offset of the script within the resource with given URL (for script tags).",
                            "type": "integer"
                        },
                        {
                            "name": "startColumn",
                            "description": "Column offset of the script within the resource with given URL.",
                            "type": "integer"
                        },
                        {
                            "name": "endLine",
                            "description": "Last line of the script.",
                            "type": "integer"
                        },
                        {
                            "name": "endColumn",
                            "description": "Length of the last line of the script.",
                            "type": "integer"
                        },
                        {
                            "name": "executionContextId",
                            "description": "Specifies script creation context.",
                            "$ref": "Runtime.ExecutionContextId"
                        },
                        {
                            "name": "hash",
                            "description": "Content hash of the script.",
                            "type": "string"
                        },
                        {
                            "name": "executionContextAuxData",
                            "description": "Embedder-specific auxiliary data.",
                            "optional": true,
                            "type": "object"
                        },
                        {
                            "name": "isLiveEdit",
                            "description": "True, if this script is generated as a result of the live edit operation.",
                            "experimental": true,
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "sourceMapURL",
                            "description": "URL of source map associated with script (if any).",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "hasSourceURL",
                            "description": "True, if this script has sourceURL.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "isModule",
                            "description": "True, if this script is ES6 module.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "length",
                            "description": "This script length.",
                            "optional": true,
                            "type": "integer"
                        },
                        {
                            "name": "stackTrace",
                            "description": "JavaScript top stack frame of where the script parsed event was triggered if available.",
                            "experimental": true,
                            "optional": true,
                            "$ref": "Runtime.StackTrace"
                        }
                    ]
                }
            ]
        },
        {
            "domain": "HeapProfiler",
            "experimental": true,
            "dependencies": [
                "Runtime"
            ],
            "types": [
                {
                    "id": "HeapSnapshotObjectId",
                    "description": "Heap snapshot object id.",
                    "type": "string"
                },
                {
                    "id": "SamplingHeapProfileNode",
                    "description": "Sampling Heap Profile node. Holds callsite information, allocation statistics and child nodes.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "callFrame",
                            "description": "Function location.",
                            "$ref": "Runtime.CallFrame"
                        },
                        {
                            "name": "selfSize",
                            "description": "Allocations size in bytes for the node excluding children.",
                            "type": "number"
                        },
                        {
                            "name": "children",
                            "description": "Child nodes.",
                            "type": "array",
                            "items": {
                                "$ref": "SamplingHeapProfileNode"
                            }
                        }
                    ]
                },
                {
                    "id": "SamplingHeapProfile",
                    "description": "Profile.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "head",
                            "$ref": "SamplingHeapProfileNode"
                        }
                    ]
                }
            ],
            "commands": [
                {
                    "name": "addInspectedHeapObject",
                    "description": "Enables console to refer to the node with given id via $x (see Command Line API for more details\n$x functions).",
                    "parameters": [
                        {
                            "name": "heapObjectId",
                            "description": "Heap snapshot object id to be accessible by means of $x command line API.",
                            "$ref": "HeapSnapshotObjectId"
                        }
                    ]
                },
                {
                    "name": "collectGarbage"
                },
                {
                    "name": "disable"
                },
                {
                    "name": "enable"
                },
                {
                    "name": "getHeapObjectId",
                    "parameters": [
                        {
                            "name": "objectId",
                            "description": "Identifier of the object to get heap object id for.",
                            "$ref": "Runtime.RemoteObjectId"
                        }
                    ],
                    "returns": [
                        {
                            "name": "heapSnapshotObjectId",
                            "description": "Id of the heap snapshot object corresponding to the passed remote object id.",
                            "$ref": "HeapSnapshotObjectId"
                        }
                    ]
                },
                {
                    "name": "getObjectByHeapObjectId",
                    "parameters": [
                        {
                            "name": "objectId",
                            "$ref": "HeapSnapshotObjectId"
                        },
                        {
                            "name": "objectGroup",
                            "description": "Symbolic group name that can be used to release multiple objects.",
                            "optional": true,
                            "type": "string"
                        }
                    ],
                    "returns": [
                        {
                            "name": "result",
                            "description": "Evaluation result.",
                            "$ref": "Runtime.RemoteObject"
                        }
                    ]
                },
                {
                    "name": "getSamplingProfile",
                    "returns": [
                        {
                            "name": "profile",
                            "description": "Return the sampling profile being collected.",
                            "$ref": "SamplingHeapProfile"
                        }
                    ]
                },
                {
                    "name": "startSampling",
                    "parameters": [
                        {
                            "name": "samplingInterval",
                            "description": "Average sample interval in bytes. Poisson distribution is used for the intervals. The\ndefault value is 32768 bytes.",
                            "optional": true,
                            "type": "number"
                        }
                    ]
                },
                {
                    "name": "startTrackingHeapObjects",
                    "parameters": [
                        {
                            "name": "trackAllocations",
                            "optional": true,
                            "type": "boolean"
                        }
                    ]
                },
                {
                    "name": "stopSampling",
                    "returns": [
                        {
                            "name": "profile",
                            "description": "Recorded sampling heap profile.",
                            "$ref": "SamplingHeapProfile"
                        }
                    ]
                },
                {
                    "name": "stopTrackingHeapObjects",
                    "parameters": [
                        {
                            "name": "reportProgress",
                            "description": "If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken\nwhen the tracking is stopped.",
                            "optional": true,
                            "type": "boolean"
                        }
                    ]
                },
                {
                    "name": "takeHeapSnapshot",
                    "parameters": [
                        {
                            "name": "reportProgress",
                            "description": "If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.",
                            "optional": true,
                            "type": "boolean"
                        }
                    ]
                }
            ],
            "events": [
                {
                    "name": "addHeapSnapshotChunk",
                    "parameters": [
                        {
                            "name": "chunk",
                            "type": "string"
                        }
                    ]
                },
                {
                    "name": "heapStatsUpdate",
                    "description": "If heap objects tracking has been started then backend may send update for one or more fragments",
                    "parameters": [
                        {
                            "name": "statsUpdate",
                            "description": "An array of triplets. Each triplet describes a fragment. The first integer is the fragment\nindex, the second integer is a total count of objects for the fragment, the third integer is\na total size of the objects for the fragment.",
                            "type": "array",
                            "items": {
                                "type": "integer"
                            }
                        }
                    ]
                },
                {
                    "name": "lastSeenObjectId",
                    "description": "If heap objects tracking has been started then backend regularly sends a current value for last\nseen object id and corresponding timestamp. If the were changes in the heap since last event\nthen one or more heapStatsUpdate events will be sent before a new lastSeenObjectId event.",
                    "parameters": [
                        {
                            "name": "lastSeenObjectId",
                            "type": "integer"
                        },
                        {
                            "name": "timestamp",
                            "type": "number"
                        }
                    ]
                },
                {
                    "name": "reportHeapSnapshotProgress",
                    "parameters": [
                        {
                            "name": "done",
                            "type": "integer"
                        },
                        {
                            "name": "total",
                            "type": "integer"
                        },
                        {
                            "name": "finished",
                            "optional": true,
                            "type": "boolean"
                        }
                    ]
                },
                {
                    "name": "resetProfiles"
                }
            ]
        },
        {
            "domain": "Profiler",
            "dependencies": [
                "Runtime",
                "Debugger"
            ],
            "types": [
                {
                    "id": "ProfileNode",
                    "description": "Profile node. Holds callsite information, execution statistics and child nodes.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "id",
                            "description": "Unique id of the node.",
                            "type": "integer"
                        },
                        {
                            "name": "callFrame",
                            "description": "Function location.",
                            "$ref": "Runtime.CallFrame"
                        },
                        {
                            "name": "hitCount",
                            "description": "Number of samples where this node was on top of the call stack.",
                            "optional": true,
                            "type": "integer"
                        },
                        {
                            "name": "children",
                            "description": "Child node ids.",
                            "optional": true,
                            "type": "array",
                            "items": {
                                "type": "integer"
                            }
                        },
                        {
                            "name": "deoptReason",
                            "description": "The reason of being not optimized. The function may be deoptimized or marked as don't\noptimize.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "positionTicks",
                            "description": "An array of source position ticks.",
                            "optional": true,
                            "type": "array",
                            "items": {
                                "$ref": "PositionTickInfo"
                            }
                        }
                    ]
                },
                {
                    "id": "Profile",
                    "description": "Profile.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "nodes",
                            "description": "The list of profile nodes. First item is the root node.",
                            "type": "array",
                            "items": {
                                "$ref": "ProfileNode"
                            }
                        },
                        {
                            "name": "startTime",
                            "description": "Profiling start timestamp in microseconds.",
                            "type": "number"
                        },
                        {
                            "name": "endTime",
                            "description": "Profiling end timestamp in microseconds.",
                            "type": "number"
                        },
                        {
                            "name": "samples",
                            "description": "Ids of samples top nodes.",
                            "optional": true,
                            "type": "array",
                            "items": {
                                "type": "integer"
                            }
                        },
                        {
                            "name": "timeDeltas",
                            "description": "Time intervals between adjacent samples in microseconds. The first delta is relative to the\nprofile startTime.",
                            "optional": true,
                            "type": "array",
                            "items": {
                                "type": "integer"
                            }
                        }
                    ]
                },
                {
                    "id": "PositionTickInfo",
                    "description": "Specifies a number of samples attributed to a certain source position.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "line",
                            "description": "Source line number (1-based).",
                            "type": "integer"
                        },
                        {
                            "name": "ticks",
                            "description": "Number of samples attributed to the source line.",
                            "type": "integer"
                        }
                    ]
                },
                {
                    "id": "CoverageRange",
                    "description": "Coverage data for a source range.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "startOffset",
                            "description": "JavaScript script source offset for the range start.",
                            "type": "integer"
                        },
                        {
                            "name": "endOffset",
                            "description": "JavaScript script source offset for the range end.",
                            "type": "integer"
                        },
                        {
                            "name": "count",
                            "description": "Collected execution count of the source range.",
                            "type": "integer"
                        }
                    ]
                },
                {
                    "id": "FunctionCoverage",
                    "description": "Coverage data for a JavaScript function.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "functionName",
                            "description": "JavaScript function name.",
                            "type": "string"
                        },
                        {
                            "name": "ranges",
                            "description": "Source ranges inside the function with coverage data.",
                            "type": "array",
                            "items": {
                                "$ref": "CoverageRange"
                            }
                        },
                        {
                            "name": "isBlockCoverage",
                            "description": "Whether coverage data for this function has block granularity.",
                            "type": "boolean"
                        }
                    ]
                },
                {
                    "id": "ScriptCoverage",
                    "description": "Coverage data for a JavaScript script.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "scriptId",
                            "description": "JavaScript script id.",
                            "$ref": "Runtime.ScriptId"
                        },
                        {
                            "name": "url",
                            "description": "JavaScript script name or url.",
                            "type": "string"
                        },
                        {
                            "name": "functions",
                            "description": "Functions contained in the script that has coverage data.",
                            "type": "array",
                            "items": {
                                "$ref": "FunctionCoverage"
                            }
                        }
                    ]
                },
                {
                    "id": "TypeObject",
                    "description": "Describes a type collected during runtime.",
                    "experimental": true,
                    "type": "object",
                    "properties": [
                        {
                            "name": "name",
                            "description": "Name of a type collected with type profiling.",
                            "type": "string"
                        }
                    ]
                },
                {
                    "id": "TypeProfileEntry",
                    "description": "Source offset and types for a parameter or return value.",
                    "experimental": true,
                    "type": "object",
                    "properties": [
                        {
                            "name": "offset",
                            "description": "Source offset of the parameter or end of function for return values.",
                            "type": "integer"
                        },
                        {
                            "name": "types",
                            "description": "The types for this parameter or return value.",
                            "type": "array",
                            "items": {
                                "$ref": "TypeObject"
                            }
                        }
                    ]
                },
                {
                    "id": "ScriptTypeProfile",
                    "description": "Type profile data collected during runtime for a JavaScript script.",
                    "experimental": true,
                    "type": "object",
                    "properties": [
                        {
                            "name": "scriptId",
                            "description": "JavaScript script id.",
                            "$ref": "Runtime.ScriptId"
                        },
                        {
                            "name": "url",
                            "description": "JavaScript script name or url.",
                            "type": "string"
                        },
                        {
                            "name": "entries",
                            "description": "Type profile entries for parameters and return values of the functions in the script.",
                            "type": "array",
                            "items": {
                                "$ref": "TypeProfileEntry"
                            }
                        }
                    ]
                }
            ],
            "commands": [
                {
                    "name": "disable"
                },
                {
                    "name": "enable"
                },
                {
                    "name": "getBestEffortCoverage",
                    "description": "Collect coverage data for the current isolate. The coverage data may be incomplete due to\ngarbage collection.",
                    "returns": [
                        {
                            "name": "result",
                            "description": "Coverage data for the current isolate.",
                            "type": "array",
                            "items": {
                                "$ref": "ScriptCoverage"
                            }
                        }
                    ]
                },
                {
                    "name": "setSamplingInterval",
                    "description": "Changes CPU profiler sampling interval. Must be called before CPU profiles recording started.",
                    "parameters": [
                        {
                            "name": "interval",
                            "description": "New sampling interval in microseconds.",
                            "type": "integer"
                        }
                    ]
                },
                {
                    "name": "start"
                },
                {
                    "name": "startPreciseCoverage",
                    "description": "Enable precise code coverage. Coverage data for JavaScript executed before enabling precise code\ncoverage may be incomplete. Enabling prevents running optimized code and resets execution\ncounters.",
                    "parameters": [
                        {
                            "name": "callCount",
                            "description": "Collect accurate call counts beyond simple 'covered' or 'not covered'.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "detailed",
                            "description": "Collect block-based coverage.",
                            "optional": true,
                            "type": "boolean"
                        }
                    ]
                },
                {
                    "name": "startTypeProfile",
                    "description": "Enable type profile.",
                    "experimental": true
                },
                {
                    "name": "stop",
                    "returns": [
                        {
                            "name": "profile",
                            "description": "Recorded profile.",
                            "$ref": "Profile"
                        }
                    ]
                },
                {
                    "name": "stopPreciseCoverage",
                    "description": "Disable precise code coverage. Disabling releases unnecessary execution count records and allows\nexecuting optimized code."
                },
                {
                    "name": "stopTypeProfile",
                    "description": "Disable type profile. Disabling releases type profile data collected so far.",
                    "experimental": true
                },
                {
                    "name": "takePreciseCoverage",
                    "description": "Collect coverage data for the current isolate, and resets execution counters. Precise code\ncoverage needs to have started.",
                    "returns": [
                        {
                            "name": "result",
                            "description": "Coverage data for the current isolate.",
                            "type": "array",
                            "items": {
                                "$ref": "ScriptCoverage"
                            }
                        }
                    ]
                },
                {
                    "name": "takeTypeProfile",
                    "description": "Collect type profile.",
                    "experimental": true,
                    "returns": [
                        {
                            "name": "result",
                            "description": "Type profile for all scripts since startTypeProfile() was turned on.",
                            "type": "array",
                            "items": {
                                "$ref": "ScriptTypeProfile"
                            }
                        }
                    ]
                }
            ],
            "events": [
                {
                    "name": "consoleProfileFinished",
                    "parameters": [
                        {
                            "name": "id",
                            "type": "string"
                        },
                        {
                            "name": "location",
                            "description": "Location of console.profileEnd().",
                            "$ref": "Debugger.Location"
                        },
                        {
                            "name": "profile",
                            "$ref": "Profile"
                        },
                        {
                            "name": "title",
                            "description": "Profile title passed as an argument to console.profile().",
                            "optional": true,
                            "type": "string"
                        }
                    ]
                },
                {
                    "name": "consoleProfileStarted",
                    "description": "Sent when new profile recording is started using console.profile() call.",
                    "parameters": [
                        {
                            "name": "id",
                            "type": "string"
                        },
                        {
                            "name": "location",
                            "description": "Location of console.profile().",
                            "$ref": "Debugger.Location"
                        },
                        {
                            "name": "title",
                            "description": "Profile title passed as an argument to console.profile().",
                            "optional": true,
                            "type": "string"
                        }
                    ]
                }
            ]
        },
        {
            "domain": "Runtime",
            "description": "Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects.\nEvaluation results are returned as mirror object that expose object type, string representation\nand unique identifier that can be used for further object reference. Original objects are\nmaintained in memory unless they are either explicitly released or are released along with the\nother objects in their object group.",
            "types": [
                {
                    "id": "ScriptId",
                    "description": "Unique script identifier.",
                    "type": "string"
                },
                {
                    "id": "RemoteObjectId",
                    "description": "Unique object identifier.",
                    "type": "string"
                },
                {
                    "id": "UnserializableValue",
                    "description": "Primitive value which cannot be JSON-stringified. Includes values `-0`, `NaN`, `Infinity`,\n`-Infinity`, and bigint literals.",
                    "type": "string"
                },
                {
                    "id": "RemoteObject",
                    "description": "Mirror object referencing original JavaScript object.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "type",
                            "description": "Object type.",
                            "type": "string",
                            "enum": [
                                "object",
                                "function",
                                "undefined",
                                "string",
                                "number",
                                "boolean",
                                "symbol",
                                "bigint"
                            ]
                        },
                        {
                            "name": "subtype",
                            "description": "Object subtype hint. Specified for `object` type values only.",
                            "optional": true,
                            "type": "string",
                            "enum": [
                                "array",
                                "null",
                                "node",
                                "regexp",
                                "date",
                                "map",
                                "set",
                                "weakmap",
                                "weakset",
                                "iterator",
                                "generator",
                                "error",
                                "proxy",
                                "promise",
                                "typedarray"
                            ]
                        },
                        {
                            "name": "className",
                            "description": "Object class (constructor) name. Specified for `object` type values only.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "value",
                            "description": "Remote object value in case of primitive values or JSON values (if it was requested).",
                            "optional": true,
                            "type": "any"
                        },
                        {
                            "name": "unserializableValue",
                            "description": "Primitive value which can not be JSON-stringified does not have `value`, but gets this\nproperty.",
                            "optional": true,
                            "$ref": "UnserializableValue"
                        },
                        {
                            "name": "description",
                            "description": "String representation of the object.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "objectId",
                            "description": "Unique object identifier (for non-primitive values).",
                            "optional": true,
                            "$ref": "RemoteObjectId"
                        },
                        {
                            "name": "preview",
                            "description": "Preview containing abbreviated property values. Specified for `object` type values only.",
                            "experimental": true,
                            "optional": true,
                            "$ref": "ObjectPreview"
                        },
                        {
                            "name": "customPreview",
                            "experimental": true,
                            "optional": true,
                            "$ref": "CustomPreview"
                        }
                    ]
                },
                {
                    "id": "CustomPreview",
                    "experimental": true,
                    "type": "object",
                    "properties": [
                        {
                            "name": "header",
                            "type": "string"
                        },
                        {
                            "name": "hasBody",
                            "type": "boolean"
                        },
                        {
                            "name": "formatterObjectId",
                            "$ref": "RemoteObjectId"
                        },
                        {
                            "name": "bindRemoteObjectFunctionId",
                            "$ref": "RemoteObjectId"
                        },
                        {
                            "name": "configObjectId",
                            "optional": true,
                            "$ref": "RemoteObjectId"
                        }
                    ]
                },
                {
                    "id": "ObjectPreview",
                    "description": "Object containing abbreviated remote object value.",
                    "experimental": true,
                    "type": "object",
                    "properties": [
                        {
                            "name": "type",
                            "description": "Object type.",
                            "type": "string",
                            "enum": [
                                "object",
                                "function",
                                "undefined",
                                "string",
                                "number",
                                "boolean",
                                "symbol",
                                "bigint"
                            ]
                        },
                        {
                            "name": "subtype",
                            "description": "Object subtype hint. Specified for `object` type values only.",
                            "optional": true,
                            "type": "string",
                            "enum": [
                                "array",
                                "null",
                                "node",
                                "regexp",
                                "date",
                                "map",
                                "set",
                                "weakmap",
                                "weakset",
                                "iterator",
                                "generator",
                                "error"
                            ]
                        },
                        {
                            "name": "description",
                            "description": "String representation of the object.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "overflow",
                            "description": "True iff some of the properties or entries of the original object did not fit.",
                            "type": "boolean"
                        },
                        {
                            "name": "properties",
                            "description": "List of the properties.",
                            "type": "array",
                            "items": {
                                "$ref": "PropertyPreview"
                            }
                        },
                        {
                            "name": "entries",
                            "description": "List of the entries. Specified for `map` and `set` subtype values only.",
                            "optional": true,
                            "type": "array",
                            "items": {
                                "$ref": "EntryPreview"
                            }
                        }
                    ]
                },
                {
                    "id": "PropertyPreview",
                    "experimental": true,
                    "type": "object",
                    "properties": [
                        {
                            "name": "name",
                            "description": "Property name.",
                            "type": "string"
                        },
                        {
                            "name": "type",
                            "description": "Object type. Accessor means that the property itself is an accessor property.",
                            "type": "string",
                            "enum": [
                                "object",
                                "function",
                                "undefined",
                                "string",
                                "number",
                                "boolean",
                                "symbol",
                                "accessor",
                                "bigint"
                            ]
                        },
                        {
                            "name": "value",
                            "description": "User-friendly property value string.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "valuePreview",
                            "description": "Nested value preview.",
                            "optional": true,
                            "$ref": "ObjectPreview"
                        },
                        {
                            "name": "subtype",
                            "description": "Object subtype hint. Specified for `object` type values only.",
                            "optional": true,
                            "type": "string",
                            "enum": [
                                "array",
                                "null",
                                "node",
                                "regexp",
                                "date",
                                "map",
                                "set",
                                "weakmap",
                                "weakset",
                                "iterator",
                                "generator",
                                "error"
                            ]
                        }
                    ]
                },
                {
                    "id": "EntryPreview",
                    "experimental": true,
                    "type": "object",
                    "properties": [
                        {
                            "name": "key",
                            "description": "Preview of the key. Specified for map-like collection entries.",
                            "optional": true,
                            "$ref": "ObjectPreview"
                        },
                        {
                            "name": "value",
                            "description": "Preview of the value.",
                            "$ref": "ObjectPreview"
                        }
                    ]
                },
                {
                    "id": "PropertyDescriptor",
                    "description": "Object property descriptor.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "name",
                            "description": "Property name or symbol description.",
                            "type": "string"
                        },
                        {
                            "name": "value",
                            "description": "The value associated with the property.",
                            "optional": true,
                            "$ref": "RemoteObject"
                        },
                        {
                            "name": "writable",
                            "description": "True if the value associated with the property may be changed (data descriptors only).",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "get",
                            "description": "A function which serves as a getter for the property, or `undefined` if there is no getter\n(accessor descriptors only).",
                            "optional": true,
                            "$ref": "RemoteObject"
                        },
                        {
                            "name": "set",
                            "description": "A function which serves as a setter for the property, or `undefined` if there is no setter\n(accessor descriptors only).",
                            "optional": true,
                            "$ref": "RemoteObject"
                        },
                        {
                            "name": "configurable",
                            "description": "True if the type of this property descriptor may be changed and if the property may be\ndeleted from the corresponding object.",
                            "type": "boolean"
                        },
                        {
                            "name": "enumerable",
                            "description": "True if this property shows up during enumeration of the properties on the corresponding\nobject.",
                            "type": "boolean"
                        },
                        {
                            "name": "wasThrown",
                            "description": "True if the result was thrown during the evaluation.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "isOwn",
                            "description": "True if the property is owned for the object.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "symbol",
                            "description": "Property symbol object, if the property is of the `symbol` type.",
                            "optional": true,
                            "$ref": "RemoteObject"
                        }
                    ]
                },
                {
                    "id": "InternalPropertyDescriptor",
                    "description": "Object internal property descriptor. This property isn't normally visible in JavaScript code.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "name",
                            "description": "Conventional property name.",
                            "type": "string"
                        },
                        {
                            "name": "value",
                            "description": "The value associated with the property.",
                            "optional": true,
                            "$ref": "RemoteObject"
                        }
                    ]
                },
                {
                    "id": "CallArgument",
                    "description": "Represents function call argument. Either remote object id `objectId`, primitive `value`,\nunserializable primitive value or neither of (for undefined) them should be specified.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "value",
                            "description": "Primitive value or serializable javascript object.",
                            "optional": true,
                            "type": "any"
                        },
                        {
                            "name": "unserializableValue",
                            "description": "Primitive value which can not be JSON-stringified.",
                            "optional": true,
                            "$ref": "UnserializableValue"
                        },
                        {
                            "name": "objectId",
                            "description": "Remote object handle.",
                            "optional": true,
                            "$ref": "RemoteObjectId"
                        }
                    ]
                },
                {
                    "id": "ExecutionContextId",
                    "description": "Id of an execution context.",
                    "type": "integer"
                },
                {
                    "id": "ExecutionContextDescription",
                    "description": "Description of an isolated world.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "id",
                            "description": "Unique id of the execution context. It can be used to specify in which execution context\nscript evaluation should be performed.",
                            "$ref": "ExecutionContextId"
                        },
                        {
                            "name": "origin",
                            "description": "Execution context origin.",
                            "type": "string"
                        },
                        {
                            "name": "name",
                            "description": "Human readable name describing given context.",
                            "type": "string"
                        },
                        {
                            "name": "auxData",
                            "description": "Embedder-specific auxiliary data.",
                            "optional": true,
                            "type": "object"
                        }
                    ]
                },
                {
                    "id": "ExceptionDetails",
                    "description": "Detailed information about exception (or error) that was thrown during script compilation or\nexecution.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "exceptionId",
                            "description": "Exception id.",
                            "type": "integer"
                        },
                        {
                            "name": "text",
                            "description": "Exception text, which should be used together with exception object when available.",
                            "type": "string"
                        },
                        {
                            "name": "lineNumber",
                            "description": "Line number of the exception location (0-based).",
                            "type": "integer"
                        },
                        {
                            "name": "columnNumber",
                            "description": "Column number of the exception location (0-based).",
                            "type": "integer"
                        },
                        {
                            "name": "scriptId",
                            "description": "Script ID of the exception location.",
                            "optional": true,
                            "$ref": "ScriptId"
                        },
                        {
                            "name": "url",
                            "description": "URL of the exception location, to be used when the script was not reported.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "stackTrace",
                            "description": "JavaScript stack trace if available.",
                            "optional": true,
                            "$ref": "StackTrace"
                        },
                        {
                            "name": "exception",
                            "description": "Exception object if available.",
                            "optional": true,
                            "$ref": "RemoteObject"
                        },
                        {
                            "name": "executionContextId",
                            "description": "Identifier of the context where exception happened.",
                            "optional": true,
                            "$ref": "ExecutionContextId"
                        }
                    ]
                },
                {
                    "id": "Timestamp",
                    "description": "Number of milliseconds since epoch.",
                    "type": "number"
                },
                {
                    "id": "TimeDelta",
                    "description": "Number of milliseconds.",
                    "type": "number"
                },
                {
                    "id": "CallFrame",
                    "description": "Stack entry for runtime errors and assertions.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "functionName",
                            "description": "JavaScript function name.",
                            "type": "string"
                        },
                        {
                            "name": "scriptId",
                            "description": "JavaScript script id.",
                            "$ref": "ScriptId"
                        },
                        {
                            "name": "url",
                            "description": "JavaScript script name or url.",
                            "type": "string"
                        },
                        {
                            "name": "lineNumber",
                            "description": "JavaScript script line number (0-based).",
                            "type": "integer"
                        },
                        {
                            "name": "columnNumber",
                            "description": "JavaScript script column number (0-based).",
                            "type": "integer"
                        }
                    ]
                },
                {
                    "id": "StackTrace",
                    "description": "Call frames for assertions or error messages.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "description",
                            "description": "String label of this stack trace. For async traces this may be a name of the function that\ninitiated the async call.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "callFrames",
                            "description": "JavaScript function name.",
                            "type": "array",
                            "items": {
                                "$ref": "CallFrame"
                            }
                        },
                        {
                            "name": "parent",
                            "description": "Asynchronous JavaScript stack trace that preceded this stack, if available.",
                            "optional": true,
                            "$ref": "StackTrace"
                        },
                        {
                            "name": "parentId",
                            "description": "Asynchronous JavaScript stack trace that preceded this stack, if available.",
                            "experimental": true,
                            "optional": true,
                            "$ref": "StackTraceId"
                        }
                    ]
                },
                {
                    "id": "UniqueDebuggerId",
                    "description": "Unique identifier of current debugger.",
                    "experimental": true,
                    "type": "string"
                },
                {
                    "id": "StackTraceId",
                    "description": "If `debuggerId` is set stack trace comes from another debugger and can be resolved there. This\nallows to track cross-debugger calls. See `Runtime.StackTrace` and `Debugger.paused` for usages.",
                    "experimental": true,
                    "type": "object",
                    "properties": [
                        {
                            "name": "id",
                            "type": "string"
                        },
                        {
                            "name": "debuggerId",
                            "optional": true,
                            "$ref": "UniqueDebuggerId"
                        }
                    ]
                }
            ],
            "commands": [
                {
                    "name": "awaitPromise",
                    "description": "Add handler to promise with given promise object id.",
                    "parameters": [
                        {
                            "name": "promiseObjectId",
                            "description": "Identifier of the promise.",
                            "$ref": "RemoteObjectId"
                        },
                        {
                            "name": "returnByValue",
                            "description": "Whether the result is expected to be a JSON object that should be sent by value.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "generatePreview",
                            "description": "Whether preview should be generated for the result.",
                            "optional": true,
                            "type": "boolean"
                        }
                    ],
                    "returns": [
                        {
                            "name": "result",
                            "description": "Promise result. Will contain rejected value if promise was rejected.",
                            "$ref": "RemoteObject"
                        },
                        {
                            "name": "exceptionDetails",
                            "description": "Exception details if stack strace is available.",
                            "optional": true,
                            "$ref": "ExceptionDetails"
                        }
                    ]
                },
                {
                    "name": "callFunctionOn",
                    "description": "Calls function with given declaration on the given object. Object group of the result is\ninherited from the target object.",
                    "parameters": [
                        {
                            "name": "functionDeclaration",
                            "description": "Declaration of the function to call.",
                            "type": "string"
                        },
                        {
                            "name": "objectId",
                            "description": "Identifier of the object to call function on. Either objectId or executionContextId should\nbe specified.",
                            "optional": true,
                            "$ref": "RemoteObjectId"
                        },
                        {
                            "name": "arguments",
                            "description": "Call arguments. All call arguments must belong to the same JavaScript world as the target\nobject.",
                            "optional": true,
                            "type": "array",
                            "items": {
                                "$ref": "CallArgument"
                            }
                        },
                        {
                            "name": "silent",
                            "description": "In silent mode exceptions thrown during evaluation are not reported and do not pause\nexecution. Overrides `setPauseOnException` state.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "returnByValue",
                            "description": "Whether the result is expected to be a JSON object which should be sent by value.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "generatePreview",
                            "description": "Whether preview should be generated for the result.",
                            "experimental": true,
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "userGesture",
                            "description": "Whether execution should be treated as initiated by user in the UI.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "awaitPromise",
                            "description": "Whether execution should `await` for resulting value and return once awaited promise is\nresolved.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "executionContextId",
                            "description": "Specifies execution context which global object will be used to call function on. Either\nexecutionContextId or objectId should be specified.",
                            "optional": true,
                            "$ref": "ExecutionContextId"
                        },
                        {
                            "name": "objectGroup",
                            "description": "Symbolic group name that can be used to release multiple objects. If objectGroup is not\nspecified and objectId is, objectGroup will be inherited from object.",
                            "optional": true,
                            "type": "string"
                        }
                    ],
                    "returns": [
                        {
                            "name": "result",
                            "description": "Call result.",
                            "$ref": "RemoteObject"
                        },
                        {
                            "name": "exceptionDetails",
                            "description": "Exception details.",
                            "optional": true,
                            "$ref": "ExceptionDetails"
                        }
                    ]
                },
                {
                    "name": "compileScript",
                    "description": "Compiles expression.",
                    "parameters": [
                        {
                            "name": "expression",
                            "description": "Expression to compile.",
                            "type": "string"
                        },
                        {
                            "name": "sourceURL",
                            "description": "Source url to be set for the script.",
                            "type": "string"
                        },
                        {
                            "name": "persistScript",
                            "description": "Specifies whether the compiled script should be persisted.",
                            "type": "boolean"
                        },
                        {
                            "name": "executionContextId",
                            "description": "Specifies in which execution context to perform script run. If the parameter is omitted the\nevaluation will be performed in the context of the inspected page.",
                            "optional": true,
                            "$ref": "ExecutionContextId"
                        }
                    ],
                    "returns": [
                        {
                            "name": "scriptId",
                            "description": "Id of the script.",
                            "optional": true,
                            "$ref": "ScriptId"
                        },
                        {
                            "name": "exceptionDetails",
                            "description": "Exception details.",
                            "optional": true,
                            "$ref": "ExceptionDetails"
                        }
                    ]
                },
                {
                    "name": "disable",
                    "description": "Disables reporting of execution contexts creation."
                },
                {
                    "name": "discardConsoleEntries",
                    "description": "Discards collected exceptions and console API calls."
                },
                {
                    "name": "enable",
                    "description": "Enables reporting of execution contexts creation by means of `executionContextCreated` event.\nWhen the reporting gets enabled the event will be sent immediately for each existing execution\ncontext."
                },
                {
                    "name": "evaluate",
                    "description": "Evaluates expression on global object.",
                    "parameters": [
                        {
                            "name": "expression",
                            "description": "Expression to evaluate.",
                            "type": "string"
                        },
                        {
                            "name": "objectGroup",
                            "description": "Symbolic group name that can be used to release multiple objects.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "includeCommandLineAPI",
                            "description": "Determines whether Command Line API should be available during the evaluation.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "silent",
                            "description": "In silent mode exceptions thrown during evaluation are not reported and do not pause\nexecution. Overrides `setPauseOnException` state.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "contextId",
                            "description": "Specifies in which execution context to perform evaluation. If the parameter is omitted the\nevaluation will be performed in the context of the inspected page.",
                            "optional": true,
                            "$ref": "ExecutionContextId"
                        },
                        {
                            "name": "returnByValue",
                            "description": "Whether the result is expected to be a JSON object that should be sent by value.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "generatePreview",
                            "description": "Whether preview should be generated for the result.",
                            "experimental": true,
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "userGesture",
                            "description": "Whether execution should be treated as initiated by user in the UI.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "awaitPromise",
                            "description": "Whether execution should `await` for resulting value and return once awaited promise is\nresolved.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "throwOnSideEffect",
                            "description": "Whether to throw an exception if side effect cannot be ruled out during evaluation.",
                            "experimental": true,
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "timeout",
                            "description": "Terminate execution after timing out (number of milliseconds).",
                            "experimental": true,
                            "optional": true,
                            "$ref": "TimeDelta"
                        }
                    ],
                    "returns": [
                        {
                            "name": "result",
                            "description": "Evaluation result.",
                            "$ref": "RemoteObject"
                        },
                        {
                            "name": "exceptionDetails",
                            "description": "Exception details.",
                            "optional": true,
                            "$ref": "ExceptionDetails"
                        }
                    ]
                },
                {
                    "name": "getIsolateId",
                    "description": "Returns the isolate id.",
                    "experimental": true,
                    "returns": [
                        {
                            "name": "id",
                            "description": "The isolate id.",
                            "type": "string"
                        }
                    ]
                },
                {
                    "name": "getHeapUsage",
                    "description": "Returns the JavaScript heap usage.\nIt is the total usage of the corresponding isolate not scoped to a particular Runtime.",
                    "experimental": true,
                    "returns": [
                        {
                            "name": "usedSize",
                            "description": "Used heap size in bytes.",
                            "type": "number"
                        },
                        {
                            "name": "totalSize",
                            "description": "Allocated heap size in bytes.",
                            "type": "number"
                        }
                    ]
                },
                {
                    "name": "getProperties",
                    "description": "Returns properties of a given object. Object group of the result is inherited from the target\nobject.",
                    "parameters": [
                        {
                            "name": "objectId",
                            "description": "Identifier of the object to return properties for.",
                            "$ref": "RemoteObjectId"
                        },
                        {
                            "name": "ownProperties",
                            "description": "If true, returns properties belonging only to the element itself, not to its prototype\nchain.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "accessorPropertiesOnly",
                            "description": "If true, returns accessor properties (with getter/setter) only; internal properties are not\nreturned either.",
                            "experimental": true,
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "generatePreview",
                            "description": "Whether preview should be generated for the results.",
                            "experimental": true,
                            "optional": true,
                            "type": "boolean"
                        }
                    ],
                    "returns": [
                        {
                            "name": "result",
                            "description": "Object properties.",
                            "type": "array",
                            "items": {
                                "$ref": "PropertyDescriptor"
                            }
                        },
                        {
                            "name": "internalProperties",
                            "description": "Internal object properties (only of the element itself).",
                            "optional": true,
                            "type": "array",
                            "items": {
                                "$ref": "InternalPropertyDescriptor"
                            }
                        },
                        {
                            "name": "exceptionDetails",
                            "description": "Exception details.",
                            "optional": true,
                            "$ref": "ExceptionDetails"
                        }
                    ]
                },
                {
                    "name": "globalLexicalScopeNames",
                    "description": "Returns all let, const and class variables from global scope.",
                    "parameters": [
                        {
                            "name": "executionContextId",
                            "description": "Specifies in which execution context to lookup global scope variables.",
                            "optional": true,
                            "$ref": "ExecutionContextId"
                        }
                    ],
                    "returns": [
                        {
                            "name": "names",
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    ]
                },
                {
                    "name": "queryObjects",
                    "parameters": [
                        {
                            "name": "prototypeObjectId",
                            "description": "Identifier of the prototype to return objects for.",
                            "$ref": "RemoteObjectId"
                        },
                        {
                            "name": "objectGroup",
                            "description": "Symbolic group name that can be used to release the results.",
                            "optional": true,
                            "type": "string"
                        }
                    ],
                    "returns": [
                        {
                            "name": "objects",
                            "description": "Array with objects.",
                            "$ref": "RemoteObject"
                        }
                    ]
                },
                {
                    "name": "releaseObject",
                    "description": "Releases remote object with given id.",
                    "parameters": [
                        {
                            "name": "objectId",
                            "description": "Identifier of the object to release.",
                            "$ref": "RemoteObjectId"
                        }
                    ]
                },
                {
                    "name": "releaseObjectGroup",
                    "description": "Releases all remote objects that belong to a given group.",
                    "parameters": [
                        {
                            "name": "objectGroup",
                            "description": "Symbolic object group name.",
                            "type": "string"
                        }
                    ]
                },
                {
                    "name": "runIfWaitingForDebugger",
                    "description": "Tells inspected instance to run if it was waiting for debugger to attach."
                },
                {
                    "name": "runScript",
                    "description": "Runs script with given id in a given context.",
                    "parameters": [
                        {
                            "name": "scriptId",
                            "description": "Id of the script to run.",
                            "$ref": "ScriptId"
                        },
                        {
                            "name": "executionContextId",
                            "description": "Specifies in which execution context to perform script run. If the parameter is omitted the\nevaluation will be performed in the context of the inspected page.",
                            "optional": true,
                            "$ref": "ExecutionContextId"
                        },
                        {
                            "name": "objectGroup",
                            "description": "Symbolic group name that can be used to release multiple objects.",
                            "optional": true,
                            "type": "string"
                        },
                        {
                            "name": "silent",
                            "description": "In silent mode exceptions thrown during evaluation are not reported and do not pause\nexecution. Overrides `setPauseOnException` state.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "includeCommandLineAPI",
                            "description": "Determines whether Command Line API should be available during the evaluation.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "returnByValue",
                            "description": "Whether the result is expected to be a JSON object which should be sent by value.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "generatePreview",
                            "description": "Whether preview should be generated for the result.",
                            "optional": true,
                            "type": "boolean"
                        },
                        {
                            "name": "awaitPromise",
                            "description": "Whether execution should `await` for resulting value and return once awaited promise is\nresolved.",
                            "optional": true,
                            "type": "boolean"
                        }
                    ],
                    "returns": [
                        {
                            "name": "result",
                            "description": "Run result.",
                            "$ref": "RemoteObject"
                        },
                        {
                            "name": "exceptionDetails",
                            "description": "Exception details.",
                            "optional": true,
                            "$ref": "ExceptionDetails"
                        }
                    ]
                },
                {
                    "name": "setCustomObjectFormatterEnabled",
                    "experimental": true,
                    "parameters": [
                        {
                            "name": "enabled",
                            "type": "boolean"
                        }
                    ]
                },
                {
                    "name": "terminateExecution",
                    "description": "Terminate current or next JavaScript execution.\nWill cancel the termination when the outer-most script execution ends.",
                    "experimental": true
                }
            ],
            "events": [
                {
                    "name": "consoleAPICalled",
                    "description": "Issued when console API was called.",
                    "parameters": [
                        {
                            "name": "type",
                            "description": "Type of the call.",
                            "type": "string",
                            "enum": [
                                "log",
                                "debug",
                                "info",
                                "error",
                                "warning",
                                "dir",
                                "dirxml",
                                "table",
                                "trace",
                                "clear",
                                "startGroup",
                                "startGroupCollapsed",
                                "endGroup",
                                "assert",
                                "profile",
                                "profileEnd",
                                "count",
                                "timeEnd"
                            ]
                        },
                        {
                            "name": "args",
                            "description": "Call arguments.",
                            "type": "array",
                            "items": {
                                "$ref": "RemoteObject"
                            }
                        },
                        {
                            "name": "executionContextId",
                            "description": "Identifier of the context where the call was made.",
                            "$ref": "ExecutionContextId"
                        },
                        {
                            "name": "timestamp",
                            "description": "Call timestamp.",
                            "$ref": "Timestamp"
                        },
                        {
                            "name": "stackTrace",
                            "description": "Stack trace captured when the call was made.",
                            "optional": true,
                            "$ref": "StackTrace"
                        },
                        {
                            "name": "context",
                            "description": "Console context descriptor for calls on non-default console context (not console.*):\n'anonymous#unique-logger-id' for call on unnamed context, 'name#unique-logger-id' for call\non named context.",
                            "experimental": true,
                            "optional": true,
                            "type": "string"
                        }
                    ]
                },
                {
                    "name": "exceptionRevoked",
                    "description": "Issued when unhandled exception was revoked.",
                    "parameters": [
                        {
                            "name": "reason",
                            "description": "Reason describing why exception was revoked.",
                            "type": "string"
                        },
                        {
                            "name": "exceptionId",
                            "description": "The id of revoked exception, as reported in `exceptionThrown`.",
                            "type": "integer"
                        }
                    ]
                },
                {
                    "name": "exceptionThrown",
                    "description": "Issued when exception was thrown and unhandled.",
                    "parameters": [
                        {
                            "name": "timestamp",
                            "description": "Timestamp of the exception.",
                            "$ref": "Timestamp"
                        },
                        {
                            "name": "exceptionDetails",
                            "$ref": "ExceptionDetails"
                        }
                    ]
                },
                {
                    "name": "executionContextCreated",
                    "description": "Issued when new execution context is created.",
                    "parameters": [
                        {
                            "name": "context",
                            "description": "A newly created execution context.",
                            "$ref": "ExecutionContextDescription"
                        }
                    ]
                },
                {
                    "name": "executionContextDestroyed",
                    "description": "Issued when execution context is destroyed.",
                    "parameters": [
                        {
                            "name": "executionContextId",
                            "description": "Id of the destroyed context",
                            "$ref": "ExecutionContextId"
                        }
                    ]
                },
                {
                    "name": "executionContextsCleared",
                    "description": "Issued when all executionContexts were cleared in browser"
                },
                {
                    "name": "inspectRequested",
                    "description": "Issued when object should be inspected (for example, as a result of inspect() command line API\ncall).",
                    "parameters": [
                        {
                            "name": "object",
                            "$ref": "RemoteObject"
                        },
                        {
                            "name": "hints",
                            "type": "object"
                        }
                    ]
                }
            ]
        },
        {
            "domain": "Schema",
            "description": "This domain is deprecated.",
            "deprecated": true,
            "types": [
                {
                    "id": "Domain",
                    "description": "Description of the protocol domain.",
                    "type": "object",
                    "properties": [
                        {
                            "name": "name",
                            "description": "Domain name.",
                            "type": "string"
                        },
                        {
                            "name": "version",
                            "description": "Domain version.",
                            "type": "string"
                        }
                    ]
                }
            ],
            "commands": [
                {
                    "name": "getDomains",
                    "description": "Returns supported domains.",
                    "returns": [
                        {
                            "name": "domains",
                            "description": "List of supported domains.",
                            "type": "array",
                            "items": {
                                "$ref": "Domain"
                            }
                        }
                    ]
                }
            ]
        }
    ]
}