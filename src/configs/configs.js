const { loadFileSync } = require('../helpers/')
const filename = __dirname + '/configs.json'

const data = loadFileSync(filename)
module.exports = JSON.parse(data)

/*
{
	"varTerm": "152",
	"varCourseCode": "MATH 101",
	"varExamTitle": "EXAM I",
	"varDate": "Monday 25/12/2017",
	"varNumOfQuestions": 20,
	"varNumOfVersions": 4,
	"varNumAnswers": 5,
	"varTimeAllowed": "120 minutes"
}
*/
