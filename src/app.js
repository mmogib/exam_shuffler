const { loadFile } = require('./helpers/')
loadFile(__dirname + '/configs/settings.json')
	.then(data => {
		const myobj = JSON.parse(data)
		console.log(myobj.gvarUniversity)
	})
	.catch(error => {
		console.log(error)
	})
