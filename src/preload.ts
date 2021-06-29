import {	contextBridge,	ipcRenderer } from "electron"
import com from './main/processcom'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
		"api", {
			send: (channel: string, data: any) => {
				// whitelist channels
				const validChannels = [com.pick_file, com.read_nml, com.read_collection, com.read_mp3 +'left', com.read_mp3 +'right', ]
				if (validChannels.includes(channel)) {
					console.log('bridge send: ', channel, data)
					ipcRenderer.send(channel, data)
				}
			},
			receive: (channel: string, func: (arg0: any) => void) => {
				const validChannels = [com.pick_file, com.read_nml, com.read_collection, com.read_mp3 +'left', com.read_mp3 +'right',]
				if (validChannels.includes(channel)) {
					console.log('bridge receive: ', channel, func)
					// Deliberately strip event as it includes `sender`
					ipcRenderer.on(channel, (event, ...args) => func(args))
				}
			}
		}
)

