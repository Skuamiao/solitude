var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        'sign-up': './assets/scripts/sign-up'
    },
    output: {
        path: 'assets',
        filename: 'scripts/bundle-[name].js'
    },
    module: {
        preLoaders: [
            {
                test:/\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles/bundle-[name].css')/*,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })*/
    ]
};
/*
output: {
    // path: __dirname + 'assets',
    path: 'assets',
    filename: 'scripts/bundle-[name].js'
}

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

/*
preLoaders: [
    {
        test:/\.less$/,
        loader: ExtractTextPlugin.extract('css', 'less')
    }
],
loaders: [
    {
        test:/\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
    }
]
*/
