var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {

        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'

        }],
           
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    },
    // devServer: {
    // 	proxy: {
    // 		'/url/*': 'http://127.0.0.192:4000/'
    // 	}
    // },
    devServer: {
        address: '127.0.0.192',
        port: 4000
    }
};
