import { ipcMain, dialog } from 'electron';
// import xml2js from 'xml2js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import fs from 'fs'
import glob from 'glob'
import id3 from 'node-id3'

import { mainWindow } from "../index";
import com from './processcom'
import Track from "../data/Track";

ipcMain.on(com.read_collection, function () {
	// console.log('file: ', com.read_collection)
	glob( 'c:/tracks/2016 - 1/*.mp3', function( err, files ) {
		// console.log( files );
		const trax:Track[] = []
		files.forEach(file => {
			// const tags = id3.read(file)
			id3.read(file, function(err:any, tags:any) {
				// console.log(tags)
				const t = new Track()
				t.title = tags.title
				t.artist = tags.artist
				t.file = file
				t.genre = tags.genre
				t.key = tags.initialKey
				t.bpm = tags.bpm
				// console.log(t)
				trax.push(t)
				// console.log(trax)
				mainWindow.webContents.send(com.read_collection, trax);
			})
		})
	});
})

ipcMain.on(com.pick_file, function () {
	console.log('pick file')
	dialog.showOpenDialog(mainWindow, {
		properties: ['openFile']
	}).then(result => {
		mainWindow.webContents.send(com.pick_file, result.filePaths[0]);
		// console.log('dialog result')
		// console.log(result.canceled)
		// console.log(result.filePaths)
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

ipcMain.on(com.read_mp3, function (event, filename) {
	console.log(com.read_mp3, filename)
	fs.readFile(filename, (err, data) => {
		console.log('read: ', data.buffer)
		mainWindow.webContents.send(com.read_mp3, data.buffer);
	})
})

