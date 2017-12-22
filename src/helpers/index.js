const fs = require('fs')
module.exports = {
	loadFile: file => {
		return new Promise((resolve, reject) => {
			fs.readFile(file, 'utf8', (error, data) => {
				if (error) {
					reject(error)
				} else {
					resolve(data)
				}
			})
		})
	},
	loadFileSync: file => {
		return fs.readFileSync(file, 'utf8')
	},
	shuffle: array => {
		let temp = []
		let i = array.length,
			j,
			swap,
			correctIndex = 0
		array.forEach(value => temp.push(value))
		while (--i) {
			j = (Math.random() * (i + 1)) | 0
			correctIndex = j === 0 ? i : correctIndex
			swap = temp[i]
			temp[i] = temp[j]
			temp[j] = swap
		}
		return { options: temp, correctAnswer: correctIndex }
	}
}
