'use strict';

var angular = require('angular');
angular.module('http-auth-interceptor', ['http-auth-interceptor-buffer'])
  .constant('AUTH_EVENTS',{
	  loginSuccess: 'auth-login-success',
	  loginFailed: 'auth-login-failed',
	  logoutSuccess: 'auth-logout-success',
	  sessionTimeout: 'auth-session-timeout',
	  notAuthenticated: 'auth-not-authenticated',
	  notAuthorized: 'auth-not-authorized',
	  authenticated:'auth-authenticated',
	  authorized:'auth-authorized',
	  badRequest:'bad-request'
  })
  .factory('TokenStorage', function() {
	console.log("token storage factory");
	var storageKey = 'auth_token';
	return {		
		store : function(token) {
			console.log("storing token "+token);
			return localStorage.setItem(storageKey, token);
		},
		retrieve : function() {
			var token = localStorage.getItem(storageKey);
			console.log("reteriving the token "+token);
			return token;
		},
		clear : function() {
			return localStorage.removeItem(storageKey);
		}
	};
  })
  .factory('authService', ['$rootScope','httpBuffer', function($rootScope, httpBuffer) {
    return {
      /**
       * Call this function to indicate that authentication was successfull and trigger a
       * retry of all deferred requests.
       * @param data an optional argument to pass on to $broadcast which may be useful for
       * example if you need to pass through details of the user that was logged in
       */
      loginConfirmed: function(data, configUpdater) {
        var updater = configUpdater || function(config) {return config;};
        $rootScope.$broadcast('event:auth-loginConfirmed', data);
        httpBuffer.retryAll(updater);
      },

      /**
       * Call this function to indicate that authentication should not proceed.
       * All deferred requests will be abandoned or rejected (if reason is provided).
       * @param data an optional argument to pass on to $broadcast.
       * @param reason if provided, the requests are rejected; abandoned otherwise.
       */
      loginCancelled: function(data, reason) {
        httpBuffer.rejectAll(reason);
        $rootScope.$broadcast('event:auth-loginCancelled', data);
      },
      
      logoutConfirmed: function(data, reason) {
          httpBuffer.rejectAll(reason);
          $rootScope.$broadcast('event:auth-logoutConfirmed', data);
      }
    };
  }])

  /**
   * $http interceptor.
   * On 401 response (without 'ignoreAuthModule' option) stores the request
   * and broadcasts 'event:angular-auth-loginRequired'.
   */
  .config(['$httpProvider', function($httpProvider) {
	  $httpProvider.defaults.useXDomain = true;
      // delete $httpProvider.defaults.headers.common['X-Requested-With'];
	  $httpProvider.interceptors.push(['$rootScope', '$q', 'httpBuffer','TokenStorage','AUTH_EVENTS', function($rootScope, $q, httpBuffer, TokenStorage, AUTH_EVENTS) {
    	console.log("------------------------------------In Interceptor--------------------------------------------------");
    	return {
		request: function (config) {
		      // use this to destroying other existing headers
		      //config.headers = {'X-Requested-With':'XMLHttpRequest'}
			  //config.headers = {'random-request':'random-value'};

		      // use this to prevent destroying other existing headers
			  /*var authToken = TokenStorage.retrieve();
			  if (authToken) {
					config.headers['X-AUTH-TOKEN'] = authToken;
			  }*/
		      //config.headers['X-Requested-With'] = 'XMLHttpRequest';
		      return config;
		},
        /*response: function(config){
        	console.log("Response Interceptor");
			console.log("going to store token");
      	  	TokenStorage.store(config.headers('X-AUTH-TOKEN'));
      	    return config;
		},*/
        responseError: function(rejection) {
        	  var deferred = $q.defer();
	          if (rejection.status === 401 && !rejection.config.ignoreAuthModule) {
		            httpBuffer.append(rejection.config, deferred);
		            TokenStorage.clear();
		            console.log("Interceptor says : UnauthorizedRequest");
		            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, rejection);
		            return deferred.promise;
	          }else if (rejection.status === 439 && !rejection.config.ignoreAuthModule) {
		            httpBuffer.append(rejection.config, deferred);
		            TokenStorage.clear();
		            console.log("Interceptor says : auth-login-failed");
		            $rootScope.$broadcast(AUTH_EVENTS.loginFailed, rejection);
		            return deferred.promise;
		      }else if (rejection.status === 403 && !rejection.config.ignoreAuthModule) {
		            httpBuffer.append(rejection.config, deferred);
		            TokenStorage.clear();
		            console.log("Interceptor says : UnauthorizedRequest");
		            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, rejection);
		            return deferred.promise;
	          }else if(rejection.status === 419&& !rejection.config.ignoreAuthModule){
		        	httpBuffer.append(rejection.config, deferred);
		        	TokenStorage.clear();
		        	console.log("Interceptor says : Session Expired");
		        	$rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, rejection); 
		        	return deferred.promise;
	          }else if(rejection.status === 440 && !rejection.config.ignoreAuthModule){
		        	httpBuffer.append(rejection.config, deferred);
		        	TokenStorage.clear();
		        	console.log("Interceptor says : Session Expired");
		        	$rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, rejection); 
		        	return deferred.promise;
	          }/*else if(rejection.status === 400 && !rejection.config.ignoreAuthModule){
		        	httpBuffer.append(rejection.config, deferred);
		        	TokenStorage.clear();
		        	console.log("Interceptor says : BadRequest");
		        	$rootScope.$broadcast(AUTH_EVENTS.badRequest, rejection); 
		        	return deferred.promise;
	          }*/
          // otherwise, default behaviour
          return $q.reject(rejection);
        }
      };
    }]);
  }]);

  /**
   * Private module, a utility, required internally by 'http-auth-interceptor'.
   */
  angular.module('http-auth-interceptor-buffer', [])

  .factory('httpBuffer', ['$injector', function($injector) {
    /** Holds all the requests, so they can be re-requested in future. */
    var buffer = [];

    /** Service initialized later because of circular dependency problem. */
    var $http;

    function retryHttpRequest(config, deferred) {
      function successCallback(response) {
        deferred.resolve(response);
      }
      function errorCallback(response) {
        deferred.reject(response);
      }
      $http = $http || $injector.get('$http');
      $http(config).then(successCallback, errorCallback);
    }

    return {
      /**
       * Appends HTTP request configuration object with deferred response attached to buffer.
       */
      append: function(config, deferred) {
        buffer.push({
          config: config,
          deferred: deferred
        });
      },

      /**
       * Abandon or reject (if reason provided) all the buffered requests.
       */
      rejectAll: function(reason) {
        if (reason) {
          for (var i = 0; i < buffer.length; ++i) {
            buffer[i].deferred.reject(reason);
          }
        }
        buffer = [];
      },

      /**
       * Retries all the buffered requests clears the buffer.
       */
      retryAll: function(updater) {
        for (var i = 0; i < buffer.length; ++i) {
          retryHttpRequest(updater(buffer[i].config), buffer[i].deferred);
        }
        buffer = [];
      }
    };
  }]);