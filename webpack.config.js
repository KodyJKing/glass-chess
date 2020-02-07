
// must add local build path to node paths
module.paths.push("C:\\code\\TS\\xpoint\\build\\node_modules")

const path = require("path") 
const webroot = path.join(process.cwd(), "./lib/www")
const webpack = require("C:\\code\\TS\\xpoint\\build\\node_modules\\webpack")
let config = {
    entry: {"api\\search":"./lib/www/api\\search.js","index":"./lib/www/index.js"},
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
                loader: "C:\\code\\TS\\xpoint\\build\\node_modules\\file-loader"
            },
            {
                test: /.css$/,
                use: ["C:\\code\\TS\\xpoint\\build\\node_modules\\style-loader", "C:\\code\\TS\\xpoint\\build\\node_modules\\css-loader"],
            },
            {
                test: /.(glsl|vert|frag)$/,
                loader: "C:\\code\\TS\\xpoint\\build\\node_modules\\raw-loader",
            },
        ]
    },
    //  ignore the node "crypto" which is required by sjcl
    plugins: [
        new webpack.IgnorePlugin(/^crypto$/)
    ]
}

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        console.log("DEVELOPMENT")
    } else if (argv.mode === "production") {
        console.log("PRODUCTION")
    } else if (argv.mode === "debug") {
        console.log("DEBUG")
        const BundleAnalyzer = require("C:\\code\\TS\\xpoint\\build\\node_modules\\webpack-bundle-analyzer").BundleAnalyzerPlugin
        config.plugins.push(new BundleAnalyzer())
    }

    return config;
};
