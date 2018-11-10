const path = require("path")
const webpack = require("webpack")
const webroot = path.join(__dirname, "www")
const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const config = {
    entry: "./lib/app/main.js",
    output: {
        path: webroot,
        filename: "[name].js"
    },
    devtool: "cheap-source-map",
    devServer: {
        contentBase: webroot,

        host: "0.0.0.0",
        port: 8080,
        proxy: [{
            path: "/api/*",
            target: "http://localhost:3000",
            secure: false
        }]

    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'file-loader'
            }
        ]
    },
    //  ignore the node "crypto" which is required by sjcl
    plugins: [
        new webpack.IgnorePlugin(/^crypto$/),
    ]
}

module.exports = (env, argv) => {

    if (argv.mode === "development") {
        console.log("DEVELOPMENT")
    } else if (argv.mode === "production") {
        console.log("PRODUCTION")
    } else {
        console.log("DEBUG")
        config.plugins.push(new BundleAnalyzer())
    }

    return config;
};