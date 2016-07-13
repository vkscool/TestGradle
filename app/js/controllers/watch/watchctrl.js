'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function WatchCtrl($scope,Logger) {
	var logger = Logger.getInstance('WatchCtrl');
	
	logger.debug("In WatchCtrl ctrl");

	

}

controllersModule.controller('WatchCtrl', WatchCtrl);