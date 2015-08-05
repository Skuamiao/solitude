var webpack = require('webpack');
module.exports = {
    entry: {
        'sign-up': './assets/scripts/sign-up'
    },
    module: {
        preLoaders: [
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.less$/, loader: 'style!css!less'}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    output: {
        path: 'assets/scripts',
        filename: '[name]-bundle.js'
    }
};
/*
,
mangle: {
    except: ['exports', 'require']
}
'./assets/scripts/dev/react'
*/
