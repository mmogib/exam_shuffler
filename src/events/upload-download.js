const electron = require('electron')
// Module to control application life.

const ipc = electron.ipcMain
const dialog = electron.dialog

const ExamTemplate = require('../classes/ExamTemplate')
const ReadExam = require('../classes/ReadExam')
const Exam = require('../classes/Exam')
const { saveFile } = require('../helpers')

const uploadDownLoads = mainWindow => {
	ipc.on('upload-exam', function(event) {
		dialog.showOpenDialog(
			mainWindow,
			{
				properties: ['openFile'],
				filters: [{ name: 'LaTex Files', extensions: ['tex'] }]
			},
			function(files) {
				if (files) {
					const examReader = new ReadExam(files[0])
					examReader.loadQuestions()
					const exam = new Exam(examReader.questions)
					saveFile(exam.getExam()).then(filename => {
						if (filename !== false) {
							event.sender.send('exam-uploaded', filename)
						}
					})
				}
			}
		)
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
}

module.exports = uploadDownLoads
