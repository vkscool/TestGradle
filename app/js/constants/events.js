'use strict';

var constantsModule = require('./_index');

var Events = {
  maskon:'maskon',
  maskoff:'maskoff',
  orderloaded:'orderloaded',
  hideloginbox:'hideloginbox'
};

constantsModule.constant('EVENTS', Events);