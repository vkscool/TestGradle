'use strict';

var constantsModule = require('./_index');

var ErrorCodes = {
	InvalidInput:'InvalidInput',
	AlreadyExist:'AlreadyExist'
};

constantsModule.constant('ErrorCodes', ErrorCodes);