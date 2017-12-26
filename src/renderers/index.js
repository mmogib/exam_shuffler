// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// eslint-disable-next-line no-use-before-define
const { ipcRenderer } = require('electron')
const { saveJson } = require('../helpers')

let varTerm = document.getElementById('varTerm'),
	varCourseCode = document.getElementById('varCourseCode'),
	varExamTitle = document.getElementById('varExamTitle'),
	varDate = document.getElementById('varDate'),
	varNumOfQuestions = document.getElementById('varNumOfQuestions'),
	varNumOfVersions = document.getElementById('varNumOfVersions'),
	varNumAnswers = document.getElementById('varNumAnswers'),
	varTimeAllowed = document.getElementById('varTimeAllowed'),
	examPath = '',
	myconfig = require('../configs/configs.js')

document.addEventListener('readystatechange', () => {
	ipcRenderer.send('get-initial-config')
})
ipcRenderer.on('set-initial-config', () => {
	varTerm.value = myconfig.varTerm
	varCourseCode.value = myconfig.varCourseCode
	varExamTitle.value = myconfig.varExamTitle
	varDate.value = myconfig.varDate
	varNumOfQuestions.value = myconfig.varNumOfQuestions
	varNumOfVersions.value = myconfig.varNumOfVersions
	varNumAnswers.value = myconfig.varNumAnswers
	varTimeAllowed.value = myconfig.varTimeAllowed
})
/// download template
const downLoadBtn = document.getElementById('download-template')
downLoadBtn.addEventListener('click', () => {
	ipcRenderer.send('download-template')
})
ipcRenderer.on('template-downloaded', (event, path) => {
	document.getElementById(
		'downloaded-template'
	).innerHTML = `Your template has been saved as  <strong> ${path}</strong>`
})
//// end of download template
const uploadExamBtn = document.getElementById('upload-exam')
uploadExamBtn.addEventListener('click', function() {
	ipcRenderer.send('upload-exam') // eslint-disable-line
})
ipcRenderer.on('exam-uploaded', (event, path) => {
	examPath = path
	document.getElementById(
		'exam-uploaded'
	).innerHTML = `Your exam <strong>${path}</strong> has been uploaded.`
})
///////////

//// start processing
const saveExamBtn = document.getElementById('saveConfig')
saveExamBtn.addEventListener('click', function() {
	if (!examPath) {
		ipcRenderer.send('open-error-dialog', 'Please first upload your file')
	} else {
		saveJson(__dirname + '/../configs/configs.json', myconfig)
		ipcRenderer.send('process-exam', examPath, myconfig) // eslint-disable-line
	}
})
ipcRenderer.on('exam-processed', (event, path) => {
	document.getElementById(
		'exam-processed'
	).innerHTML = `Your exam has been processed and saved in <strong>${path}</strong>`
})

const container = document.querySelector('.container')
container.addEventListener('change', e => {
	let temp = {}
	temp[e.target.id] = e.target.value
	let temp3 = Object.assign({}, myconfig, temp)
	myconfig = {}
	myconfig = temp3
})
