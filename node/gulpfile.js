'use strict';
 
var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');
var $ = loadPlugins();

gulp.task('sass', function () {
  return gulp.src('./dev/styles/**/*.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('./public/styles'));
});
 
gulp.task('serve', function () {
  gulp.watch('./dev/styles/**/*.scss', ['sass']);
});
