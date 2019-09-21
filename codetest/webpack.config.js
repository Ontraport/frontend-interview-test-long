const path = require('path');

module.exports = {
	entry: './src/index.js',
	mode : 'development',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']			
			},			
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			}, 
			{
			   type: 'javascript/auto',
			   test: /\.json$/,
			   use: [ 'file-loader' ],
			   include: /\.\/config/ 
			}
		]
	},
	plugins: [
 
    ],
	devtool: 'source-map'
};