var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        'sign-up': './assets/scripts/sign-up'
    },
    output: {
        // path: __dirname + 'assets',
        path: 'assets',
        filename: 'scripts/[name]-bundle.js'
    },
    module: {
        preLoaders: [
            {
                test:/\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test:/\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles/[name]-bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
/*
preLoaders: [
    {test: /\.css$/, loader: 'style!css'},
    {test: /\.less$/, loader: 'style!css!less'}
]

new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    mangle: {
        except: ['exports', 'require']
    },
    sourceMap: false
})

devTool: 'eval'
*/
