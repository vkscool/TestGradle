'use strict';

//grab our gulp packages
var gulp  = require('gulp'),
	gutil = require('gulp-util'),
	htmlreplace = require('gulp-html-replace'),
	config = require('../config'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	templateCache = require('gulp-angular-templatecache');

gulp.task('views',function(){
	gulp.src('app/index.html')
		.pipe(htmlreplace({
	        'base': '<base href="/">'
	    }))
	    .pipe(gulp.dest(config.views.indexdest));
	
	gulp.src('app/index.html')
		.pipe(htmlreplace({
	        'base': '<base href="${pageContext.servletContext.getContextPath()}/">'
	    }))
	    .pipe(rename('index2.html'))
	    .pipe(gulp.dest(config.views.indexdest));
	
	// Process any other view files from app/views
	return gulp.src(config.views.src)
	    .pipe(templateCache({
	      standalone: true
	    }))
	    .pipe(gulp.dest(config.views.dest))
	    .pipe(browserSync.stream({ once: true }));
});