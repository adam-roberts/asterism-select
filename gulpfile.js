var gulp     = require('gulp');
var sass     = require('gulp-ruby-sass');
var prefixer = require('gulp-autoprefixer');
var jshint   = require('gulp-jshint');
var uglify   = require('gulp-uglify');
var rename   = require('gulp-rename');

// Style Tasks

gulp.task('style', function() {

	return sass('./select.scss', { style: 'compressed' })
		.pipe(prefixer({
			browsers: ['last 20 versions']
		}))
		.pipe(rename('select.min.css'))
		.pipe(gulp.dest('./dist'));

});

// Javascript Tasks

gulp.task('lint', function() {

	return gulp.src('./select.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));

});

gulp.task('brains', ['lint'], function() {

	return gulp.src('./select.js')
		.pipe(uglify())
		.pipe(rename('select.min.js'))
		.pipe(gulp.dest('./dist'));

});

// Because we're lazy

gulp.task('default', function() {

	gulp.watch('./select.scss', ['style']);
	gulp.watch('./select.js', ['brains']);

});