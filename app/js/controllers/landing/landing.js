'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function LandingCtrl($scope,Logger,$rootScope,EVENTS) {
	var logger = Logger.getInstance('LandingCtrl');
	
	logger.debug("In LandingCtrl ");

	
}

controllersModule.controller('LandingCtrl', LandingCtrl);