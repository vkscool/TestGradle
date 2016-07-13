'use strict';

var directivesModule = require('../_index.js');

/**
 * @ngInject
 */
function sidebarDirective(templateLoader,$compile,Logger) {

  return {
    restrict: 'EA',
    link: function(scope, element) {
    	//console.log($log);
    	var logger = Logger.getInstance('sidebarDirective');
        	
    	var loader = templateLoader.get('sidebar');
        var promise = loader.success(function(html) {
        	html = $compile(html)(scope)
            element.html(html);
        }).error(function (response) {
            element.replaceWith($compile(element.html())(scope));
        });
        
        /*element.on('click','.topnav > li.search > a',function () {
        	jQuery('.top-search').fadeToggle(50);
    	});

        element.on('click','.sidebar-button > a',function () {
    		//$('.sidebar').addClass('show-sidebar').removeClass('hide-sidebar');
    		jQuery(this).parent().find('.dropdown-menu').toggle();
    	});*/
    }
  };

}

directivesModule.directive('sideBar', sidebarDirective);