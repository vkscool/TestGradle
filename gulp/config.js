'use strict';

module.exports = {

  'browserPort'  : 3000,
  'UIPort'       : 3001,
  'serverPort'   : 3002,

  'styles': {
    'src' : 'app/styles/**/*.scss',
    'dest': 'src/main/webapp/app/css',
    'prodSourcemap': true,
    'sassIncludePaths': []
  },

  'scripts': {
    'src' : 'app/js/**/*.js',
    'dest': 'src/main/webapp/app/js'
  },

  'images': {
    'src' : 'app/images/**/*',
    'dest': 'src/main/webapp/app/images'
  },

  'fonts': {
    'src' : ['app/fonts/**/*'],
    'dest': 'src/main/webapp/app/fonts'
  },

  'views': {
    'watch': [
      'app/index.html',
      'app/views/**/*.html'
    ],
    'src': 'app/views/**/*.html',
    'dest': 'app/js',
    'indexdest':'src/main/webapp/WEB-INF/jsp'
  },

  'gzip': {
    'src': 'src/main/webapp/app/**/*.{html,xml,json,css,js,js.map,css.map}',
    'dest': 'src/main/webapp/app/',
    'options': {}
  },

  'dist': {
    'root'  : 'src/main/webapp',
    'app' : 'src/main/webapp/app'
  },

  'browserify': {
    'entries'   : ['./app/js/main.js'],
    'bundleName': 'main.js',
    'prodSourcemap' : false
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
