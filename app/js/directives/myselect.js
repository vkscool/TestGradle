'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */

function mySelectInit($timeout){
	var directive = {};
	
	directive.restrict = 'A';
	
	directive.scope = {
			mdel : '=ngModel'
	};
	
	directive.replace = true;
	
	directive.link = function($scope, element, attributes) {
		var oldSelect = "";
		////console.log("In MY select Init");
		$scope.$watch('mdel',function(nVal){
			var newVal = nVal;
			console.log("New Default Selection "+newVal);
			if((newVal!=undefined && newVal!='' && newVal!='0')){
				//element.val(newVal);
				/*if(oldSelect!="" && oldSelect!=newVal){
					$timeout(function(){
						$scope.mdel = newVal;
						$scope.$apply(); 
					},800);
				}else{
					oldSelect=newVal;
				}*/
			}else{
				var sel = element.find(':selected');
				////console.log("Found selected "+sel.length);
				if(sel.length<=0){
					element.find('option:first-child').attr('selected','selected');
				}else{
					////console.log("this is the value-"+sel.val()+"-");
					if(sel.val()=="" || sel.val()=="?"){
						var label = element.closest('label').html();
						label = label?label:"";
						////console.log("Label is "+label);
						sel.val("0");
						sel.html("Select "+label);
					}
				}
			}
		});
		console.log("Initail value of the ng-model is "+$scope.mdel);
	};
	return directive;
};

directivesModule.directive('mySelectInit', mySelectInit);