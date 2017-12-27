const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
	// squirrel event handled and app will exit in 1000ms, so don't do anything else
	// eslint-disable-next-line no-use-before-define
	return // eslint-disable-line
}
const electron = require('electron')
// Module to control application life.
const app = electron.app
const path = require('path')
const { createWindow } = require('./src/helpers')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const windowFile = path.join(__dirname, '/src/windows/index.html')
const events = require('./src/events')

let mainWindow, groupsWindow
app.on('ready', () => {
	mainWindow = createWindow(windowFile)
	mainWindow.on('close', () => {
		app.quit()
	})
	events(mainWindow, groupsWindow)
})

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
		mainWindow = createWindow(windowFile)
	}
})
////////////////////////////////////////////////////////////////////////
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
