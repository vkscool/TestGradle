'use strict';

var servicesModule = require('./../_index.js');

function AuthService ($http, Session, Logger, AppSettings, TokenStorage, UserService,$state,$rootScope,AUTH_EVENTS) {
	  var authService = {};
	  var logger = Logger.getInstance('AuthService');
	  
	  authService.login = function (credentials) {
		  var apiurl = AppSettings.apiUrl;
		  console.log("-------Sending request to "+apiurl+'login');
		  return $http({
			  	method: 'POST',
			  	url: apiurl+'login',
			  	data: $.param(credentials),
			  	headers: {
			  		'Content-Type': 'application/x-www-form-urlencoded'
			  	}}).then(function(result) {
			  		if(result.data.status=="SUCCESS"){
			  			Session.create(result.data.userdata);
			  			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess,{});
			  			$state.go('Home');
			  		}
			  	}, function(error) {
		           console.log(error);
			  	});
		
	  };
	  
	  authService.isAuthenticated = function () {
	    return !!Session.get();
	  };
	  
	  authService.isAuthorized = function (authorizedRoles) {
	    if (!angular.isArray(authorizedRoles)) {
	      authorizedRoles = [authorizedRoles];
	    }
	    return (authService.isAuthenticated() &&
	      authorizedRoles.indexOf(Session.get().roles[0]) !== -1);
	  };
	  
	  authService.needToAuthorize = function(toState){
		  if(toState.url.contains('login/form') && toState.data.authorizedRoles.indexOf('guest')>-1){
			  return false;
		  }
		  return true;
	  };
	  
	  return authService;
}

servicesModule.service('AuthService', AuthService);
