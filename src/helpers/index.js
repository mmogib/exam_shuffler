const electron = require('electron')
// Module to control application life.
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog

const url = require('url')
const fs = require('fs')
module.exports = {
	loadFile: file => {
		return new Promise((resolve, reject) => {
			fs.readFile(file, 'utf8', (error, data) => {
				if (error) {
					reject(error)
				} else {
					resolve(data)
				}
			})
		})
	},
	loadFileSync: file => {
		return fs.readFileSync(file, 'utf8')
	},
	shuffle: array => {
		let temp = []
		let i = array.length,
			j,
			swap,
			correctIndex = 0
		array.forEach(value => temp.push(value))
		while (--i) {
			j = (Math.random() * (i + 1)) | 0
			correctIndex = j === 0 ? i : correctIndex
			swap = temp[i]
			temp[i] = temp[j]
			temp[j] = swap
		}
		return { options: temp, correctAnswer: correctIndex }
	},
	createWindow(file, width = 1200, height = 800) {
		// Create the browser window.
		let window = new BrowserWindow({ width, height })

		// and load the index.html of the app.
		window.loadURL(
			url.format({
				pathname: file,
				protocol: 'file:',
				slashes: true
			})
		)

		// Open the DevTools.
		// mainWindow.webContents.openDevTools()

		// Emitted when the window is closed.
		window.on('closed', function() {
			// Dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
			window = null
		})
		return window
	},
	saveFile(text) {
		const options = {
			title: 'Save LaTeX File',
			filters: [{ name: 'LaTeX', extensions: ['tex'] }]
		}
		return new Promise(resolve => {
			dialog.showSaveDialog(options, function(filename) {
				if (filename) {
					fs.writeFileSync(filename, text)
					resolve(filename)
				} else {
					resolve(false)
				}
			})
		})
	}
}
