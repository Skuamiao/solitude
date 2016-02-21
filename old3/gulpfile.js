var gulp = require('gulp'),
    webpack = require('webpack'),
    wbconfDev = Object.create(require('./webpack.config.js')),
    wbconfBuild = Object.create(require('./webpack.config.js')),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    dev = 'build-dev',
    build = 'build',
    src = [
      'assets/fonts/**/*',
      'assets/images/**/*',
      'assets/scripts/**/*',
      'assets/styles/**/*'
    ];

wbconfDev.plugins = [
  new ExtractTextPlugin('bundle-[name].css')
];

wbconfBuild.devtool = 'source-map';
wbconfBuild.plugins = [
  new ExtractTextPlugin('bundle-[name].css'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

gulp.task('watch-build-dev', [dev], function() {
  gulp.watch(src, [dev]);
});

gulp.task('watch-build', [build], function() {
  gulp.watch(src, [build]);
});

gulp.task(dev, function() {
  webpack(wbconfDev,function(err, stats) {
      if(err) throw err;
      console.log(stats.toString({colors: true}));
  });
});

gulp.task(build, function() {
  webpack(wbconfBuild,function(err, stats) {
      if(err) throw err;
      console.log(stats.toString({colors: true}));
  });
});
