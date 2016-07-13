'use strict';

var controllersModule = require('./_index');

function ApplicationController($scope,ROLES,AuthService,Logger,Session,AUTH_EVENTS,$location,toaster){
	var logger = Logger.getInstance('ApplicationController');
	$scope.currentUser = {isLogedIn:false};
	$scope.userRoles = ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
	$scope.isAuthenticated = AuthService.isAuthenticated;
	logger.debug("Is user authorized "+$scope.isAuthorized());
	$scope.setCurrentUser = function () {
	  $scope.currentUser = Session.get();
	  $scope.currentUser.isLogedIn = true;
	};
	$scope.destroyCurrentUser = function () {
	  Session.destroy();
	  $scope.currentUser = {isLogedIn:false};
	};
	if($scope.isAuthenticated()){
		$scope.setCurrentUser();
	}
	
	$scope.$on(AUTH_EVENTS.loginSuccess,$scope.setCurrentUser);
	$scope.$on(AUTH_EVENTS.logoutSuccess,$scope.destroyCurrentUser);
	
	$scope.isActive = function (viewLocation) { 
		  //logger.debug(viewLocation , $location.path());
	      return $location.path().match('.*'+viewLocation+'.*');
	};
}

controllersModule.controller('ApplicationController', ApplicationController);