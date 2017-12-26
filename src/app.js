const { loadFile, saveJson } = require('./helpers/')
const filename = __dirname + '/configs/settings.json'
loadFile(filename)
	.then(data => {
		const myobj = JSON.parse(data)
		myobj.gvarUniversity = 'King Fahd University of Petroleum and Minerals'
		saveJson(filename, myobj)
		console.log(myobj.gvarUniversity)
	})
	.catch(error => {
		console.log(error)
	})
