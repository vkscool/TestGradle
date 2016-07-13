'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function dropDownButton($log,$timeout) {

  return {
    restrict: 'EA',
    scope : {
    		field : '=ngModel',
    		data : '=data',
			run : '=run'
	},
    link: function(scope, element, attribs) {
    	var logger = $log.getInstance('dropDownButton');
    	logger.debug("In dropDownButton directive");
    	
    	$(element).addClass('btn-group');
    	var title = attribs['title']?attribs['title']:'';
    	var template ='<button type="button" class="btn btn-default mainbtn">'+title+'</button>'
					 +'<button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">'
					 +'	<span class="caret"></span>'
					 +'	<span class="sr-only">Toggle Dropdown</span>'
					 +'</button>'
					 +'<ul class="dropdown-menu" role="menu"></ul>';
    	$(element).html(template);
    	
    	scope.$watch('data',function(newData){
    		if(newData && newData.length>0){
    			var str = "";
    			angular.forEach(newData,function(d){
    				str+='<li><a href="" rel='+d.id+' >'+d.name+'</a></li>';
    			});
    			$(element).find('ul').html(str);
    		}
    	});
    	
    	$(element).find('ul').on('click','li a',function(e){
    		e.preventDefault();
    		var v = $(this).html();
    		var i = $(this).attr('rel');
    		$(element).find('.mainbtn').html(v);
    		scope.$apply(function(){
    			scope.field = i;
    			if(scope.run){
    				$timeout(function(){
    					scope.run();
    				},200);
    			}
    		});
    	});
    }
  };
}

directivesModule.directive('dropDownButton', dropDownButton);