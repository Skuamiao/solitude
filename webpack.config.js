var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'sign-up': './assets/scripts/sign-up.1'
  },
  output: {
    path: 'assets/builds/',
    filename: 'bundle-[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(?:eot|svg|ttf|woff|woff2|png|gif|jpg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', ['css', 'less'])
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle-[name].css')/*,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })*/
  ]
}
