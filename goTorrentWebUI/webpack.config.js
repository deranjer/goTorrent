module.exports = {
  entry: './src/app.jsx',
  output: {
    filename: '../public/static/js/bundle.js'
  },
  module: {
    loaders: [
		{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
		},
		{
		test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
		},
		{
		test: /\.(eot|svg|ttf|woff|woff2)$/,
		use: [ 'file-loader' ]
        },
		{
		test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
		query: {
			presets: ['react']
		}
		}
		]
	},	
};