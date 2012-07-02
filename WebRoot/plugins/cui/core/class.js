(function(jQuery) {
	/**
	 * @type {Function}
	 * jQuery.fn.Class
	 * 创建类并实现类之间的继承
	 * @author cqb
	 * @version 2.0
	 */
	jQuery.fn.extend({
		Class : function() {
			var extended = {};
			var parent, _initialize, Type;
			var classpath = arguments[0];
			
			for ( var i = 1, len = arguments.length; i < len; ++i) {
				Type = arguments[i];
				if (typeof Type == "function") {
					// make the class passed as the first argument the
					// superclass
					if (i == 0 && len > 1) {
						_initialize = Type.prototype._initialize;
						// replace the _initialize method with an empty function,
						// because we do not want to create a real instance here
						Type.prototype._initialize = function() {
						};
						// the line below makes sure that the new class has a
						// superclass
						extended = new Type();
						// restore the original _initialize method
						if (_initialize === undefined) {
							delete Type.prototype._initialize;
						} else {
							Type.prototype._initialize = _initialize;
						}
					}
					// get the prototype of the superclass
					parent = Type.prototype;
				} else {
					// in this case we're extending with the prototype
					parent = Type;
				}
				jQuery.extend(extended, parent);
			}
			//创建包
			var Class = _createPackages(classpath);
			Class.prototype = extended;
			
			function _createPackages(path){
				var packages = path.split(".");
				var parent = jQuery.fn;
				for(var i = 0; i< packages.length - 1; i++){
					if(!parent[packages[i]]){
						parent[packages[i]] = {};
					}
					parent = parent[packages[i]];
				}
				var classname = packages[packages.length - 1];
				var clazz = parent[classname] = function(options){
					if (arguments && arguments[0] != jQuery.fn.Class.isPrototype) {
						if (this.each) {
							return this.each(function(index) {
								var F = function(){};
								F.prototype = extended;
								var clazz = new F();
								//jQuery.extend(clazz, extended);
								jQuery(this).data(classname, clazz);
								if(!jQuery(this).data("original")){
									jQuery(this).data("original", jQuery(this).clone(true));
								}
								clazz.CLASS_NAME = classname;
								clazz.target = this;
								if (clazz._initialize) {
									clazz._initialize.apply(clazz, [options]);
								}
							});
						} else {
							this.CLASS_NAME = classname;
							this._initialize.apply(this, arguments);
						}
					}
				};
				return clazz;
			}
			
			return Class;
		}
	});
	jQuery.fn.Class.isPrototype = function () {};
})(jQuery);

var CUI = window.cui = window.CUI = jQuery.fn;
CUI.getRootPath = function(){
  	var strFullPath=window.document.location.href;
	var strPath=window.document.location.pathname;
	var pos=strFullPath.indexOf(strPath);
	var prePath=strFullPath.substring(0,pos);
	var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1)+"/";
	
	return(prePath+postPath);
}
if(!CUI.ctx){
	CUI.ctx = CUI.getRootPath();
} 