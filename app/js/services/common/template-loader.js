'use strict';

var servicesModule = require('./../_index.js');

/**
 * @ngInject
 */
function templateLoader($http, AppSettings, $templateCache, Logger, Utils) {

  var service = {};

  service.get = function(contentType) {
	  var logger = Logger.getInstance('templateLoader');
  	  logger.debug("In templateLoader directive loading {0}",[contentType]);
	  var templateLoader;
      var baseUrl = AppSettings.pathConfig.viewDir;
      var temp = AppSettings.templateMap[contentType];
      if(temp){
    	  var templateUrl = baseUrl + AppSettings.templateMap[contentType];
    	  templateLoader = $http.get(templateUrl, {cache: $templateCache});
      }else{
    	  logger.debug("Error Loading Template");
    	  templateLoader = Utils.serveErrorPromise({});
      }
      return templateLoader;
  };

  return service;
}

servicesModule.service('templateLoader', templateLoader);