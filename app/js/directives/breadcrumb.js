'use strict';

var directivesModule = require('./_index.js');

function BreadCrumb(Logger,Utils,$location){
	var directive = {};
	
	directive.restrict = 'A';
	
	directive.link = function($scope, element, attributes) {
		var logger = Logger.getInstance('BreadCrumb');
    	logger.debug("In BreadCrumb directive");
    	var getstr = function(path){
			var str1 = '';
			var p = path.split('/');
			for(var i=2;i<p.length;i++){
				var s = p[i];
				logger.debug(s);
				if(s!==''){
					if(i==p.length){
						str1 +='<li class="brli active">'+p[i]+'</li> ';
					}else{
						//str1 +='<li class="brli"><a href="'+p[i]+'" >'+p[i]+'</a></li> ';
						str1 +='<li class="brli active">'+p[i]+'</li> ';
					}
				}
			}
			return str1;
		};
		var str = getstr($location.path());
		/*$scope.$on('$locationChangeSuccess',function(next, current){
			var path = getstr($location.path());
			logger.debug("Location Changed ",path);
			str = getstr(path);
			element.find('.brli').remove();
			logger.debug(str);
			logger.debug('',$('li.homeli',element));
			$(str).insertAfter($('li.homeli',element));
		});*/
		element.find('.brli').remove();
		logger.debug(str);
		$('li.homeli',element).after(str);
	};

    return directive;
}

directivesModule.directive('breadCrumb', BreadCrumb);