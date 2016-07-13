'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, AppSettings, Logger,EVENTS,AuthService,AUTH_EVENTS,Utils,$timeout,$location) {
  var logger = Logger.getInstance('OnRun');
  logger.debug("--------------------Application OnRun----------------------");
  
  //change the apiUrl in production system
  var p = $location.port();
  console.log("Current port is ",p);
  if(p){
	  if(p!="3000"){
		  AppSettings.apiUrl = "rest/";
	  }
  }
  
  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    $rootScope.pageTitle = '';

    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' - ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
    
    var authorizedRoles = toState.data.authorizedRoles;
    logger.debug("Authorized role is "+authorizedRoles);
    /*if (AuthService.needToAuthorize(toState) && !AuthService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      logger.debug("user is not authorized");
      if (AuthService.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }*/
    
  });
  
  $timeout(function(){
	  Utils.init();
  },500);
}

module.exports = OnRun;