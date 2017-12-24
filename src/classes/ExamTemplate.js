const path = require('path')
const { loadFileSync } = require('../helpers')
const settings = require('../configs/settings')
const config = require('../configs/configs')

class ExamTemplate {
	constructor() {
		this.qTemplate = path.join(__dirname, '/../templates/question-template.tex')
		this.examTemplate = path.join(__dirname, '/../templates/exam-template.tex')
		this.template = ''
		this.init()
	}
	getTemplate() {
		return this.template
	}
	init() {
		let temp = loadFileSync(this.qTemplate)
		const odd = settings.gvarAfterOddQuestion + '\n'
		const even = settings.gvarAfterEvenQuestion + '\n'
		let str = config.varCourseCode + '\n'
		str = settings.gvarBeginQuestionTag
		for (let i = 1; i < config.varNumOfQuestions; i++) {
			str += `\n%${i}\n` + temp + '\n'
			str += i % 2 === 0 ? even : odd
			str += '\n' + settings.gvarNextQuestion + '\n'
		}
		//str += config.varNumOfQuestions % 2 === 0 ? even : odd
		str +=
			`\n%${config.varNumOfQuestions}\n` +
			temp +
			'\n' +
			settings.gvarEndQuestionTag
		let data = loadFileSync(this.examTemplate)
		this.template = data.replace(settings.gvarQUESTIONSPLACEHOLDER, str)
	}
}

module.exports = ExamTemplate
