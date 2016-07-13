'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function maskDirective(templateLoader,EVENTS,$compile,Logger) {

  return {
    restrict: 'EA',
    link: function(scope, element) {
    	var logger = Logger.getInstance('maskDir');
    	logger.debug("In maskDir directive");
    	element.css({
    		'display':'none',
	        'position':'fixed',
	        'width':'100%',
	        'height':'100%',
	        'top':'0px',
	        'background-color':'rgba(0,0,0,1)',
	        'z-index':'1030'
    	});
    	var prepare = function(){
        	var showMask = function (event,args) {
        		logger.debug("maskon event occured ",args);
        		event.preventDefault();
        		if(args.opacity!=undefined){
        			logger.debug('setting mask opacity');
        			element.css({'display':'block','background-color':'rgba(0,0,0,'+args.opacity+')'});
        		}else{
        			logger.debug('just displaying mask with old opacity');
        			element.css('display','block');
        		}
        	};
        	var hideMask = function (event) {
        		logger.debug("maskoff event occured");
        		event.preventDefault();
        		element.css('display','none');
        	};
        	scope.$on(EVENTS.maskon, showMask);
        	scope.$on(EVENTS.maskoff, hideMask);
        	/*hideMask({stopPropagation:function(){
        		logger.debug("stoping Event propogation");
        	}});*/
        };
        prepare();
    }
  };
}

directivesModule.directive('mask', maskDirective);