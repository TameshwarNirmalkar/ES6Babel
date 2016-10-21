var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    // resolveLoader: {
    //     root: path.join(__dirname, 'node_modules')
    // },
    module: {
        /**
         * [preLoaders description]: it run jshinter for code formating and error checking.
         * @type {Array of Objects}
         */
        preLoaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'
        }],
        /**
         * [loaders description]: it runs after jsnihter test passes the code and compile the jsx.
         * @type {Array}
         */
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
        extensions: ['', '.js', '.es6', 'jsx']
    },

    devServer: {
        address: '127.0.0.192',
        port: 4000
    }
};
