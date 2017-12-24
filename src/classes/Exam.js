const path = require('path')
const { loadFileSync, shuffle } = require('../helpers')
const settings = require('../configs/settings')
const config = require('../configs/configs')
class Exam {
	constructor(questions) {
		this.questions = questions
		this.examString = ''
		this.preamble = ''
		this.coverPage = ''
		this.masterFirstPage = ''
		this.codeFirstPage = ''
		this.versionStart = ''
		this.versionEnd = ''
		this.questionTex = ''
		this.examTex = ''
		this.init()
	}
	init() {
		this.preamble = loadFileSync(
			path.join(__dirname, '/../templates/partials/preamble.tex')
		)
		this.coverPage = loadFileSync(
			path.join(__dirname, '/../templates/partials/cover-page.tex')
		)
		this.masterFirstPage = loadFileSync(
			path.join(__dirname, '/../templates/partials/master-first-page.tex')
		)
		this.codeFirstPage = loadFileSync(
			path.join(__dirname, '/../templates/partials/code-first-page.tex')
		)
		this.versionStart = loadFileSync(
			path.join(__dirname, '/../templates/partials/version-start.tex')
		)
		this.versionEnd = loadFileSync(
			path.join(__dirname, '/../templates/partials/version-end.tex')
		)
		this.examTex = loadFileSync(
			path.join(__dirname, '/../templates/partials/exam.tex')
		)
		this.questionTex = loadFileSync(
			path.join(__dirname, '/../templates/partials/question.tex')
		)
	}
	getQuestionString(shouldShuffle = false) {
		const questions = shouldShuffle
			? shuffle(this.questions).options
			: this.questions
		let questionsString = ''
		let index = 1
		for (let q of questions) {
			let oString = ''
			let options = shouldShuffle ? shuffle(q.options).options : q.options
			for (let o of options) {
				oString += `
					${settings.gvarBEGINOPTION}
					${o}
					${settings.gvarENDOPTION}
				`
			}

			let separator =
				index++ % 2 === 0
					? settings.gvarEvenQuestionDel
					: settings.gvarOddQuestionDel

			questionsString += this.questionTex
				.replace('VAR_QUESTION_BODY', q.body)
				.replace('VAR_QUESTION_OPTIONS', oString)
				.replace('VAR_QUESTION_SEPARATOR', separator)
		}
		return questionsString
	}
	getVersion() {
		let examVar = `
			${this.codeFirstPage}
			${this.versionStart}
			${this.getQuestionString(true)}
			${this.versionEnd}
		`
		return this.setVariables(examVar, 'CODE 0001')
	}
	getMasterVersion() {
		let examVar = `
			${this.coverPage}
			${this.masterFirstPage}
			${this.versionStart}
			${this.getQuestionString()}
			${this.versionEnd}
		`
		return this.setVariables(examVar)
	}
	setVariables(vesrion, name = 'MASTER') {
		return vesrion
			.replace(/GVAR_UNIVERSITY/g, settings.gvarUniversity)
			.replace(/GVAR_DEPARTMENT/g, settings.gvarDepartment)
			.replace(/VAR_COURSE_CODE/g, config.varCourseCode)
			.replace(/VAR_EXAM_TITLE/g, config.varExamTitle)
			.replace(/VAR_TERM/g, config.varTerm)
			.replace(/VAR_DATE/g, config.varDate)
			.replace(/VAR_NUM_OF_VERSIONS/g, config.varNumOfVersions)
			.replace(/VAR_NUM_OF_QUESTIONS/g, config.varNumOfQuestions)
			.replace(/VAR_NUM_ANSWERS/g, config.varNumAnswers)
			.replace(/VAR_TIME_ALLOWED/g, config.varTimeAllowed)
			.replace(/VAR_NUM_OF_PAGES/g, parseInt(config.varNumOfQuestions) / 2)
			.replace(/VAR_VERSION_NAME/g, name)
	}
	getExam() {
		let examVar = ''
		let examString = this.examTex.replace('VAR_PREAMBLE', this.preamble)
		const masterVersion = this.getMasterVersion()
		const versionOne = this.getVersion()
		examVar = masterVersion + '\n' + versionOne
		examString = examString.replace('VAR_EXAM', examVar)
		this.examString = examString
		return this.examString
	}
}

module.exports = Exam
