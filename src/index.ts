import { app, BrowserWindow, } from 'electron';
import path from 'path'

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit()
}
// not working:
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export let mainWindow: BrowserWindow

const createWindow = (): void => {

	const preload = path.join(__dirname, '../renderer/main_window', "preload.js")

	mainWindow = new BrowserWindow({
		// show: false,
		webPreferences: {
			enableRemoteModule: false, // turn off remote
			// nodeIntegration: false, // is default value after Electron v5
			preload: preload // use a preload script
		}
	})
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

	mainWindow.maximize()

	mainWindow.webContents.openDevTools()

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

import './main/file'