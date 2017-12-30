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
	ipc.on('update-groups', () => {
		mainWindow.webContents.send('update-groups')
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

	ipc.on('upload-exam', function(event) {
		dialog.showOpenDialog(
			mainWindow,
			{
				properties: ['openFile'],
				filters: [{ name: 'Upload your exam', extensions: ['tex'] }]
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
			try {
				const examReader = new ReadExam(file, config.varNumAnswers)
				examReader.loadQuestions()
				const questions = examReader.questions
				if (examReader.hasError) {
					dialog.showMessageBox(mainWindow, {
						type: 'error',
						title: 'Error',
						message: examReader.error.join(', ')
					})
				} else if (parseInt(config.varNumOfQuestions) !== questions.length) {
					dialog.showMessageBox(mainWindow, {
						type: 'error',
						title: 'Error',
						message: `Your uploaded file should contain ${
							config.varNumOfQuestions
						} questions, but it contains ${questions.length} instead.`
					})
				} else {
					const exam = new Exam(questions, config)

					saveFile(exam.getExam()).then(filename => {
						if (filename !== false) {
							event.sender.send('exam-processed', filename)
						}
					})
				}
			} catch (error) {
				dialog.showErrorBox(
					'Error ',
					'The file you uploaded is not properly formatted.'
				)
			}
		}
	})

	ipc.on('download-template', (event, config) => {
		const examTemplate = new ExamTemplate(config)
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
