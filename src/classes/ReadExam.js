const { loadFileSync } = require('../helpers')
const settings = require('../configs/settings')

class ReadExam {
	constructor(file, noOfOptions) {
		this.file = file
		this.settings = settings
		this.noOfOptions = parseInt(noOfOptions)
		this.questions = []
		this.hasError = false
		this.error = []
	}
	loadQuestions() {
		const data = loadFileSync(this.file)
		/*let regExp = new RegExp(
			`(?<=${this.settings.gvarBeginQuestionTag})(.*)(?=${
				this.settings.gvarEndQuestionTag
			})`,
			's'
		)*/
		let tempMatches = data.split(this.settings.gvarBeginQuestionTag)

		const matches = tempMatches[1].split(this.settings.gvarEndQuestionTag)[0]

		let questionsString = ''
		questionsString = matches
		const qArray = questionsString.split(this.settings.gvarNextQuestion)
		for (let q in qArray) {
			const qBody = qArray[q]
				.split(this.settings.gvarEndQuestionBodyTag)[0]
				.split(this.settings.gvarBeginQuestionBodyTag)[1]
				.split(this.settings.gvarOPTIONITEM)[1]
				.trim()
			const qOptions = qArray[q]
				.split(this.settings.gvarBeginOptions)[1]
				.split(this.settings.gvarEndOptions)[0]
			const qOptionsArray = qOptions.split(this.settings.gvarOPTIONITEM)
			let qOptionsArrayString = []
			qOptionsArray.forEach((value, index) => {
				if (index > 0)
					qOptionsArrayString.push(
						value
							.replace(/\n/g, '')
							.replace(/\r/g, '')
							.trim()
					)
			})
			if (qOptionsArrayString.length !== this.noOfOptions) {
				this.hasError = true
				this.error.push(
					`Options of question ${q + 1} are not ${this.noOfOptions}, please check.`
				)
			}
			this.questions.push({
				body: qBody,
				options: qOptionsArrayString,
				correctAnswer: 0
			})
		}
	}
}
module.exports = ReadExam
