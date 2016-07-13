'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function dateTimePickerDirective($log,$window) {

  return {
    restrict: 'EA',
    scope : {
    		field : '=ngModel',
			run : '=run'
	},
    link: function(scope, element, attribs) {
    	var logger = $log.getInstance('dateTimePicker');
    	logger.debug("In dateTimePicker directive");
    	
    	var format = attribs.dataDateFormat?attribs.dataDateFormat:'yyyy-mm-dd';
    	
    	$(element).find('input').datepicker({
    		dateFormat: format,
    		onSelect: function(d,i){
    			$(this).change();
    	    }
    	});
    	
    	$(element).find('input').change(function(){
    		var v = $(this).val();
    		scope.$apply(function(){
    			scope.field = v;
    		});
    	});
    }
  };
}

directivesModule.directive('dateTimePicker', dateTimePickerDirective);