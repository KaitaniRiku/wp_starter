'use strict';


var gulp            = require('gulp');
var plumber         = require('gulp-plumber');
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var browserSync     = require('browser-sync'); 
var cssnano         = require('gulp-cssnano');
var rename          = require('gulp-rename');


gulp.task('sass', function() {
    gulp.src('assets/sass/app.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass({
                errLogToConsole: false,
                //outputStyle: 'compressed',
                outputStyle: 'compact',
                // outputStyle: 'expanded',
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(rename("app.min.css"))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});