const path = require('path')
const { loadFileSync } = require('../helpers')
const settings = require('../configs/settings')

class ExamTemplate {
	constructor(config) {
		this.config = config
		this.qTemplate = path.join(__dirname, '/../templates/question-template.tex')
		this.examTemplate = path.join(__dirname, '/../templates/exam-template.tex')
		this.template = ''
		this.init()
	}
	getTemplate() {
		return this.template
	}
	loadQuestion() {
		let str = `
		%%BEGIN_QUESTION_BODY%% 
			\\item Type question VAR_QUESTION_NUM  here
		%%END_QUESTION_BODY%%
		\\\\[0.2in] 
		\\begin{enumerate}[(a)]
		%%BEGIN_OPTIONS%% \n`
		for (let i = 0; i < parseInt(this.config.varNumAnswers); i++) {
			str += '\\item Option $' + (i + 1) + '$ \n'
		}
		str += `%%END_OPTIONS%%
		\\end{enumerate}`
		return str
	}
	init() {
		let temp = this.loadQuestion() //loadFileSync(this.qTemplate)
		const odd = settings.gvarAfterOddQuestion + '\n'
		const even = settings.gvarAfterEvenQuestion + '\n'
		let str = this.config.varCourseCode + '\n'
		str = settings.gvarBeginQuestionTag
		for (let i = 1; i < this.config.varNumOfQuestions; i++) {
			str += `\n%${i}\n` + temp.replace(/VAR_QUESTION_NUM/, i) + '\n'
			str += i % 2 === 0 ? even : odd
			str += '\n' + settings.gvarNextQuestion + '\n'
		}
		//str += this.config.varNumOfQuestions % 2 === 0 ? even : odd
		str +=
			`\n%${this.config.varNumOfQuestions}\n` +
			temp.replace(/VAR_QUESTION_NUM/, this.config.varNumOfQuestions) +
			'\n' +
			settings.gvarEndQuestionTag
		let data = loadFileSync(this.examTemplate)
		//data = data.replace(/VAR_COURSE_CODE/, this.config.varCourseCode)
		this.template = data.replace(settings.gvarQUESTIONSPLACEHOLDER, str)
	}
}

module.exports = ExamTemplate
