'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function datePicker($log,$window,$timeout) {

  return {
    restrict: 'EA',
    scope : {
    		field : '=ngModel',
			run : '=run'
	},
    link: function(scope, element, attribs) {
    	var logger = $log.getInstance('datePicker');
    	logger.debug("In datePicker directive");
    	var template = '<div class="input-append input-group" style="width:100%;margin-bottom:0px !important;">'
						  +'<input class="form-control" value="" type="text">'
						  +'<span class="add-on input-group-addon primary" style="cursor:pointer;width: 40px;"><i class="fa fa-calendar" aria-hidden="true"></i></span>'
					  +'</div>';
    	$(element).html(template);
    	
    	var pickertype = attribs['pickertype']?attribs['pickertype']:'date';
    	
    	function cb(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
    	cb(moment().subtract(29, 'days'), moment());
    	
    	if(pickertype==='date'){
    		$(element).find('input').daterangepicker({
    			autoUpdateInput: true,
    			singleDatePicker: true,
    			showDropdowns: true,
    			locale: {
			      format: 'YYYY-MM-DD',
			      cancelLabel: 'Clear'
			    }
    		},cb);
    		$timeout(function(){
    			$(element).find('input').trigger('change');
    		},200);
    	}else if(pickertype==='range'){
    		$(element).find('input').daterangepicker({
    			locale: {
			      format: 'YYYY-MM-DD'
			    },
			    ranges: {
			           'Today': [moment(), moment()],
			           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			           'This Month': [moment().startOf('month'), moment().endOf('month')],
			           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			    }
    		},cb);
    	}
    	$(element).find('input').on('change',function(){
    		var val = $(this).val();
    		logger.debug("Date Changed bootstrap ",val);
    		scope.$apply(function(){
    			scope.field = val;
    		});
    	});
    	$(element).find('.input-group-addon').click(function(){
    		$(this).prev('input').trigger('click');
    	});
    }
  };
}

directivesModule.directive('datePicker', datePicker);