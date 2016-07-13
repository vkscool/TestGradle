'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function RegisterController($scope,UserService,Logger,Utils,ErrorCodes) {
	var logger = Logger.getInstance('RegisterController');
	logger.debug("In LoginCtrl ctrl");

	$scope.userinfo = {};
	$scope.errormessage = '';
	
	$scope.register = function () {
		if(Utils.isBlank($scope.userinfo.firstName)){
			$scope.errormessage = "Please Enter First Name";
			return false;
		}
		if(Utils.isBlank($scope.userinfo.email)){
			$scope.errormessage = "Please Enter Email";
			return false;
		}
		if(Utils.isBlank($scope.userinfo.password)){
			$scope.errormessage = "Please Enter Password";
			return false;
		}
		if($scope.userinfo.password!=$scope.userinfo.cpassword){
			$scope.errormessage = "Confirm Password doesn't match";
			return false;
		}
		$scope.errormessage = '';
		UserService.save($scope.userinfo,function(data){
			logger.debug("success ",data);
		},function(data){
			logger.debug("error ",data.data);
			if(data.data.code===ErrorCodes.InvalidInput){
				$scope.errormessage = data.data.message;
			}else if(data.data.code===ErrorCodes.AlreadyExist){
				$scope.errormessage = data.data.message;
			}
		});
	};
}

controllersModule.controller('RegisterController', RegisterController);