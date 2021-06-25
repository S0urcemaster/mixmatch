import { ipcMain, dialog } from 'electron';
// import xml2js from 'xml2js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import fs from 'fs'

import { mainWindow } from "../index";
import com from './processcom'

ipcMain.on(com.pick_file, function () {
	console.log('pick file')
	dialog.showOpenDialog(mainWindow, {
		properties: ['openFile']
	}).then(result => {
		mainWindow.webContents.send(com.pick_file, result.filePaths[0]);
		console.log('dialog result')
		console.log(result.canceled)
		console.log(result.filePaths)
	}).catch(err => {
		console.log(err)
	})
})

ipcMain.on(com.read_nml, function (event, filename) {
	// console.log(filename[0])
	fs.readFile(filename[0], (err, data) => {
		// console.log('read: ', data.toString())
		mainWindow.webContents.send(com.read_nml, data.toString());
	})
	// mainWindow.loadFile(filename).then((file) => {
	// 	const parser = new DOMParser();
	// 	const doc = parser.parseFromString(file, "application/xml");
	// })

	// jsdom.fromFile(filename, undefined).then((dom:any) => {
	// 	console.log(dom.window.document.body.textContent.trim());
	//
	//
	// 	setTimeout(() => {
	// 		console.log(dom.window.document.body.textContent.trim());
	// 	}, 5000);
	// });
})

