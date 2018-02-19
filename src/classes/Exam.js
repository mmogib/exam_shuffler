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
		this.answerKey = ''
		this.questionTex = ''
		this.examTex = ''
		this.arrAllQuestions = []
		this.alphabet = 'abcdefjhijklmnpoqrstuvwxyz'
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
		this.answerKey = loadFileSync(
			path.join(__dirname, '/../templates/partials/answer-key.tex')
		)
	}
	getQuestionString(shouldShuffle = false) {
		let questions = this.questions
		if (shouldShuffle) {
			let totalSoFar = 0
			let shuffledQs = []
			for (let group of this.config.varGroups) {
				let temp = questions.slice(totalSoFar, totalSoFar + group)
				totalSoFar += group
				shuffledQs = shuffledQs.concat(shuffle(temp).options)
			}
			questions = shuffledQs
		}

		let questionsString = ''
		let index = 1
		let tempArr = []
		for (let q of questions) {
			let oString = ''
			let shuffled, options, correct
			if (shouldShuffle) {
				shuffled = shuffle(q.options)
				options = shuffled.options
				correct = shuffled.correctAnswer
			} else {
				options = q.options
				correct = q.correctAnswer
			}
			tempArr.push({ body: q.body, options, correctAnswer: correct })
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
		this.arrAllQuestions.push(tempArr)
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
			.replace(/GVAR_UNIVERSITY/g, this.config.gvarUniversity)
			.replace(/GVAR_DEPARTMENT/g, this.config.gvarDepartment)
			.replace(/VAR_COURSE_CODE/g, this.config.varCourseCode)
			.replace(/VAR_EXAM_TITLE/g, this.config.varExamTitle)
			.replace(/VAR_TERM/g, this.config.varTerm)
			.replace(/VAR_DATE/g, this.config.varDate)
			.replace(/VAR_NUM_OF_VERSIONS/g, this.config.varNumOfVersions)
			.replace(/VAR_NUM_OF_QUESTIONS/g, this.config.varNumOfQuestions)
			.replace(/VAR_NUM_ANSWERS/g, this.config.varNumAnswers)
			.replace(/VAR_TIME_ALLOWED/g, this.config.varTimeAllowed)
			.replace(
				/VAR_NUM_OF_PAGES/g,
				Math.ceil(parseInt(this.config.varNumOfQuestions) / 2)
			)
			.replace(/VAR_VERSION_NAME/g, name)
	}
	getAnswerKey() {
		let str = '\\begin{tabular}{'
		const numOfCodes = this.arrAllQuestions.length
		for (let i = 0; i < numOfCodes + 1; i++) {
			str += '|c|'
		}
		str += '}\n \\hline \n Q & MM  '
		for (let i = 0; i < numOfCodes - 1; i++) {
			str += `& V${i + 1}`
		}
		str += '\\\\ \n \\hline \\hline \n'
		for (let i = 0; i < this.config.varNumOfQuestions; i++) {
			str += `${i + 1} `
			for (let code = 0; code < numOfCodes; code++) {
				str += `& ${this.alphabet.charAt(
					this.arrAllQuestions[code][i].correctAnswer
				)}`
			}

			str += '\\\\ \\hline \n'
		}
		str += '\\end{tabular}'
		return str
	}
	getExam() {
		let examVar = ''
		let examString = this.examTex.replace('VAR_PREAMBLE', this.preamble)
		const masterVersion = this.getMasterVersion()
		examVar = masterVersion + '\n'
		for (let i = 1; i <= this.config.varNumOfVersions; i++) {
			examVar += this.getVersion(`CODE 00${i}`) + '\n'
		}
		examVar += this.setVariables(
			this.answerKey.replace(/GVAR_ANSWER_KEY/, this.getAnswerKey())
		)
		examString = examString.replace('VAR_EXAM', examVar)
		this.examString = examString
		return this.examString
	}
}

module.exports = Exam
