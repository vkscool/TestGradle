'use strict';

var jQuery = require('jquery');
window.jQuery = jQuery;
var $ = jQuery;
window.$ = jQuery;

require('./custom_lib/scrollbar/jquery.slimscroll.js');

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('angular-resource');
require('angular-animate');
require('angularjs-toaster');
require('angular-touch');
//require('angular-ui-grid');
require('ngstorage');
require('angular-block-ui');
require('./templates');
require('./modules/AuthModule');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');
require('./constants/_index');
require('./custom_lib/logger/angular-ny-logger.js');

require('bootstrap');

require('./custom_lib/tooltipster/jquery.tooltipster.js');
require('./custom_lib/datatable/jquery.datatables.min.js');
require('./custom_lib/datatable/bootstrap-adapter/js/datatables.js');
require('./custom_lib/datetimepicker/daterangepicker.js');

//Create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'ui.router',
    'ngResource',
    'ngStorage',
    'ngTouch', 
    'ngAnimate',
    'blockUI',
    'toaster',
    'ny.logger',
    'templates',
    'http-auth-interceptor',
    'app.controllers',
    'app.services',
    'app.directives',
    'app.constants'
  ];

  //mount on window for testing
  //window.app = angular.module('app', requires);
  
  angular.module('app', requires);

  angular.module('app').config(require('./on_config'));

  angular.module('app').run(require('./on_run'));

  angular.bootstrap(document, ['app']);

});