'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        disableHostCheck: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        host: 'localhost',
        hot: true,
        inline: true,
        overlay: true,
        port: 8080,
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [{
            test: /\.s[c|a]ss$/,
            use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }, {
            test: /\.svg$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: path.join(__dirname, '/dist'),
                    publicPath: 'http://localhost:8080/',
                },
            }
        }]
    },
    output: {
        filename: 'site.js',
        path: path.join(__dirname, '/dist'),
        publicPath: 'http://localhost:8080/',
    },
    plugins: [ new webpack.HotModuleReplacementPlugin() ]
};
