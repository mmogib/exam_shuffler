const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.

const path = require('path')

const { createWindow } = require('../helpers')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const mainEvents = mainWindow => {
	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	app.on(
		'ready',
		() => (mainWindow = createWindow(path.join(__dirname, '/../index.html')))
	)

	// Quit when all windows are closed.
	app.on('window-all-closed', function() {
		// On OS X it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== 'darwin') {
			app.quit()
		}
	})

	app.on('activate', function() {
		// On OS X it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (mainWindow === null) {
			mainWindow = createWindow(path.join(__dirname, '/../index.html'))
		}
	})
}

module.exports = mainEvents
