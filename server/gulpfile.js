var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver');

gulp.task('js', function() {
  gulp.src('../codetest/js/**/*')
});

gulp.task('html', function() {
  gulp.src('../codetest/*.html')
});

gulp.task('css', function() {
  gulp.src('../codetest/css/*.css')
});

gulp.task('watch', function() {
  gulp.watch('../codetest/js/**/*', ['js']);
  gulp.watch('../codetest/css/*.css', ['css']);
  gulp.watch(['../codetest/*.html',
    '../codetest/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('../codetest/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
