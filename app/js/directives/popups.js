'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function popupDirective(templateLoader,EVENTS,$compile,Logger,$rootScope) {

  return {
    restrict: 'EA',
    /*template:'<div class="mypopups"></div>',
    replace:true,*/
    link: function(scope, element) {
    	var logger = Logger.getInstance('popupDirective');
    	logger.debug("In popupDirective directive");
    	
    	scope.$on('loadpopup',function(e,data){
    		var op = {opacity:0.8};
    		angular.extend(op,data);
    		logger.debug("Loading temp {0}",[op.temp]);
    		var loader = templateLoader.get(op.temp);
	        loader.success(function(html) {
	        	if(op.compile)
	        		html = $compile(html)(scope);
	            element.html(html);
	            init(op);
	        }).error(function (response) {
	        	logger.debug("Error Loading Popup {0}",[response]);
	        });
    	});
    	
    	scope.$on('closepopup',function(e,data){
    		element.off();
			element.fadeOut('fast');
			scope.$broadcast(EVENTS.maskoff);
			element.html();
    	});
    	
    	var init = function(data){
    		var a = document.createElement('a');
    		var i = document.createElement('i');
    		i.setAttribute('class','fa fa-times');
    		a.appendChild(i);
    		a.setAttribute('class','closepopup');
    		a.setAttribute('style','position:absolute;top:2px;right:7px;cursor:pointer;');
    		var w = parseInt(element.width())<=0?320:element.width();
    		var h = element.outerHeight();
    		if(h<50){
    			h = 500;
    		}
    		logger.debug('width {0} height {1}',[w,h]);
    		element.css({
    			'overflow':'hidden',
    			'position':'absolute',
    			'display':'hidden',
    			'left':($(window).width()/2 - w/2)+'px',
    			'top':($(window).height()/2 - h/2 - 50)+'px',
    			'z-index':'1032',
    			'border-radius':'4px',
    			'-webkit-box-shadow': '0px 0px 1px 1px rgba(0,0,0,0.75)',
    		    '-moz-box-shadow': '0px 0px 1px 1px rgba(0,0,0,0.75)',
    		    'box-shadow': '0px 0px 1px 1px rgba(0,0,0,0.75)'
    		});
    		if(!data.dontshowclosebtn){
	    		element.append(a);
	    		element.on('click','.closepopup',function(){
	    			element.off();
	    			element.fadeOut('fast');
	    			scope.$broadcast(EVENTS.maskoff);
	    			element.html();
	    		});
    		}
    		scope.$broadcast(EVENTS.maskon,{opacity:data.opacity});
    		element.fadeIn('fast');
    	};
    }
  };
}
directivesModule.directive('popup', popupDirective);