const path = require('path')
const { loadFileSync, shuffle } = require('../helpers')
const settings = require('../configs/settings')
class Exam {
	constructor(questions, config) {
		this.config = config
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
	getVersion(name) {
		let examVar = `
			${this.codeFirstPage}
			${this.versionStart}
			${this.getQuestionString(true)}
			${this.versionEnd}
		`
		return this.setVariables(examVar, name)
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
			.replace(/VAR_COURSE_CODE/g, this.config.varCourseCode)
			.replace(/VAR_EXAM_TITLE/g, this.config.varExamTitle)
			.replace(/VAR_TERM/g, this.config.varTerm)
			.replace(/VAR_DATE/g, this.config.varDate)
			.replace(/VAR_NUM_OF_VERSIONS/g, this.config.varNumOfVersions)
			.replace(/VAR_NUM_OF_QUESTIONS/g, this.config.varNumOfQuestions)
			.replace(/VAR_NUM_ANSWERS/g, this.config.varNumAnswers)
			.replace(/VAR_TIME_ALLOWED/g, this.config.varTimeAllowed)
			.replace(/VAR_NUM_OF_PAGES/g, parseInt(this.config.varNumOfQuestions) / 2)
			.replace(/VAR_VERSION_NAME/g, name)
	}
	getExam() {
		let examVar = ''
		let examString = this.examTex.replace('VAR_PREAMBLE', this.preamble)
		const masterVersion = this.getMasterVersion()
		examVar = masterVersion + '\n'
		for (let i = 1; i <= this.config.varNumOfVersions; i++) {
			examVar += this.getVersion(`CODE 000${i}`) + '\n'
		}
		examString = examString.replace('VAR_EXAM', examVar)
		this.examString = examString
		return this.examString
	}
}

module.exports = Exam
