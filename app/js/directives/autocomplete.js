'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */


function ngAutocomplete($parse,$timeout) {
    return {
      scope: {
        ngAutocomplete: '=',
        options: '=',
        source:'=',
        select:'='
      },

      link: function(scope, element, attrs, model) {
    	var litemplate = "<ul class='myautocomplete'><li>Option 10</li><li>Option 20</li></ul>"
    	var minlength = attrs['minlength']?attrs['minlength']:2;
    	var ul,appendto = "body";
    	var top = 0;
    	
    	/*$('body').attr('id','myautocompleteactive');
    	
    	if(element.parent().hasClass('input-group')){
    		appendto = element.parent().after('<div class="myautocomplete-holder"><div class="inner-ui-auto"></div></div>').next('div').find('.inner-ui-auto');
    		top = element.parent().height() - element.height()
    	}else{
    		appendto = element.after('<div class="myautocomplete-holder"><div class="inner-ui-auto"></div></div>').next('div').find('.inner-ui-auto');
    	}
    	
    	console.log(element.height(),element.parent().height());
    	
    	appendto.html(litemplate);
    	appendto.css({'margin-top':-top+'px','min-width':element.width()+'px'});
    	ul = appendto.find('ul');
    	console.log("autocomplete is loaded");
    	
    	var searchItems = function(val){
    		$timeout(function(){
	      		  scope.source({term:val},function(data){
	      			  console.log("returned elements are ",data);
	      		  });
	      	},10);
    	}
    	
    	var i = 0;
    	
    	var myAutoComplete = function(){
    		element.focus(function(e){
    			e.stopPropagation();
    			appendto.show();
    			console.log("Again Focus ",i);
    			if(i>=0){
	    			searchItems($(this).val());
	    			setTimeout(function(){
	    				$('#myautocompleteactive').bind('click',function() {
	            			appendto.hide();
	            			$('#myautocompleteactive').unbind('click');
	            		});
	    				i++;
	    			},200);
    			}
    		});
    	}*/

		var appendto = "body";
        if(attrs.appendto){
        	appendto = element.closest('div').append('<div class="inner-ui-auto" style="position:fixed;z-index:99999;background-color:#fff;"></div>').find('.inner-ui-auto');
        }

    	var newAutocomplete = function() {
          element.autocomplete({
        	  appendTo: $(appendto),
              source: function(request,response){
            	  $timeout(function(){
            		  scope.source(request,response);
            	  },10);
              },
              minLength: minlength,
              select: function( event, ui ) {
            	  console.log("Selected dropdown element is ",ui);
            	  $timeout(function(){
            		  scope.select(ui);
            		  console.log(element.val());
            	  },2);
              }
          }).data("ui-autocomplete")._renderItem = function( ul, item ) {
        	  var f1 = item[attrs.field1];
        	  var f2 = item[attrs.field2];
        	  var s = "<a>" + f1 + (f2?"[" + f2 + "]</a>":"");
              return $( "<li>" )
              .append( s )
              .appendTo( ul );
          };
          
          if(attrs.focus){
	          element.focus(function () {
	        	  console.log("Focus is enabled");
	        	  $(this).autocomplete('search', '');
	          });
          }
        }
    	
        $timeout(function(){
        	newAutocomplete();
        },200);
      }
    };
  };
  
  directivesModule.directive('ngAutocomplete', ngAutocomplete);