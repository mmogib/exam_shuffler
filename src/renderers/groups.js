const { ipcRenderer } = require('electron')
const { saveJson, saveJasonLocally, loadConfigs } = require('../helpers')

const groupField = (group, index) => {
	return `
		<div class="twelve columns">
			<label for="group_${index}">Group ${index + 1}</label>
			<input class="group" type="text" value="${group}" >
			 <a href="#" class="button  button-red u-pull-right" id="deletegroup_${index}">&times;</a>
		</div>
	`
}
const listAllGroups = groups => {
	let html = ''
	let varGroups = groups.length
	for (let i = 0; i < varGroups; i++) {
		html += groupField(groups[i], i)
	}

	return html
}
function addNewGroup() {
	const groupsDivs = document.querySelectorAll('.group')
	let groups = []
	for (let i = 0; i < groupsDivs.length; i++) {
		groups.push(groupsDivs[i].value)
	}

	groups.push(0)
	groupsDiv.innerHTML = listAllGroups(groups)
	groups = null
}
function saveWindow() {
	const groupsDivs = document.querySelectorAll('.group')
	let groups = []
	let runningTotal = 0
	for (let i = 0; i < groupsDivs.length; i++) {
		let value = Math.min(groupsDivs[i].value, varNumQuestions - runningTotal)
		if (value > 0) {
			runningTotal += value
			groups.push(value)
		}
	}
	const difference = varNumQuestions - runningTotal
	if (difference > 0) {
		groups[groups.length - 1] += difference
	}
	varNumGroups = groups.length
	configs.varNumGroups = groups.length
	configs.varGroups = groups
	saveJasonLocally(configs)
	//ipcRenderer.send('save-configs', configs)
	ipcRenderer.send('update-groups')
	ipcRenderer.send('close-groups-window')
}
function cancelWindow() {
	ipcRenderer.send('close-groups-window')
}
function deleteGroup(e) {
	e.preventDefault()
	e.stopPropagation()
	let [id, i] = e.target.id.split('_')
	if (id === 'deletegroup') {
		let groups = configs.varGroups
		groups.splice(i, 1)
		configs.varGroups = groups
		varNumGroups = groups.length
		groupsDiv.innerHTML = listAllGroups(configs.varGroups)
	}
}
let groupsDiv, varNumGroups, configs, varNumQuestions

document.addEventListener('readystatechange', () => {
	configs = loadConfigs()
	varNumGroups = configs.varNumGroups
	varNumQuestions = configs.varNumOfQuestions
	groupsDiv = document.getElementById('groups')
	groupsDiv.innerHTML = listAllGroups(configs.varGroups)

	groupsDiv.addEventListener('click', deleteGroup)

	document.querySelector('.container p').innerHTML = `Number of Groups: ${
		configs.varNumGroups
	}`
	document.getElementById('addNewGroup').addEventListener('click', addNewGroup)

	document.getElementById('cancelWindow').addEventListener('click', cancelWindow)

	document.getElementById('saveWindow').addEventListener('click', saveWindow)
})
