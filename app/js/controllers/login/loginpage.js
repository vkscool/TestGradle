'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function LoginPageCtrl($scope,$timeout,$window,AppSettings,Logger,$rootScope,AUTH_EVENTS,EVENTS) {
	var logger = Logger.getInstance('LoginPageCtrl');
	
	$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated,{opacity:0});
	
	$scope.$on("$destroy", function() {
		$rootScope.$broadcast(EVENTS.hideloginbox);
    });
}

controllersModule.controller('LoginPageCtrl', LoginPageCtrl);