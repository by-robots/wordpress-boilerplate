'use strict';

/**
 * External.
 */
const webpack = require('webpack');
const path = require('path');

/**
 * Configure Webpack Dev Server.
 *
 * @return {Object}
 */
const configureDevServer = () => {
	return {
		contentBase: path.join(__dirname, 'dist'),
		host: 'localhost',
		hot: true,
		inline: true,
		overlay: true,
		port: 8080,
	};
};

/**
 * Export the config.
 *
 * @type {Object}
 */
module.exports = {
	devServer: configureDevServer(),
	devtool: 'source-map',
	entry: [ './src/js/index.js' ],
	mode: 'development',
	module: {
		rules: [{
			test: /\.s[c|a]ss$/,
			use: [ 'style-loader', 'css-loader', 'sass-loader' ],
		}, {
			test: /\.svg$/,
			use: {
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: path.join(__dirname, '/dist'),
					publicPath: 'http://localhost:8080/',
				},
			},
		}]
	},
	output: {
		filename: 'site.js',
		path: path.join(__dirname, '/dist'),
		publicPath: 'http://localhost:8080/',
	},
	plugins: [ new webpack.HotModuleReplacementPlugin() ],
};
