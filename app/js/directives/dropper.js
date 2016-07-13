'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function dropperDirective(templateLoader,EVENTS,$compile,$log,AppSettings) {
	var directive = {};
	directive.restrict = 'A';
	directive.scope = {
		'run' : '&run'	
	};
	directive.link = function($scope, element, attributes) {
		var Dropzone = require("dropzone");
		var contentDropZone = undefined;
		var temp = '<div class="dropzone1">'
			  	  +'	<div class="dz-message needsclick" style="font-weight:400">Drop files here or click to upload.<br>'
			      +'	<span class="note needsclick">Image Files (<strong>*.jpg,*.png,*.gif</strong>) Are Supported.</span>'
			      +'	</div>'
			      +'</div>';
		element.append(temp);
		var dd = element.find('.dropzone1');
		contentDropZone = new Dropzone(dd[0],{url:AppSettings.apiUrl+'uploader/file',dictDefaultMessage:'Add New Contents'});
		contentDropZone.on('sending', function(file, xhr, formData){
			
        });
		
		contentDropZone.on('success', function(file, response){
			/*var that = this;
			var timer = setTimeout(function(){
				that.removeFile(file);
			},500);*/
			if(response!=undefined && response.filePath!=undefined && response.filePath!=null){
				////////console.log(response.filePath);
				dService.fileMeta = response;
				if($scope.run){
					$scope.$apply(function(){
						$scope.run();
					});
				}
            }
        });
		
		contentDropZone.on('complete', function(file, xhr, formData){

        });
		
		/*$(function() {
		    var mockFile = { name: "banner2.jpg", size: 12345 };
		    var myDropzone = new Dropzone("#my-awesome-dropzone");
		    myDropzone.options.addedfile.call(myDropzone, mockFile);
		    myDropzone.options.thumbnail.call(myDropzone, mockFile, "http://localhost/test/drop/uploads/banner2.jpg");
		})*/
		
	};
	
	return directive;
};

directivesModule.directive('dropper', dropperDirective);