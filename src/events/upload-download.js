const electron = require('electron')
// Module to control application life.

const ipc = electron.ipcMain
const dialog = electron.dialog

const ExamTemplate = require('../classes/ExamTemplate')
const ReadExam = require('../classes/ReadExam')
const Exam = require('../classes/Exam')
const { saveFile } = require('../helpers')

const uploadDownLoads = mainWindow => {
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

module.exports = uploadDownLoads
