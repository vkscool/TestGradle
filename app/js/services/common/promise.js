'use strict';

var servicesModule = require('./../_index.js');

/**
 * @ngInject
 */
function promiseFactory($q) {

	return {
	    decorate: function(promise) {
	      promise.success = function(callback) {
	        promise.then(callback);

	        return promise;
	      };

	      promise.error = function(callback) {
	        promise.then(null, callback);

	        return promise;
	      };
	    },
	    defer: function() {
	      var deferred = $q.defer();

	      this.decorate(deferred.promise);

	      return deferred;
	    }
	};
}

servicesModule.service('promiseFactory', promiseFactory);