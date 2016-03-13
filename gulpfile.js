var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    angular_path = './assets/scripts/angular',
    angular_src = [
      angular_path + '/angular-1.5.0.min.js',
      angular_path + '/angular-aria-1.5.0.min.js',
      angular_path + '/angular-animate-1.5.0.min.js',
      angular_path + '/angular-messages-1.5.0.min.js',
      angular_path + '/angular-material-1.0.6.min.js'
    ],
    version = 1;

// gulp.task('watch-dev', [dev], function() {
//   gulp.watch(src, [dev]);
// });

// gulp.task('build', [build], function() {
//   gulp.watch(src, [build]);
// });

gulp.task('angular-with-material', function() {
  return gulp.src(angular_src)
              .pipe(concat('temp.js'))
              .pipe(rename({
                basename: 'angular-with-material',
                suffix: '-' + version
              }))
              .pipe(gulp.dest('builds/' + version));
});

// gulp.task(build, function() {
//   webpack(wbconfBuild,function(err, stats) {
//       if(err) throw err;
//       console.log(stats.toString({colors: true}));
//   });
// });
