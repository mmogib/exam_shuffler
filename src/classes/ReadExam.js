const { loadFileSync, shuffle } = require('../helpers')
const settings = require('../configs/settings')

class ReadExam {
	constructor(file) {
		this.file = file
		this.settings = settings
		this.questions = []
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
		console.log(qArray.length)
		for (let q in qArray) {
			const qBody = qArray[q]
				.split(this.settings.gvarEndQuestionBodyTag)[0]
				.split(this.settings.gvarBeginQuestionBodyTag)[1]
			const qOptions = qArray[q]
				.split(this.settings.gvarBeginOptions)[1]
				.split(this.settings.gvarEndOptions)[0]
			const qOptionsArray = qOptions.split(this.settings.gvarOPTIONITEM)
			let qOptionsArrayString = []
			qOptionsArray.forEach((value, index) => {
				if (index > 0)
					qOptionsArrayString.push(value.split(this.settings.gvarOPTION)[1])
			})
			const options = shuffle(qOptionsArrayString)
			this.questions.push({
				body: qBody,
				options: options.options,
				correctAnswer: options.correctAnswer
			})
		}
	}
}
module.exports = ReadExam
