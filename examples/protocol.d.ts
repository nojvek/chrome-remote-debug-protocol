declare module 'chrome-js-debug-protocol' {
    
    // Runtime domain exposes JavaScript runtime by means of remote evaluation and mirror objects. Evaluation results are returned as mirror object that expose object type, string representation and unique identifier that can be used for further object reference. Original objects are maintained in memory unless they are either explicitly released or are released along with the other objects in their object group.
    interface IRuntime {
        
        // Evaluates expression on global object.
        evaluate(expression: string, objectGroup: string, includeCommandLineAPI: boolean, doNotPauseOnExceptionsAndMuteConsole: boolean, contextId: ExecutionContextId, returnByValue: boolean, generatePreview: boolean, userGesture: boolean);
        
        // Calls function with given declaration on the given object. Object group of the result is inherited from the target object.
        callFunctionOn(objectId: RemoteObjectId, functionDeclaration: string, arguments: array, doNotPauseOnExceptionsAndMuteConsole: boolean, returnByValue: boolean, generatePreview: boolean, userGesture: boolean);
        
        // Returns properties of a given object. Object group of the result is inherited from the target object.
        getProperties(objectId: RemoteObjectId, ownProperties: boolean, accessorPropertiesOnly: boolean, generatePreview: boolean);
        
        // Releases remote object with given id.
        releaseObject(objectId: RemoteObjectId);
        
        // Releases all remote objects that belong to a given group.
        releaseObjectGroup(objectGroup: string);
        
        // Tells inspected instance(worker or page) that it can run in case it was started paused.
        run();
        
        // Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event. When the reporting gets enabled the event will be sent immediately for each existing execution context.
        enable();
        
        // Disables reporting of execution contexts creation.
        disable();
        
        setCustomObjectFormatterEnabled(enabled: boolean);
        
        // Compiles expression.
        compileScript(expression: string, sourceURL: string, persistScript: boolean, executionContextId: ExecutionContextId);
        
        // Runs script with given id in a given context.
        runScript(scriptId: ScriptId, executionContextId: ExecutionContextId, objectGroup: string, doNotPauseOnExceptionsAndMuteConsole: boolean, includeCommandLineAPI: boolean);
    }
    
    // Debugger domain exposes JavaScript debugging capabilities. It allows setting and removing breakpoints, stepping through execution, exploring stack traces, etc.
    interface IDebugger {
        
        // Enables debugger for the given page. Clients should not assume that the debugging has been enabled until the result for this command is received.
        enable();
        
        // Disables debugger for given page.
        disable();
        
        // Activates / deactivates all breakpoints on the page.
        setBreakpointsActive(active: boolean);
        
        // Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
        setSkipAllPauses(skipped: boolean);
        
        // Sets JavaScript breakpoint at given location specified either by URL or URL regex. Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property. Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued. This logical breakpoint will survive page reloads.
        setBreakpointByUrl(lineNumber: integer, url: string, urlRegex: string, columnNumber: integer, condition: string);
        
        // Sets JavaScript breakpoint at a given location.
        setBreakpoint(location: Location, condition: string);
        
        // Removes JavaScript breakpoint.
        removeBreakpoint(breakpointId: BreakpointId);
        
        // Continues execution until specific location is reached.
        continueToLocation(location: Location, interstatementLocation: boolean);
        
        // Steps over the statement.
        stepOver();
        
        // Steps into the function call.
        stepInto();
        
        // Steps out of the function call.
        stepOut();
        
        // Stops on the next JavaScript statement.
        pause();
        
        // Resumes JavaScript execution.
        resume();
        
        // Searches for given string in script content.
        searchInContent(scriptId: Runtime.ScriptId, query: string, caseSensitive: boolean, isRegex: boolean);
        
        // Always returns true.
        canSetScriptSource();
        
        // Edits JavaScript source live.
        setScriptSource(scriptId: Runtime.ScriptId, scriptSource: string, preview: boolean);
        
        // Restarts particular call frame from the beginning.
        restartFrame(callFrameId: CallFrameId);
        
        // Returns source for the script with given id.
        getScriptSource(scriptId: Runtime.ScriptId);
        
        // Returns detailed information on given function.
        getFunctionDetails(functionId: Runtime.RemoteObjectId);
        
        // Returns detailed information on given generator object.
        getGeneratorObjectDetails(objectId: Runtime.RemoteObjectId);
        
        // Returns entries of given collection.
        getCollectionEntries(objectId: Runtime.RemoteObjectId);
        
        // Defines pause on exceptions state. Can be set to stop on all exceptions, uncaught exceptions or no exceptions. Initial pause on exceptions state is <code>none</code>.
        setPauseOnExceptions(state: string);
        
        // Evaluates expression on a given call frame.
        evaluateOnCallFrame(callFrameId: CallFrameId, expression: string, objectGroup: string, includeCommandLineAPI: boolean, doNotPauseOnExceptionsAndMuteConsole: boolean, returnByValue: boolean, generatePreview: boolean);
        
        // Changes value of variable in a callframe. Object-based scopes are not supported and must be mutated manually.
        setVariableValue(scopeNumber: integer, variableName: string, newValue: Runtime.CallArgument, callFrameId: CallFrameId);
        
        // Returns call stack including variables changed since VM was paused. VM must be paused.
        getBacktrace();
        
        // Enables or disables async call stacks tracking.
        setAsyncCallStackDepth(maxDepth: integer);
        
        // Replace previous blackbox patterns with passed ones. Forces backend to skip stepping/pausing in scripts with url matching one of the patterns. VM will try to leave blackboxed script by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
        setBlackboxPatterns(patterns: array);
        
        // Makes backend skip steps in the script in blackboxed ranges. VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful. Positions array contains positions where blackbox state is changed. First interval isn't blackboxed. Array should be sorted.
        setBlackboxedRanges(scriptId: Runtime.ScriptId, positions: array);
    }
    
    interface IProfiler {
        
        enable();
        
        disable();
        
        // Changes CPU profiler sampling interval. Must be called before CPU profiles recording started.
        setSamplingInterval(interval: integer);
        
        start();
        
        stop();
    }
    
    interface IHeapProfiler {
        
        enable();
        
        disable();
        
        startTrackingHeapObjects(trackAllocations: boolean);
        
        stopTrackingHeapObjects(reportProgress: boolean);
        
        takeHeapSnapshot(reportProgress: boolean);
        
        collectGarbage();
        
        getObjectByHeapObjectId(objectId: HeapSnapshotObjectId, objectGroup: string);
        
        // Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).
        addInspectedHeapObject(heapObjectId: HeapSnapshotObjectId);
        
        getHeapObjectId(objectId: Runtime.RemoteObjectId);
        
        startSampling(samplingInterval: number);
        
        stopSampling();
    }
}
