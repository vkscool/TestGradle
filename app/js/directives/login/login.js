'use strict';

var directivesModule = require('../_index.js');

/**
 * @ngInject
 */
function loginDirective(templateLoader,EVENTS,$compile,Logger,$rootScope,AUTH_EVENTS,$location) {

  return {
    restrict: 'EA',
    link: function(scope, element) {
    	//console.log($log);
    	var logger = Logger.getInstance('loginDir');
    	
    	scope.visible = false;
    	scope.param = {};
    	scope.param.error = false;
    	scope.param.logout = false;
    	
    	var positionIt = function(){
    		var left = ($(window).width()/2) - (350/2);
    		logger.debug($(window).width()/2," - ",350/2," = ",left);
    		element.css({
    			'left':left+'px'
    		});
    	}
    	
    	var showDialog = function (event,arg) {
    		var op = {opacity:0.9};
    		angular.extend(op,arg);
    		logger.debug("after extend ",op,arg);
    		$rootScope.$broadcast(EVENTS.maskon,op);
    		scope.visible = true;
    		positionIt();
    		var dd = $location.search();
    		if(dd.logout){
    			scope.param.logout = true;
    		}
    		if(dd.error){
    			scope.param.error = true;
    		}
    	};
    	
    	var hideDialog = function () {
    		$rootScope.$broadcast(EVENTS.maskoff,{});
    		scope.visible = false;
    	};
    	
    	var showMessage = function () {
    		scope.param.error = true;
    	};
    	
    	var prepare = function(){
    		logger.debug('preparing the login popup');
    		element.css({
    			'position':'absolute',
    			'z-index':'9999'
    		});
    		element.find("#submit1").hover(function() {
				$(this).animate({"opacity": "0"}, "slow");
			},function() {
				$(this).animate({"opacity": "1"}, "slow");
			});
        	scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
        	scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
        	scope.$on(AUTH_EVENTS.authenticated, hideDialog);
        	scope.$on(AUTH_EVENTS.loginFailed, showMessage);
        	scope.$on(AUTH_EVENTS.loginSuccess, hideDialog);
        	scope.$on(EVENTS.hideloginbox, hideDialog);
        };
        
        $(window).bind('resize', function() {
        	if(scope.visible)
        		positionIt();
    	});
    	
    	var loader = templateLoader.get('loginpopup');
        var promise = loader.success(function(html) {
        	html = $compile(html)(scope)
            element.html(html);
        	prepare();
        }).error(function (response) {
            element.replaceWith($compile(element.html())(scope));
            logger.debug('cannot load loginpopup view file');
        });
    }
  };
}

directivesModule.directive('loginDir', loginDirective);