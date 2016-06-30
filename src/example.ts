import * as CrdpClient from 'crdpClient'

type WSSocketClient = any;
type SocketClient = CrdpClient.IDebugger & CrdpClient.IConsole & WSSocketClient;

let socketClient: SocketClient;

socketClient.

