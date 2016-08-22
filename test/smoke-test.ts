import Crdp from '../lib/crdp.d.ts'

// Smoke test to ensure that crdp.d.ts will compile as an interface when imported as ES6 module
async function run() {
    const api: Crdp.CrdpClient = null

    // Just test enable methods of core domains
    await Promise.all([
        api.Runtime.enable(),
        api.Debugger.enable(),
        api.Profiler.enable(),
        api.Inspector.enable(),
        api.Console.enable(),
    ])
}

