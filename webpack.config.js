
// must add local build path to node paths
module.paths.push("/home/kody/code/glass/build/node_modules")
const path = require("path") 
const webroot = path.join(process.cwd(), "./lib/www")
const webpack = require("webpack")
let config = {
    entry: {"index":"./lib/www/index.js"},
    output: {
        path: webroot,
        filename: "[name].pack.js",
        publicPath: ""
    },
    devtool: "cheap-source-map",
    devServer: {
        contentBase: webroot,
        hot: true,
        host: "0.0.0.0",
        port: 8080,
        proxy: [{
            path: "/api/**",
            target: "http://localhost:3000",
            secure: false
        }]
    },
    module: {
        rules: [
            {
                test: /.svg$/,
                loader: 'file-loader'
            }
        ]
    },
    //  ignore the node "crypto" which is required by sjcl
    plugins: [
        new webpack.IgnorePlugin(/^crypto$/),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = (env, argv) => {

    if (argv.mode === "development") {
        console.log("DEVELOPMENT")
    } else if (argv.mode === "production") {
        console.log("PRODUCTION")
    } else {
        console.log("DEBUG")
        const BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
        config.plugins.push(new BundleAnalyzer())
    }

    return config;
};
