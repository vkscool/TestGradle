'use strict';

var constantsModule = require('./_index');

var Roles = {
	  all: '*',
	  admin: 'admin',
	  user: 'user',
	  guest: 'guest'
};

constantsModule.constant('ROLES', Roles);