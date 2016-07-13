'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */

function DataTable($log,Utils){
	var directive = {};
	
	directive.restrict = 'A';
	
	directive.scope = {
			run : '=run',
			model:'=ngModel',
			searchvalue:'=externalSearchValue'
	}
	
	directive.link = function($scope, element, attributes) {
		var logger = $log.getInstance('dataTable');
    	logger.debug("In dataTable directive");
		
		var oTable;
		var dataSet = [];
		var externalSearchFlag = false;
		var i=0;
		if(!attributes.idPos){
			attributes.idPos=0;
		}
		element.parent().addClass('datatable').css('overflow','hidden');;
		$scope.$watch('model',function(newVal){
			//logger.debug('Model Changed ',newVal);
    		if(newVal && newVal.length>0){
    			dataSet = [];
    			var l = [];
    			var count = 0;
    			//logger.debug("Came with data "+newVal.length);
	        	$.each(newVal,function(index,obj){
	        		var d = [];
	        		var c = [];
	        		var k = attributes.displaykeyarray.split(',');
	        		/*for (var key in obj) {
	        			  if (obj.hasOwnProperty(key)) {
	        			    if(attributes.doNotDisplayId && attributes.doNotDisplayId=="true" && attributes.idPos==key)
    	        				continue;
	        			    if(k.hasValue(key)){
	        			    	d.push(obj[key]);
	    	        			c.push(key);
	        			    }
	        			  }
	        		}*/
	        		
	        		for (var i=0;i<k.length; i++) {
	        			  var key = k[i];
	        			  //logger.debug("-----Value of k "+key);
	        			  if (obj.hasOwnProperty(key)) {
	        				  //logger.debug("Object owns this property ");
	        			      if(attributes.doNotDisplayId && attributes.doNotDisplayId=="true" && attributes.idPos==key)
	        			    	  continue;
	        			      c.push(key);
	        			      if(attributes.imagefield && attributes.imagefield==key){
	        			    	  d.push('<img src="'+obj[key]+'" style="width:100%;" ></img>');
	        			    	  continue;
	        			      }
	        			      if(attributes.hortline && attributes.hortline=="true" && attributes.hortlineField && attributes.hortlineField==key){
	        			    	  //logger.debug("Object is hotline ");
	        			    	  var hline = obj[key].split(/\||=/);
	        			    	  d.push(getHotlineBar(hline[0],hline[1]));
	        			    	  continue;
	        			      }
	        			      d.push(obj[key]);
	        			  }else{
	        				  if(key.startsWith('_')){
	        					  if(key.startsWith('_checkbox')){
	        						  d.push('<input type="checkbox" data-id="'+obj[attributes.idPos]+'" >');
	        					  }else if('_index'){
	        						  d.push(++count+'');
	        					  }
	        				  }
	        			  }
	        		}
	        		
	        		if(attributes.opps){
	        			var opp = attributes.opps.split(',');
	        			var m = '';
	        			for(i=0;i<opp.length;i++){
	        				if(opp[i]!='' && opp[i]!=','){
	        					var er = opp[i].split('&');
	        					m+='<a class="'+er[1]+' editable-table-btn facebook-hover" rel="'+obj[attributes.idPos]+'" href=""><i class="fa fa-'+er[0]+'"></i></a>';
	        					if(er[1]!="")
	        						l.push(er[1]);
	        				}
	        			}
	        			d.push(m);
	        		}
  		
	        		if(attributes.btns){
	        			//logger.debug("btns------------------"+attributes.btns);
	        			var btns = attributes.btns.split(',');
	        			var m = '';
	        			for(i=0;i<btns.length;i++){
	        				if(btns[i]!='' && btns[i]!=',' && !btns[i].startsWith('_')){
	        					//logger.debug("btns[i]----------"+btns[i]);
	        					var er = btns[i].split('&');
	        					m+='<button type="button" class="btn btn-primary tablebtnclick" data-id="'+er[1]+'" rel="'+obj[attributes.idPos]+'">'+er[0]+'</button>';
	        					if(er[1]!="")
	        						l.push(er[1]);
	        					logger.debug("m-----"+m);
	        				}else{
	        					if(btns[i].startsWith('_fa')){
	        						//logger.debug("btns[i]----------"+btns[i]);
		        					var er = btns[i].split('&');
		        					var fabtn = er[0].split("|");
		        					//logger.debug(fabtn);
		        					var color = fabtn[1]?fabtn[1]:'';
		        					var cls = "btn-primary";
		        					if(color){
		        						cls = 'btn-default';
		        					}
		        					//logger.debug(color);
		        					m+='<a class="btn '+cls+' btn-xs tablebtnclick" rel="'+obj[attributes.idPos]+'" data-id="'+er[1]+'" style="background-color:'+color+'"><i class="fa '+fabtn[0].substring(1)+'"></i></a>';
		        					if(er[1]!="")
		        						l.push(er[1]);
		        					//logger.debug("m-----"+m);
	        					}
	        				}
	        			}

	        			d.push(m);
	        		}
	        		
	        		dataSet.push(d);
	        		//logger.debug('',dataSet);
	        	});
	        	//logger.debug(dataSet);
	        	if (oTable!=null && oTable!=undefined){
	        		oTable.fnClearTable();
	                oTable.fnDestroy();
	        	}
	    		if(attributes.columns){
	    			var arr = attributes.columns.split(',');
	    			var columns = [];
	    			for(i=0;i<arr.length;i++){
	    				columns.push({"title":arr[i]});
	    			}
	        		oTable = element.dataTable({
	                	"data": dataSet,
	                	"columns":columns,
	                	"aLengthMenu": [ 2, 5, 10, 25, 50, 100 ]
	                });
	        		resetTableStyle();
	    		}else{
	    			//"--------------------------------No Columns-------------------------";
	    			oTable = element.dataTable({
	    				aaData: dataSet
	                });
	    			resetTableStyle();
	    		}
	    		
	    		//Add Listner to all the events
	    		/*$.each(l,function(index,obj){
	    			element.on('click',"."+obj,function(e){
	    				e.preventDefault();
	    				logger.debug("event "+obj+" has been Triggered");
	    			});
	    		});*/
        	}else{
        		if (oTable!=null && oTable!=undefined){
	        		oTable.fnClearTable();
	        	}
        	}
        });
		
		element.on('click','.tablebtnclick',function(e){
			e.preventDefault();
			e.stopPropagation();
			logger.debug("Some table btn clicked");
            var id = $(this).attr('rel');
            var dataid = $(this).attr('data-id');
			if($scope.run){
				$scope.$apply(function(){
					logger.debug("Calling method with ",dataid,id);
    				$scope.run(dataid,id);
				});
			}
		});
		
		if(attributes.enableRowClick && attributes.enableRowClick=="true"){
			element.on('click','tr',function(e){
				e.preventDefault();
				e.stopPropagation();
				logger.debug("Some table btn clicked");
				var _tbtn = $(this).find('.tablebtnclick');
	            var id = _tbtn.attr('rel');
	            var dataid = _tbtn.attr('data-id');
				if($scope.run){
					$scope.$apply(function(){
						logger.debug("Calling method with ",dataid,id);
	    				$scope.run(dataid,id);
					});
				}
			});
		}
		
		var getHotlineBar = function(v,hortlineVars){
			logger.debug(hortlineVars);
			if(hortlineVars){
				hortlineVars = hortlineVars.split(',');
				var ol = '<ul class="timeline-hotline" id="timeline-hotline">';
				var className = "complete";
				var time = "";
				try{
					time = new Date().format("h:MM TT");
				}catch(e){}
				hortlineVars.forEach(function(val){
					var li = '<li class="li '+className+'">'
							+'<div class="timestamp">'
						    +'  <span class="date">'+time+'<span>'
						    +'</div>'
					    	+'<div class="status">'
					    	+'<h4>'+val+'</h4>'
					    	+'</div>'
					    	+'</li>';
					if(val==v){
						className = '';
						time = '';
					}
					ol+=li;
				});
				ol+="</ul>";
				
				ol = String(ol).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
				
				var a = '<a class="m-tooltipster" title="'+ol+'">'+v+'</a>';
				
				return a;
			}
			return v;
		}
		
		var onResize = function(){
    		//logger.debug("Resizing the table");
    		var table = element;
    		table.css("width","100% !important");
    		table.parent().css("overflow","hidden");
    	}
		
		window.onresize = onResize;
	
		var resetTableStyle = function(){
			logger.debug('Reseting table style');
			var tooltips = element.find('.m-tooltipster').tooltipster({
				//content:message,
                theme: 'tooltipster-shadow',
                position: 'left',
                contentAsHTML: true
            });
			
			var uid = Utils.getUID();
	        element.attr("id","table_"+uid);
	        
	        var el = element.parent();
	        el.removeClass('form-inline');
			
			var btn = '';//'<div class="pull-left" style="margin-right:5px;" ><div id="table_'+uid+'_add" class="dataTables_add"><a class="btn btn-primary addbtn" title="Add Item" >Split Orders</a><a class="btn btn-success" title="Download To Excel" >Join Orders</a></div></div>';
			el.find('.dataTables_filter input').width(320).addClass('form-control').addClass('round-corner-xs').attr('placeholder','Search')
	        .parents('.pull-right').removeClass('pull-right').addClass('pull-left');
			el.find('.dataTables_length select').addClass('form-control').addClass('round-corner-xs')
	        .parents('.pull-left').removeClass('pull-left').addClass('pull-right').after(btn);
	        
			if(attributes.disableSearchField){
				el.find('.dataTables_length').hide();
				el.find('.dataTables_filter').hide();
				if(attributes.enableExternalSearchField){
					if(!externalSearchFlag){
						$scope.$watch('searchvalue',function(sval){
							console.log("You are searching for ",sval);
							el.find('.dataTables_filter input').val(sval).trigger('keyup.DT');
						});
					}
				}
			}
			
	        var i = 0;
	        el.find('.dataTables_length label').contents().filter(function(){
	        	if(i++>0)
	        	return this.nodeType === 3;
	        }).remove();
		}
		
		oTable = element.dataTable();
		resetTableStyle();
	};

    return directive;
};

directivesModule.directive('datatable', DataTable);