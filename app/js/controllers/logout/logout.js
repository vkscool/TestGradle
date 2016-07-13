'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function LogoutCtrl($scope,$timeout,$window,AppSettings,Logger,Session,$rootScope,AUTH_EVENTS) {
	var logger = Logger.getInstance('LogoutCtrl');
	
	logger.debug("In Logout ctrl");
	
	Session.destroy();	
	$scope.authenticated = false;
	$rootScope.$on(AUTH_EVENTS.logoutSuccess,{})
	$scope.msg = "Please Wait! Logging You Out.";
	$timeout(function(){
		$window.location.href = AppSettings.domainUrl+'login/form?logout'; 
	},1500);
}

controllersModule.controller('LogoutCtrl', LogoutCtrl);