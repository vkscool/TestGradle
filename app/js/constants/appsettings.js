'use strict';

var constantsModule = require('./_index');

var AppSettings = {
  appTitle: 'CorpLinkz',
  domainUrl: 'http://localhost:9001/',
  apiUrl: 'http://localhost:9001/rest/',
  //apiUrl: 'rest/',
  pathConfig:{
			viewDir : ''
  },
  templateMap : {
	        header: 'headers/header.html',
	        loginpopup:'login/loginpopup.html',
	        mask:'mask.html',
	        registerpopup:'login/registerpopup.html',
	        sidebar:'sidebars/index.html'
   }
};

constantsModule.constant('AppSettings', AppSettings);