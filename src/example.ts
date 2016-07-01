import Crdi from './crdi'

type WSSocketClient = any;
//type SocketClient = CrdpClient.IDebugger & CrdpClient.IConsole & WSSocketClient;

//let socketClient: SocketClient;

interface Domain {
    CommandNames: string[]
    EventNames: string[]
}

const createClient = (domains: Domain[]): any => {

}

const wsClient = <Crdi.RuntimeClient & Crdi.DebuggerClient>createClient([Crdi.Runtime, Crdi.Debugger])

