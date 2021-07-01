import { ipcMain, dialog } from 'electron';
// import xml2js from 'xml2js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import fs from 'fs'
import glob from 'glob'
import id3 from 'node-id3'

import { mainWindow } from "../index"
import com from './processcom'
import Track from "../data/Track"
import * as lib from '../lib/lib'

/**
 * @deprecated
 * reading from nmp instead
 */
ipcMain.on('!' +com.read_collection, function () {
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

// ipcMain.on(com.read_collection, function () {
// 	fs.readFile('all.nml', (err, data) => {
// 		mainWindow.webContents.send(com.read_collection, data.toString());
// 	})
// })

ipcMain.on(com.read_collection, function () {
	fs.readFile('collection.mxm', (err, data) => {
		const tracks = JSON.parse(data.toString())
		// translate key notation
		// tracks.forEach((track:Track) => {
		// 	if(track.key && !isNaN(parseInt(track.key[0]))){
		// 		console.log(track.key, lib.translateKey(track.key))
		// 		track.key = lib.translateKey(track.key)
		// 	}
		// })
		mainWindow.webContents.send(com.read_collection, tracks)
	})
})

ipcMain.on(com.save_collection, function (event, tracks:Track[]) {
	console.log('saving')
	fs.writeFile('collection.mxm', JSON.stringify(tracks), function(err) {
		if (err) {
			console.log(err);
		}
		else {
			mainWindow.webContents.send(com.save_collection, tracks)
		}
	})
})

ipcMain.on(com.pick_file, function () {
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

ipcMain.on(com.read_zet_nml, function (event, filename) {
	fs.readFile(filename.pop(), (err, data) => {
		mainWindow.webContents.send(com.read_zet_nml, data.toString());
	})
})

ipcMain.on(com.read_collection_nml, function (event, filename) {
	fs.readFile(filename, (err, data) => {
		mainWindow.webContents.send(com.read_collection_nml, data.toString());
	})
})

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


