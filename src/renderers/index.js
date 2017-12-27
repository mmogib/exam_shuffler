// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// eslint-disable-next-line no-use-before-define
const MainView = require('../windows/views/MainView')
const MainController = require('../windows/controllers/MainController')

/// MAIN INDEX
const mainV = new MainView()
document.querySelector('.container').innerHTML = mainV.html()
const mainC = new MainController()

const showGroupsWindow = () => {
	mainC.openGroupsWindow()
}
document
	.getElementById('changeGroupgs')
	.addEventListener('click', showGroupsWindow)

document.addEventListener('readystatechange', () => {})
