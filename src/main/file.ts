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
	glob( 'c:/tracks/2016 - 1/*.mp3', function( err, files ) {
		const trax:Track[] = []
		files.forEach(file => {
			id3.read(file, function(err:any, tags:any) {
				const t = new Track()
				t.title = tags.title
				t.artist = tags.artist
				t.file = file
				t.genre = tags.genre
				t.key = tags.initialKey
				t.bpm = tags.bpm
				trax.push(t)
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
		if(result.filePaths[0]) {
			mainWindow.webContents.send(com.pick_file, result.filePaths[0]);
		}
	}).catch(err => {
		console.log(err)
	})
})

ipcMain.on(com.read_nml, function (event, filename) {
	fs.readFile(filename[0], (err, data) => {
		mainWindow.webContents.send(com.read_nml, data.toString());
	})
})

// ipcMain.on(com.read_mp3, function (event, filename) {
// 	fs.readFile(filename, (err, data) => {
// 		mainWindow.webContents.send(com.read_mp3, data.buffer);
// 	})
// })

ipcMain.on(com.read_mp3 +'left', function (event, filename) {
	fs.readFile(filename, (err, data) => {
		mainWindow.webContents.send(com.read_mp3 +'left', data.buffer);
	})
})

ipcMain.on(com.read_mp3 +'right', function (event, filename) {
	fs.readFile(filename, (err, data) => {
		mainWindow.webContents.send(com.read_mp3 +'right', data.buffer);
	})
})


