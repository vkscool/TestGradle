'use strict';

var servicesModule = require('./../_index.js');

/**
 * @ngInject
 */
function UserService($q, $http, AppSettings, $templateCache, $resource) {

	return $resource('rest/users/:id');

}

servicesModule.service('UserService', UserService);