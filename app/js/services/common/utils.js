'use strict';

var servicesModule = require('./../_index.js');

/**
 * @ngInject
 */
function Utils($q, $http, AppSettings,$sessionStorage,Logger) {

  var service = {};
  var logger = {};
  var clear = true;
  
  var dateFormat = function () {
		var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
			timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
			timezoneClip = /[^-+\dA-Z]/g,
			pad = function (val, len) {
				val = String(val);
				len = len || 2;
				while (val.length < len) val = "0" + val;
				return val;
			};

		// Regexes and supporting functions are cached through closure
		return function (date, mask, utc) {
			var dF = dateFormat;

			// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
			if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
				mask = date;
				date = undefined;
			}

			// Passing date through Date applies Date.parse, if necessary
			date = date ? new Date(date) : new Date;
			if (isNaN(date)) throw SyntaxError("invalid date");

			mask = String(dF.masks[mask] || mask || dF.masks["default"]);

			// Allow setting the utc argument via the mask
			if (mask.slice(0, 4) == "UTC:") {
				mask = mask.slice(4);
				utc = true;
			}

			var	_ = utc ? "getUTC" : "get",
				d = date[_ + "Date"](),
				D = date[_ + "Day"](),
				m = date[_ + "Month"](),
				y = date[_ + "FullYear"](),
				H = date[_ + "Hours"](),
				M = date[_ + "Minutes"](),
				s = date[_ + "Seconds"](),
				L = date[_ + "Milliseconds"](),
				o = utc ? 0 : date.getTimezoneOffset(),
				flags = {
					d:    d,
					dd:   pad(d),
					ddd:  dF.i18n.dayNames[D],
					dddd: dF.i18n.dayNames[D + 7],
					m:    m + 1,
					mm:   pad(m + 1),
					mmm:  dF.i18n.monthNames[m],
					mmmm: dF.i18n.monthNames[m + 12],
					yy:   String(y).slice(2),
					yyyy: y,
					h:    H % 12 || 12,
					hh:   pad(H % 12 || 12),
					H:    H,
					HH:   pad(H),
					M:    M,
					MM:   pad(M),
					s:    s,
					ss:   pad(s),
					l:    pad(L, 3),
					L:    pad(L > 99 ? Math.round(L / 10) : L),
					t:    H < 12 ? "a"  : "p",
					tt:   H < 12 ? "am" : "pm",
					T:    H < 12 ? "A"  : "P",
					TT:   H < 12 ? "AM" : "PM",
					Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
					o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
					S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
				};

			return mask.replace(token, function ($0) {
				return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
			});
		};
  }();
  

  //Some common format strings
  dateFormat.masks = {
		"default":      "ddd mmm dd yyyy HH:MM:ss",
		shortDate:      "m/d/yy",
		mediumDate:     "mmm d, yyyy",
		longDate:       "mmmm d, yyyy",
		fullDate:       "dddd, mmmm d, yyyy",
		shortTime:      "h:MM TT",
		mediumTime:     "h:MM:ss TT",
		longTime:       "h:MM:ss TT Z",
		isoDate:        "yyyy-mm-dd",
		isoTime:        "HH:MM:ss",
		isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
		isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
  };
	
  //Internationalization strings
  dateFormat.i18n = {
		dayNames: [
			"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		],
		monthNames: [
			"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
			"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
		]
  };
  
  service.init = function(){
	  Array.prototype.hasValue = function(key){
			for(var i=0;i<this.length;i++){
				if(this[i]==key)
					return true;
			}
			return false;
	  }
	  
	  Date.prototype.format = function (mask, utc) {
			return dateFormat(this, mask, utc);
	  };
	  
	  logger = Logger.getInstance("Utils");
  }
  
  service.createElement = function(name,classname,id) {
	  var el = document.createElement(name);
	  if(classname!==undefined && classname!=""){
		  el.setAttribute("class", classname);
	  }
	  if(id!==undefined && id!=""){
		  el.setAttribute('id',id);
	  }
	  return el;
  };
  
  service.getUID = function() {
  	// Math.random should be unique because of its seeding algorithm.
  	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
  	// after the decimal.
  	return '_' + Math.random().toString(36).substr(2, 9);
  };
  
  service.updateLocalStorage = function(http,lvalue,dvalue){
	  http.success(function(data){
		  if(data && data.constructor === Array && data.length > 0){
			  if(dvalue){
				  //$sessionStorage[lvalue] = data[dvalue];
				  service.saveInStorage(lvalue,data[dvalue]);
			  }else{
				  //$sessionStorage[lvalue] = data;
				  service.saveInStorage(lvalue,data);
			  }
		  }else{
			  logger.debug("Data is valid for storage");
		  }
	  });
	  return http;
  }
  
  service.servePromise = function(data){
	  var promise = {
		  success: function(callback) {
			 callback(data);
			 return this;
	      },
	      error:function(callback){
	    	 //callback(data);
	    	 return this;
	      }
	  };
	  return promise;
  }
  
  service.serveErrorPromise = function(data){
	  var promise = {
		  success: function(callback) {
			 //callback(data);
			 return this;
	      },
	      error:function(callback){
	    	 callback(data);
	    	 return this;
	      }
	  };
	  return promise;
  }
  
  service.saveInStorage = function(key,data){
	   try {
	        if ($sessionStorage) {
	            if(data && ((data.constructor === Array && data.length > 0) || typeof data === 'object')){
	            	data.expirytimestamp = new Date();
	            	$sessionStorage[key] = data;
	            }else{
	            	throw new UserException("Provided Data storage is Undefined");
	            }
	        }
	    }
	    catch (e) {
	    	//logger.error("Error while saving data in storage with key ",storageKey,e);
	    }
  }
  
  service.getFromStorage = function(storageKey){
	  var now, expiration, data = false;
	  try {
	        if ($sessionStorage) {
	            data = $sessionStorage[storageKey];
	            if (data) {
	                // calculate expiration time for content,
	                // to force periodic refresh after 30 minutes
	                now = new Date();
	                expiration = new Date(data.expirytimestamp);
	                expiration.setMinutes(expiration.getMinutes() + 200);
	 
	                // ditch the content if too old
	                if (now.getTime() > expiration.getTime() || clear) {
	                	clear = false;
	                    data = false;
	                    delete sessionStorage[storageKey];
	                    logger.debug("Data with key ",storageKey," is too old, Expiring it");
	                }
	            }
	        }
	    }
	    catch (e) {
	    	//logger.error("Error while getting data from storage with key ",storageKey,e);
	    	data = false;
	    }
	    return data;
  }
  
  service.isEmpty = function (obj) {
		for(var prop in obj) {
		    if(obj.hasOwnProperty(prop))
		        return false;
		}
		return true;
  }
  
  service.isBlank = function (obj) {
		if(!obj || obj.trim()==""){
			return true;
		}
		return false;
  };
  
  service.isNotBlank = function (obj) {
		if(obj && obj.length>0){
			return true;
		}
		return false;
  };
  
  service.isNumber = function (obj) {
		if(!isNaN(parseFloat(obj)) && isFinite(obj)){
			return true;
		}
		return false;
  };
  
  service.objectToList = function(p){
	  var list = [];
	  for (var key in p) {
		  if (p.hasOwnProperty(key)) {
		    list.push(p[key]);
		  }
	  }
	  return list;
  };
  
  service.removeKeys = function(o,keys){
	  var obj = angular.copy(o);
	  for(var key in keys){
		  if(obj.hasOwnProperty(key)){
			  delete obj[key];
		  }
	  }
	  return obj;
  };
  
  service.compareItems = function(obj1,obj2){
	  var ob1 = {},ob2 = {};
	  angular.copy(obj1,ob1);
	  angular.copy(obj2, ob2);
	  ob1.quantity = 0;ob2.quantity = 0;
	  return service.deepCompare(ob1,ob2);
  }
  
  service.deepCompare = function() {
	  var i, l, leftChain, rightChain;

	  function compare2Objects (x, y) {
	    var p;

	    // remember that NaN === NaN returns false
	    // and isNaN(undefined) returns true
	    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
	         return true;
	    }

	    // Compare primitives and functions.     
	    // Check if both arguments link to the same object.
	    // Especially useful on step when comparing prototypes
	    if (x === y) {
	        return true;
	    }

	    // Works in case when functions are created in constructor.
	    // Comparing dates is a common scenario. Another built-ins?
	    // We can even handle functions passed across iframes
	    if ((typeof x === 'function' && typeof y === 'function') ||
	       (x instanceof Date && y instanceof Date) ||
	       (x instanceof RegExp && y instanceof RegExp) ||
	       (x instanceof String && y instanceof String) ||
	       (x instanceof Number && y instanceof Number)) {
	        return x.toString() === y.toString();
	    }

	    // At last checking prototypes as good a we can
	    if (!(x instanceof Object && y instanceof Object)) {
	        return false;
	    }

	    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
	        return false;
	    }

	    if (x.constructor !== y.constructor) {
	        return false;
	    }

	    if (x.prototype !== y.prototype) {
	        return false;
	    }

	    // Check for infinitive linking loops
	    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
	         return false;
	    }

	    // Quick checking of one object beeing a subset of another.
	    // todo: cache the structure of arguments[0] for performance
	    for (p in y) {
	        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
	            return false;
	        }
	        else if (typeof y[p] !== typeof x[p]) {
	            return false;
	        }
	    }

	    for (p in x) {
	        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
	            return false;
	        }
	        else if (typeof y[p] !== typeof x[p]) {
	            return false;
	        }

	        switch (typeof (x[p])) {
	            case 'object':
	            case 'function':

	                leftChain.push(x);
	                rightChain.push(y);

	                if (!compare2Objects (x[p], y[p])) {
	                    return false;
	                }

	                leftChain.pop();
	                rightChain.pop();
	                break;

	            default:
	                if (x[p] !== y[p]) {
	                    return false;
	                }
	                break;
	        }
	    }

	    return true;
	  }

	  if (arguments.length < 1) {
	    return true; //Die silently? Don't know how to handle such case, please help...
	    // throw "Need two or more arguments to compare";
	  }

	  for (i = 1, l = arguments.length; i < l; i++) {

	      leftChain = []; //Todo: this can be cached
	      rightChain = [];

	      if (!compare2Objects(arguments[0], arguments[i])) {
	          return false;
	      }
	  }

	  return true;
  }
  
  service.capitalizeFirstLetter = function(str) {
	    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return service;
}

servicesModule.service('Utils', Utils);