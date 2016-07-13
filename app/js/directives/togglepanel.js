'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function togglePanel($log,$window) {

  return {
    restrict: 'EA',
    scope : {
    		field : '=ngModel',
    		panelswitch: '=panelSwitch',
			run : '=run'
	},
    link: function(scope, element, attribs) {
    	var logger = $log.getInstance('togglePanel');
    	logger.debug("In togglePanel directive");
    	
    	var toggleButtonClass = '.'+attribs.toggleButtonClass;
    	var toggleDivClass = '.'+attribs.toggleElementClass;
    	
    	var toggleDiv = element.find(toggleDivClass);
    	
    	element.find(toggleButtonClass).append('<span class="toggle-button up pull-right" style="font-size:18px;cursor:pointer"><i class="fa fa-angle-up" aria-hidden="true"></i></span>');
    	
    	element.on('click','.toggle-button',function(e){
    		e.preventDefault();
    		logger.debug("Clicked ");
    		if($(this).hasClass('up')){
    			toggleDiv.slideUp();
    			$(this).removeClass('up').addClass('down').html('<i class="fa fa-angle-down" aria-hidden="true"></i>');
    		}else{
    			toggleDiv.slideDown();
    			$(this).removeClass('down').addClass('up').html('<i class="fa fa-angle-up" aria-hidden="true"></i>');
    		}
    	});
    	
    	var closePanel = function(){
    		logger.debug("Closing the panel");
    		toggleDiv.slideUp();
    		element.find('.toggle-button').removeClass('up').addClass('down').html('<i class="fa fa-angle-down" aria-hidden="true"></i>');
    	};
    	
    	var openPanel = function(){
    		logger.debug("Opening the panel");
    		toggleDiv.slideDown();
    		element.find('.toggle-button').removeClass('down').addClass('up').html('<i class="fa fa-angle-up" aria-hidden="true"></i>');
    	};
    	
    	scope.$watch('panelswitch',function(newVal){
    		if(newVal=="open"){
    			openPanel();
    		}else{
    			closePanel();
    		}
    	});
    	
    	if(attribs.closeOnStart && attribs.closeOnStart==="true"){
    		closePanel();
    	}
    }
  };
}

directivesModule.directive('togglePanel', togglePanel);