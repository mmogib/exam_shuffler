const { ipcRenderer } = require('electron')
const { saveJasonLocally, loadConfigs } = require('../../helpers')
import GroupsView from '../views/GroupsView'

export default class GroupsController {
	constructor() {
		this.groupsDiv = null
		this.varNumGroups = null
		this.configs = loadConfigs()
		this.varNumQuestions = null
		this.view = new GroupsView()
	}
	init() {
		let _this = this
		document.getElementById('groupsDiv').innerHTML = this.view.html()
		this.varNumGroups = this.configs.varNumGroups
		this.varNumQuestions = this.configs.varNumOfQuestions
		this.groupsDiv = document.getElementById('groups')
		this.groupsDiv.innerHTML = this.listAllGroups(this.configs.varGroups)

		this.groupsDiv.addEventListener('click', e => this.deleteGroup(e))

		document.querySelector('.container p').innerHTML = `Number of Groups: ${
			this.configs.varNumGroups
		}`
		document
			.getElementById('addNewGroup')
			.addEventListener('click', () => this.addNewGroup())

		document
			.getElementById('cancelWindow')
			.addEventListener('click', () => this.cancelWindow())

		document
			.getElementById('saveWindow')
			.addEventListener('click', () => this.saveWindow())
	}

	listAllGroups(groups) {
		let html = ''
		let varGroups = groups.length
		for (let i = 0; i < varGroups; i++) {
			html += this.view.groupField(groups[i], i)
		}

		return html
	}
	addNewGroup() {
		const groupsDivs = document.querySelectorAll('.group')
		let groups = []
		for (let i = 0; i < groupsDivs.length; i++) {
			groups.push(groupsDivs[i].value)
		}

		groups.push(0)
		this.groupsDiv.innerHTML = this.listAllGroups(groups)
		groups = null
	}
	saveWindow() {
		const groupsDivs = document.querySelectorAll('.group')
		let groups = []
		let runningTotal = 0
		for (let i = 0; i < groupsDivs.length; i++) {
			let value = Math.min(
				groupsDivs[i].value,
				this.varNumQuestions - runningTotal
			)
			if (value > 0) {
				runningTotal += value
				groups.push(value)
			}
		}
		const difference = this.varNumQuestions - runningTotal
		if (difference > 0) {
			groups[groups.length - 1] += difference
		}
		this.varNumGroups = groups.length === 0 ? 1 : groups.length
		this.configs.varNumGroups = this.varNumGroups
		this.configs.varGroups =
			this.varNumGroups === 1 ? [this.varNumQuestions] : groups
		saveJasonLocally(this.configs)
		//ipcRenderer.send('save-configs', configs)
		ipcRenderer.send('update-groups')
		ipcRenderer.send('close-groups-window')
	}
	cancelWindow() {
		ipcRenderer.send('close-groups-window')
	}
	deleteGroup(e) {
		e.preventDefault()
		e.stopPropagation()
		console.log(e)
		let [id, i] = e.target.id.split('_')
		if (id === 'deletegroup') {
			let groups = this.configs.varGroups
			groups.splice(i, 1)
			this.configs.varGroups = groups
			this.varNumGroups = groups.length
			this.groupsDiv.innerHTML = this.listAllGroups(this.configs.varGroups)
		}
	}
}
