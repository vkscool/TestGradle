'use strict';

var servicesModule = require('./../_index.js');

/**
 * @ngInject
 */
function generalService($q, $http, AppSettings, Logger, Utils, promiseFactory) {

  var service = {};
  var logger = Logger.getInstance('generalService');
  
  service.getApplicationParam = function(identifier){
	  logger.debug("Here to find Application Param by ",identifier);
	  var baseUrl = AppSettings.apiUrl+'applicationparam/'+identifier;
	  return $http.get(baseUrl);
  }

  return service;
}

servicesModule.service('generalService', generalService);