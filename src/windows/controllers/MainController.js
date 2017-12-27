const { ipcRenderer } = require('electron')
const { saveJson } = require('../../helpers')
const MainView = require('../views/MainView')
module.exports = class MainController {
	constructor() {
		this.varTerm = ''
		this.varCourseCode = ''
		this.varExamTitle = ''
		this.varDate = ''
		this.varNumOfQuestions = ''
		this.varNumOfVersions = ''
		this.varNumAnswers = ''
		this.varTimeAllowed = ''
		this.varNumGroups = ''
		this.varGroups = []
		this.examPath = ''
		this.myconfig = ''
		this.init()
		this.setUpListeners()
	}

	init() {
		this.varTerm = document.getElementById('varTerm')
		this.varCourseCode = document.getElementById('varCourseCode')
		this.varExamTitle = document.getElementById('varExamTitle')
		this.varDate = document.getElementById('varDate')
		this.varNumOfQuestions = document.getElementById('varNumOfQuestions')
		this.varNumOfVersions = document.getElementById('varNumOfVersions')
		this.varNumAnswers = document.getElementById('varNumAnswers')
		this.varTimeAllowed = document.getElementById('varTimeAllowed')
		this.varNumGroups = document.getElementById('varNumGroups')
		this.myconfig = require('../../configs/configs.js')
		ipcRenderer.send('get-initial-config')
	}
	displayGroups() {
		const mainV = new MainView()
		document.getElementById('groups').innerHTML = mainV.groupHtml(this.varGroups)
	}

	setUpListeners() {
		ipcRenderer.on('set-initial-config', () => {
			this.varTerm.value = this.myconfig.varTerm
			this.varCourseCode.value = this.myconfig.varCourseCode
			this.varExamTitle.value = this.myconfig.varExamTitle
			this.varDate.value = this.myconfig.varDate
			this.varNumOfQuestions.value = this.myconfig.varNumOfQuestions
			this.varNumOfVersions.value = this.myconfig.varNumOfVersions
			this.varNumAnswers.value = this.myconfig.varNumAnswers
			this.varTimeAllowed.value = this.myconfig.varTimeAllowed
			this.varNumGroups.innerHTML = this.myconfig.varNumGroups
			this.varGroups = this.myconfig.varGroups
			this.displayGroups()
		})
		/// download template
		const downLoadBtn = document.getElementById('download-template')
		downLoadBtn.addEventListener('click', () => {
			ipcRenderer.send('download-template')
		})
		ipcRenderer.on('update-groups', (e, groups) => {
			this.varGroups = groups
			this.varNumGroups.innerHTML = groups.length
			this.displayGroups()
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
			this.setPath(path)
			this.examPath = path
			document.getElementById(
				'exam-uploaded'
			).innerHTML = `Your exam <strong>${path}</strong> has been uploaded.`
		})
		///////////

		//// start processing
		const saveExamBtn = document.getElementById('saveConfig')
		let _this = this
		saveExamBtn.addEventListener(
			'click',
			function() {
				if (!_this.examPath) {
					ipcRenderer.send('open-error-dialog', 'Please first upload your file')
				} else {
					saveJson(__dirname + '/../../configs/configs.json', _this.myconfig)
					ipcRenderer.send('process-exam', _this.examPath, _this.myconfig) // eslint-disable-line
				}
			},
			_this
		)
		ipcRenderer.on('exam-processed', (event, path) => {
			document.getElementById(
				'exam-processed'
			).innerHTML = `Your exam has been processed and saved in <strong>${path}</strong>`
		})

		const container = document.querySelector('.container')
		container.addEventListener('change', e => {
			let temp = {}
			temp[e.target.id] = e.target.value
			let temp3 = Object.assign({}, this.myconfig, temp)
			this.myconfig = {}
			this.myconfig = temp3
		})
	}
	setPath(path) {
		console.log(path)
		this.examPath = path
	}
	openGroupsWindow() {
		ipcRenderer.send('open-groups-window')
	}
}
