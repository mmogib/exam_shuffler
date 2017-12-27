const electron = require('electron')
// Module to control application life.
const path = require('path')
const ipc = electron.ipcMain
const dialog = electron.dialog

const ExamTemplate = require('../classes/ExamTemplate')
const ReadExam = require('../classes/ReadExam')
const Exam = require('../classes/Exam')
const { saveFile, createWindow } = require('../helpers')
const groupFile = path.join(__dirname, '/../windows/groups.html')

const events = (mainWindow, groupsWindow) => {
	ipc.on('update-groups', (e, groups) => {
		mainWindow.webContents.send('update-groups', groups)
	})
	ipc.on('close-groups-window', () => {
		groupsWindow.close()
	})
	ipc.on('open-groups-window', function() {
		groupsWindow = createWindow(
			groupFile,
			600,
			800,
			false,
			true,
			mainWindow,
			false
		)
		groupsWindow.on('close', () => {
			groupsWindow = null
		})

		groupsWindow.on('ready-to-show', () => {
			groupsWindow.show()
		})
	})

	ipc.on('get-initial-config', function(e) {
		e.sender.send('set-initial-config')
	})

	ipc.on('upload-exam', function(event) {
		dialog.showOpenDialog(
			mainWindow,
			{
				properties: ['openFile'],
				filters: [{ name: 'LaTex Files', extensions: ['tex'] }]
			},
			function(files) {
				if (files) {
					event.sender.send('exam-uploaded', files[0])
				}
			}
		)
	})

	ipc.on('process-exam', function(event, file, config) {
		if (file) {
			const examReader = new ReadExam(file)
			examReader.loadQuestions()
			const exam = new Exam(examReader.questions, config)
			saveFile(exam.getExam()).then(filename => {
				if (filename !== false) {
					event.sender.send('exam-processed', filename)
				}
			})
		}
	})

	ipc.on('download-template', event => {
		const examTemplate = new ExamTemplate()
		const txt = examTemplate.getTemplate()
		saveFile(txt).then(filename => {
			if (filename !== false) {
				event.sender.send('template-downloaded', filename)
			}
		})
	})

	ipc.on('open-error-dialog', function(event, errorMessage) {
		dialog.showErrorBox('Error ', errorMessage)
	})
}

module.exports = events