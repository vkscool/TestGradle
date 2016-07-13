'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function responsiveDirective($log,$window) {

  return {
    restrict: 'EA',
    scope : {
			run : '=run'
	},
    link: function(scope, element, attribs) {
    	var logger = $log.getInstance('responsive');
    	logger.debug("In responsive directive");
    	
    	var page = attribs["page"];
    	var wrapperh = attribs["wrapperh"];
    	
    	var makeresponsive = function(pp){
    		var winHeight = $(window).height()-50;
    		var winWidth = $(window).height();
    		if(!wrapperh || wrapperh=="false"){
	    		element.height(winHeight);
	    		element.css({
	    			'height':winHeight+'px',
	    			'overflow':'hidden'
	    		});
    		}
    		if(page=="customer"){
    			var a = element.find("#customer-search-area");
    			a.height(winHeight);
    			var b = element.find('#addcustomerbtn');
    			b.width(a.width()-10);
    			var c = element.find('.customer-edit-box');
    			c.height($(window).height());
    		}
    	}
    	
    	setTimeout(function(){
    		makeresponsive(page);
    	},100);
    }
  };
}

directivesModule.directive('responsive', responsiveDirective);