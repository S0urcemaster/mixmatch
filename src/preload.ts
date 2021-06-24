
import {
	contextBridge,
	ipcRenderer
} from "electron"

console.log('preload')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
		"api", {
			send: (channel: string, data: any) => {
				console.log(channel, data)
				// whitelist channels
				const validChannels:string[] = ["toMain"];
				if (validChannels.includes(channel)) {
					ipcRenderer.send(channel, data);
				}
			},
			receive: (channel: string, func: (arg0: any) => void) => {
				console.log(channel)
				const validChannels = ["fromMain"];
				if (validChannels.includes(channel)) {
					// Deliberately strip event as it includes `sender`
					ipcRenderer.on(channel, (event, ...args) => func(args));
				}
			}
		}
);

