const { shuffle, loadFile, loadFileSync } = require('./helpers')
const ExamReader = require('./classes/ReadExam')
const config = {
	varNumOfVersions: 4,
	varNumOfQuestions: 20,
	varNumAnswers: 5,
	varCourseCode: 'MATH 101',
	varExamTitle: 'EXAM I',
	varTerm: '171',
	varDate: 'Monday 21/12/2017',
	varTimeAllowed: '120 minutes'
}

/*
let files = []
files.push(loadFile(__dirname + '/templates/partials/preamble.tex'))
files.push(loadFile(__dirname + '/templates/partials/cover-page.tex'))

Promise.all(files)
	.then(allfiles => {
		fs.open(__dirname + '/output.tex', 'w', (err, newFile) => {
			allfiles.forEach(file => {
				fs.write(newFile, file, err => {
					if (err) console.log(err)
				})
			})
			fs.close(newFile, err => {
				if (err) console.log(err)
			})
		})
	})
	.catch(error => {
		console.log(error)
	})


loadFile(__dirname + '/templates/question-template.tex').then(temp => {
	const odd = '\\vspace{0.8in}\n'
	const even = `\\newpage\n`
	let str = '%%BEGIN_QUESTIONS%%'
	for (let i = 1; i < 20; i++) {
		str += `\n%${i}\n` + temp
		if (i % 2 === 0) {
			str += even
		} else {
			str += odd
		}
		str += '\n%%NEXT_QUESTION%%\n'
	}
	str += even + temp + '\n%%END_QUESTIONS%%'
	console.log(str)
	fs.readFile(
		__dirname + '/templates/exam-template.tex',
		'utf8',
		(error, data) => {
			data = data.replace(/%%QUESTIONS%%/, str)
			fs.writeFile(
				__dirname + '/templates/questions-template-temp.tex',
				data,
				error => {
					console.log(error)
				}
			)
		}
	)
})
*/

const exam = new ExamReader(
	'C:/Users/ITC/Downloads/tmp/latextests/questions-template-temp.tex'
)

exam.loadQuestions()
console.log(exam.questions)
