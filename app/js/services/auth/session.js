'use strict';

var servicesModule = require('./../_index.js');

/**
 * @ngInject
 */
function Session($log,$sessionStorage) {
      this.storageKey = 'SESSION';
	  this.create = function (userdata) {
	      $sessionStorage.session = userdata;
	  };
	  this.destroy = function () {
		  $sessionStorage.session = undefined;
	  };
	  this.get = function(){
		  return $sessionStorage.session;
	  };
	  return this;
}
servicesModule.service('Session', Session);