'use strict';

var gulp = require('gulp');
// var browserSync = require('browser-sync');
// var reload = browserSync.reload;

gulp.task('serve', ['sass', 'js'], function() {
	
	// browserSync({
	// 	notify: false,
	// 	server: {baseDir: './'}
	// });

	gulp.watch('assets/sass/**/*.scss', ['sass']);
	gulp.watch('assets/js/**/*.js', ['js']);

	// gulp.watch(['*.html', 'build/*.css', 'build/*.js'], {cwd: ''}, reload);
	
});