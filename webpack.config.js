const path = require('path')
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = [
	{
		target: 'electron-renderer',
		entry: './src/windows/renderers/index',
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'src/windows/build/')
		},
		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: ['style-loader', 'css-loader']
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				}
			]
		}
		//plugins: [new UglifyJSPlugin()]
	},
	{
		target: 'electron-renderer',
		entry: './src/windows/renderers/groups',
		output: {
			filename: 'groups.js',
			path: path.resolve(__dirname, 'src/windows/build/')
		},
		module: {
			loaders: [
				{
					test: /\.css$/,
					loader: ['style-loader', 'css-loader']
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				}
			]
		}
		//plugins: [new UglifyJSPlugin()]
	}
]
