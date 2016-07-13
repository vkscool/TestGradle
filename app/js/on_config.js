'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, ROLES, blockUIConfig, LoggerProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  
  .state('LoginForm', {
    url: '/login/form?status',
    controller: 'LoginPageCtrl',
    templateUrl: 'login/index.html',
    title: 'Login Page',
    data:{
    	authorizedRoles: [ROLES.guest]
    }
  })
  
  .state('RegisterForm', {
    url: '/register/form?status',
    controller: 'RegisterFormCtrl',
    templateUrl: 'login/index.html',
    title: 'Register Form Page',
    data:{
    	authorizedRoles: [ROLES.guest]
    }
  })
  
  .state('Landing', {
    url: '/',
    controller: 'LandingCtrl',
    templateUrl: 'index.html',
    title: 'Corplinkz Home',
    data: {
	    authorizedRoles: [ROLES.guest]
	}
  })
  
  .state('Watch', {
    url: '/watch',
    controller: 'WatchCtrl',
    templateUrl: 'watch/index.html',
    title: 'Corplinkz Home',
    data: {
	    authorizedRoles: [ROLES.guest]
	}
  })
  
  .state('Logout', {
    url: '/logout',
    //controller: 'LogoutCtrl as logout',
    templateUrl: 'logout/index.html',
    title: 'Logout Page',
    data: {
	    authorizedRoles: [ROLES.guest]
	}
  });

  $urlRouterProvider.otherwise('/');
  blockUIConfig.autoBlock = false;
  //We don't want the Logger service to be enabled in production
  //LoggerProvider.enabled(!isProduction);
  LoggerProvider.enabled(true);
}

module.exports = OnConfig;