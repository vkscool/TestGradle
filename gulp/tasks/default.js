'use strict';

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence');
    

// create a default task and just log a message
gulp.task('default', function(cb) {
	cb = cb || function() {};

	global.isProd = false;

	runSequence(['styles', 'images', 'fonts', 'views', 'browserify'], 'watch', cb);
	return gutil.log('Gulp is running!')
});