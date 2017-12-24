const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
	// squirrel event handled and app will exit in 1000ms, so don't do anything else
	// eslint-disable-next-line no-use-before-define
	return // eslint-disable-line
}
const mainEvents = require('./src/events/main-events')
let mainWindow
mainEvents(mainWindow)
////////////////////////////////////////////////////////////////////////
const uploadDownLoads = require('./src/events/upload-download')
uploadDownLoads(mainWindow)
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
