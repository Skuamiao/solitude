var gulp = require('gulp'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

gulp.task('default', function() {
  console.log('hello gulp');
});
gulp.task("webpack", function() {
  console.log('hello webpack, run webpack');
  return;
  // run webpack
  webpack({
    entry: {
      'some': 'path'
    },
    output: {
      path: 'assets/builds',
      filename: 'bundle-[name].js'
    },
    module: {
      preLoaders: [],
      loaders: [
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract('style', 'css!less')
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
  }, function(err, stats) {
      if(err) throw err;
      console.log('-stats-', stats);
  });
});
