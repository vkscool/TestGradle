'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function RegisterFormCtrl($scope,Logger,$rootScope) {
	
	var logger = Logger.getInstance('RegisterPageCtrl');
	
	logger.debug("In Register Page Controller");
	
	$rootScope.$broadcast('loadpopup',{temp:'registerpopup',dontshowclosebtn:true,compile:true,opacity:0});
	
	$scope.$on("$destroy", function() {
		$rootScope.$broadcast('closepopup');
    });
}

controllersModule.controller('RegisterFormCtrl', RegisterFormCtrl);