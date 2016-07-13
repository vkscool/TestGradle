'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function LoginController($scope,AuthService,Logger) {
	var logger = Logger.getInstance('LoginPageCtrl');
	logger.debug("In LoginCtrl ctrl");

	$scope.credentials = {
	    username: '',
	    password: ''
	};
	
	$scope.login = function (credentials) {
	  logger.debug("login with credentials ",credentials);
	  AuthService.login(credentials);
	};
}

controllersModule.controller('LoginController', LoginController);