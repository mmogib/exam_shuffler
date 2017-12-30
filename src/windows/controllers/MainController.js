const { ipcRenderer } = require('electron')
const { saveJasonLocally, loadConfigs } = require('../../helpers')
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
	loadConfig() {
		this.myconfig = loadConfigs()
	}
	validateField(key) {
		let valid = true,
			errorStr = ''
		switch (key) {
			case 'varTerm': {
				if (!/^(\d){3}$/.test(this.myconfig[key])) {
					errorStr = 'must be three digit integer'
					valid = false
				}
				break
			}
			case 'varCourseCode':
			case 'varExamTitle':
			case 'varDate':
			case 'varTimeAllowed': {
				if (!/\w+/.test(this.myconfig[key])) {
					errorStr = 'cannot be empty'
					valid = false
				}
				break
			}
			case 'varNumOfQuestions':
			case 'varNumOfVersions':
			case 'varNumAnswers': {
				if (!/\w+/.test(this.myconfig[key]) || parseInt(this.myconfig[key]) <= 0) {
					errorStr = 'must be a number'
					valid = false
				}
				break
			}
		}
		return { isValid: valid, errorStr }
	}
	validate() {
		let valid = true

		const configs = Object.keys(this.myconfig)
		configs.forEach(key => {
			if (key !== 'varNumGroups' && key !== 'varGroups') {
				let temp = document.getElementById(key + '_error')
				temp.innerHTML = ''
				temp.style.display = 'none'
				let validate = this.validateField(key)
				if (!validate.isValid) {
					valid = false
					temp.innerHTML = validate.errorStr
					temp.style.display = 'block'
				}
			}
		})

		return valid
	}
	setConfigs() {
		this.loadConfig()
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
		this.setConfigs()
	}
	displayGroups() {
		const mainV = new MainView()
		document.getElementById('groups').innerHTML = mainV.groupHtml(this.varGroups)
	}

	setUpListeners() {
		let _this = this

		/// download template
		const downLoadBtn = document.getElementById('download-template')
		downLoadBtn.addEventListener(
			'click',
			() => {
				if (_this.save()) {
					ipcRenderer.send('download-template', _this.myconfig)
				} else {
					ipcRenderer.send(
						'open-error-dialog',
						'Please make sure that you fill the form correctly'
					)
				}
			},
			_this
		)
		ipcRenderer.on('update-groups', () => {
			this.setConfigs()
			this.varGroups = this.myconfig.varGroups
			this.varNumGroups.innerHTML = this.myconfig.varNumGroups
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
		const downloadExamBtn = document.getElementById('downloadFile')

		saveExamBtn.addEventListener(
			'click',
			() => {
				if (_this.save()) {
					let box = document.getElementById('success-save')
					box.innerHTML = ''
					let div = document.createElement('div')
					div.innerHTML = `Saved Successfully
					<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
					`
					box.appendChild(div)
					box.classList.remove('hide')
					div.classList.add('alert-success')

					setTimeout(function() {
						box.classList.add('hide')
						box.innerHTML = ''
					}, 3000)
				}
			},
			_this
		)
		downloadExamBtn.addEventListener(
			'click',
			() => {
				if (_this.save()) {
					if (!_this.examPath) {
						ipcRenderer.send('open-error-dialog', 'Please first upload your file')
					} else {
						ipcRenderer.send('process-exam', _this.examPath, _this.myconfig) // eslint-disable-line
					}
				} else {
					ipcRenderer.send(
						'open-error-dialog',
						'Please make sure that you fill the form correctly'
					)
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
	save() {
		let totalQ = this.myconfig.varGroups.reduce((total, value) => {
			return total + value
		}, 0)
		const diff = this.myconfig.varNumOfQuestions - totalQ
		if (diff !== 0) {
			this.varGroups = [this.myconfig.varNumOfQuestions]
			this.varNumGroups.innerHTML = 1
			this.myconfig.varGroups = [this.myconfig.varNumOfQuestions]
			this.myconfig.varNumGroups = 1
			this.displayGroups()
		}
		if (this.validate()) {
			saveJasonLocally(this.myconfig)
			return true
		}
		return false
	}
	setPath(path) {
		this.examPath = path
	}
	openGroupsWindow() {
		ipcRenderer.send('open-groups-window')
	}
}
