'use strict';

// Load settings from the .env file.
require('dotenv').config();

/**
 * External
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');
const pkg = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');

/**
 * Configure the CSS optimisation.
 *
 * @return {Object}
 */
const configureCssOptimisation = () => {
	return {
		cssProcessorOptions: {
			discardComments: true,
			map: {
				inline: false,
				annotation: true,
			},
			safe: true,
		},
	};
};

/**
 * Configure JavaScript optimisation.
 *
 * @return {Object}
 */
const configureJavaScriptOptimisation = () => {
	return {
		cache: true,
		parallel: true,
		sourceMap: true,
	};
};

/**
 * Configure the HTML Webpack Plugin, which generates our Favicons.
 *
 * @return {Object}
 */
const configureHtmlWebpack = () => {
	return {
		templateContent: '',
		filename: 'webapp.html',
		inject: false,
	};
};

/**
 * Configure WebApp plugin, which will work with the Html Webpack Plugin to
 * generate all our Favicons.
 *
 * @return {Object}
 */
const configureWebApp = () => {
	 return {
		 cache: false,
		 favicons: {
			 appName: process.env.APP_NAME,
			 developerName: process.env.DEVELOPER_NAME,
			 developerURL: process.env.DEVELOPER_URL,
		 },
		 inject: 'force',
		 logo: process.env.LOGO_PATH,
	};
};

/**
 * Configure Babel.
 *
 * @return {Object}
 */
const configureBabel = (browserList) => {
	return {
		loader: 'babel-loader',
		options: {
			presets: [[
				'@babel/preset-env', {
					modules: false,
					useBuiltIns: 'entry',
					targets: { browsers: browserList },
				},
			]],
			plugins: [[
				"@babel/plugin-transform-runtime", { "regenerator": true },
			]],
		},
	};
};

/**
 * Configure Webpack Manifest.
 *
 * @return {Object}
 */
const configureManifest = () => {
	return {
		map: (file) => {
			// If the name has the path in already, or it's the webapp.html
			// file, which doesn't need it, we can just return and crack on.
			if (file.name.includes('/') || file.name == 'webapp.html') {
				return file;
			}

			// However, if the file name doesn't match those rules we need to
			// add it in to keep things nice and tidy. Note the special case -
			// if the extension is .map it's the js map file so correct that.
			let extension = file.name.split('.').pop();
			if ('map' === extension) {
				extension = 'js';
			}

			file.name = `${extension}/${file.name}`;
			return file;
		},
	};
};

/**
 * Export the config.
 *
 * @type {Object}
 */
module.exports = {
	devtool: 'source-map',
	entry: { 'site': './src/js/index.js' },
	mode: 'production',
	optimization: {
		minimizer: [
			new OptimizeCSSAssetsPlugin(configureCssOptimisation()),
			new TerserPlugin(configureJavaScriptOptimisation()),
		],
	},
	module: {
		rules: [{
			exclude: /node_modules/,
			test: /\.js$/,
			use: [ configureBabel(pkg.browserList) ],
		}, {
			test: /\.s[c|a]ss$/,
			use: [
				{ loader: MiniCssExtractPlugin.loader },
				'css-loader',
				{ loader: 'postcss-loader' },
				'sass-loader',
			],
		}, {
			test: /\.svg$/,
			use: {
				loader: 'file-loader',
				options: { name: 'svg/[name].[hash:8].svg' },
			},
		}]
	},
	output: {
		filename: 'js/[name].[hash:8].js',
		path: path.join(__dirname, '/dist'),
		publicPath: process.env.PUBLIC_PATH,
	},
	plugins: [
		new CleanWebpackPlugin([ 'dist' ], { exclude: [ '.gitkeep' ] }),
		new HtmlWebpackPlugin(configureHtmlWebpack()),
		new ManifestPlugin(configureManifest()),
		new MiniCssExtractPlugin({ filename: 'css/[name].[hash:8].css' }),
		new WebappWebpackPlugin(configureWebApp()),
	],
};
