var gulp = require('gulp');
var webpack = require('webpack-stream');
var server = require('./server');

// Webpack
gulp.task('webpack', function() {
  return gulp.src('./app/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./'));
});

// Web Server
gulp.task('serve:web', function() {
	server.start();
});

// Watch
gulp.task('watch', function() {
    gulp.watch('./app/**/*', ['webpack'])
})

gulp.task('default', ['serve:web', 'webpack', 'watch']);

gulp.task('prod', ['serve:web', 'webpack']);