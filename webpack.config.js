const path = require('path')
const webpack = require("webpack")
const webroot = path.join(__dirname, 'www')
const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const config = {
    entry: './lib/main.js',
    output: {
        path: webroot,
        filename: 'index.js'
    },
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: webroot
    },
}

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        console.log("DEVELOPMENT")
    } else if (argv.mode === 'production') {
        console.log("PRODUCTION")
    } else {
        console.log("DEBUG")
        config.plugins.push(new BundleAnalyzer())
    }

    return config;
};