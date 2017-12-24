// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// eslint-disable-next-line no-use-before-define
const { ipcRenderer } = require('electron')

/// download template
const downLoadBtn = document.getElementById('download-template')
downLoadBtn.addEventListener('click', () => {
	ipcRenderer.send('download-template')
})
ipcRenderer.on('template-downloaded', (event, path) => {
	document.getElementById('downloaded-template').innerHTML = path
})
//// end of download template
const uploadExamBtn = document.getElementById('upload-exam')

uploadExamBtn.addEventListener('click', function() {
	ipcRenderer.send('upload-exam') // eslint-disable-line
})
ipcRenderer.on('exam-uploaded', (event, path) => {
	document.getElementById('exam-uploaded').innerHTML = `saved in ${path}`
})
///////////
