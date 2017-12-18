// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// eslint-disable-next-line no-use-before-define
import { ipcRenderer as ipc } from 'electron'
// eslint-disable-next-line
const selectDirBtn = document.getElementById('select-directory')

selectDirBtn.addEventListener('click', function() {
	ipc.send('open-file-dialog') // eslint-disable-line
})

ipc.on('selected-directory', function(event, path) {
	document.getElementById('selected-file').innerHTML = `You selected: ${path}`
})
