'use strict';
 
var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');
var $ = loadPlugins();

gulp.task('styles', function () {
  return gulp.src('./dev/styles/**/*.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('scripts', function () {
  return gulp.src('./dev/scripts/**/*.js')
  .pipe($.babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./public/scripts'));
});
 
gulp.task('serve', ['styles'], function () {
  gulp.watch('./dev/styles/**/*.scss', ['styles']);
});
