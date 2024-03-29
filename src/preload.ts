import {	contextBridge,	ipcRenderer } from "electron"
import com from './main/processcom'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
		"api", {
			send: (channel: string, data: any) => {
				// whitelist channels
				const validChannels = [com.pick_zet_nml_file, com.pick_collection_nml_file, com.read_zet_nml,
					com.read_collection, com.read_mp3 +'left', com.read_mp3 +'right',
						com.save_collection, com.read_collection_nml, com.reimport_all,
				]
				if (validChannels.includes(channel)) {
					console.log('bridge send: ', channel)
					ipcRenderer.send(channel, data)
				}
			},
			receive: (channel: string, func: (arg0: any) => void) => {
				const validChannels = [com.pick_zet_nml_file, com.pick_collection_nml_file, com.read_zet_nml,
					com.read_collection, com.read_mp3 +'left', com.read_mp3 +'right',
					com.save_collection, com.read_collection_nml, com.reimport_all,
				]
				if (validChannels.includes(channel)) {
					console.log('bridge receive: ', channel)
					// Deliberately strip event as it includes `sender`
					ipcRenderer.on(channel, (event, ...args) => func(args))
				}
			}
		}
)

