'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function maskWord(templateLoader,EVENTS,$compile,$log,$timeout) {

  return {
    restrict: 'A',
    link: function(scope, element) {
    	var logger = $log.getInstance('maskDir');
    	//logger.debug("In maskDir directive");
    	$timeout(function(){
    		var oldHeight = element.outerHeight();
        	//logger.debug(oldHeight);
        	if(parseInt(oldHeight)>22){
	        	element.height(20).css({
	        		'overflow':'hidden',
	        		'position':'relative',
	        		'transition': 'height 1s'
	        	})
	        	.append('<span class="showmore" title="Show More Items" style="cursor:pointer;background-color: rgba(0, 0, 0, 0.7);position:absolute;top:0px;right:0px;color: white;padding: 1px 2px;" ><i class="fa fa-arrow-circle-down"></i></span>');
	        	
	        	element.on('click','span.showmore',function(e){
	        		e.stopPropagation();
	        		e.preventDefault();
	        		element.css({'height':oldHeight+'px'}).find('span.showmore').css('position','relative').removeClass('showmore').addClass('hidemore').find('i')[0].setAttribute('class','fa fa-arrow-circle-up');
	        	});
	        	element.on('click','span.hidemore',function(e){
	        		e.stopPropagation();
	        		e.preventDefault();
	        		element.css('height','20px').find('span.hidemore').css('position','absolute').addClass('showmore').removeClass('hidemore').find('i')[0].setAttribute('class','fa fa-arrow-circle-down');
	        	});
        	}
    	},500);
    }
  };
}

directivesModule.directive('maskWord', maskWord);