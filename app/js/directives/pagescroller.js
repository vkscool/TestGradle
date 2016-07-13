'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */

function pageScroll($timeout,$log){
	var directive = {};
	
	directive.restrict = 'A';
	
	directive.scope = {
			offset : '=offset'
	};
	
	directive.replace = true;
	
	directive.link = function($scope, element, attributes) {
		var logger = $log.getInstance('pageScroll');
    	logger.debug("In pageScroll directive");
    	
    	$scope.$watch('offset',function(newval){
    		logger.debug("Offset value changed ",newval);
    		if(newval){
    			$timeout(function(){
    				$('html,body').animate({
        		        scrollTop: newval
        		    },'slow');
    			},200);
    		}
    	});
    	
	};
	return directive;
};

directivesModule.directive('pageScroll', pageScroll);