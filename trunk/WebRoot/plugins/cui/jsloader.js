(function(atPackage) {
	/**
	 * @class jQuery.JSLoader
	 * js组件脚本管理
	 * @singleton
	 * @author cqb
	 * @version 2.0 
	 */
	if(!head.js){
		console.log("没有引入headjs脚本");
		return;
	}
	window.JSLoader = JSLoader = {};
	atPackage.extend(JSLoader,{
	   /**
        * 测试模式
        * @type {Boolean}
        */
		debugmode: false,
		
	   /**
        * guid
        * @type {String}
        */
		guid: new Date().getTime(),
		
	   /**
        * 注册的类
        * @type {Object}
        */
		libs : {},
		
	   /**
        * 已经引入的类
        * @type {Object}
        */
		hasimportedlibs: {},
		
	   /**
        * 类的依赖关系
        * @type {Object}
        */
		dependlibs:{},
		
	   /**
        * 类依赖的样式
        * @type {Object}
        */
		dependcsses: {},
		
		/**
         * @description 注册该类根据组件的名称注册
         * @param {String} libname 该类的名称
         * @param {String} srciptpath 该类的相对路径
         * @return {void}
         */
		register: function(libname, srciptpath){
			this.libs[libname] = srciptpath;
		},
		
		/**
         * @description 注册该类的依赖脚本
         * @param {String} libname 该类的名称
         * @param {String} dependlibname 依赖的类的名称
         * @return {void}
         */
		dependlib: function(libname, dependlibname){
			if(!this.dependlibs[libname]){
				this.dependlibs[libname] = [];
			}
			this.dependlibs[libname].push(dependlibname);
		},
		
		/**
         * @description 注册该类的依赖样式
         * @param {String} libname 该类的名称
         * @param {String} dependcsspath 依赖的类的样式路径
         * @return {void}
         */
		dependcss: function(libname, dependcsspath){
			if(!this.dependcsses[libname]){
				this.dependcsses[libname] = [];
			}
			this.dependcsses[libname].push(dependcsspath);
		},
		
		/**
         * @description 引入该脚本文件和该类的依赖脚本文件或则依赖样式文件
         * @param {String} libname 该类的名称
         * @return {void}
         */
		load: function(libnames){
			var libarr = libnames.split(",");
			for(var i =0; i<libarr.length; i++){
				var libname = libarr[i];
				this.loadlib(libname);
			}
		},
		
		/**
         * @description 引入该脚本
         * @param {String} libname 类名
         * @return {void}
         */
		loadlib: function(libname){
			//加载依赖的样式
			if(!this.hasimportedlibs[libname] && this.dependcsses[libname]){
				for(var i=0; i<this.dependcsses[libname].length; i++){
					var dependcsspath = this.dependcsses[libname][i];
					this.importcss(dependcsspath);
				}
			}
			//加载依赖的类
			if(this.dependlibs[libname]){
				for(var i=0; i<this.dependlibs[libname].length; i++){
					var dependlibname = this.dependlibs[libname][i];
					this.loadlib(dependlibname);
				}
			}
			//未曾引用过该类
			if(!this.hasimportedlibs[libname]){
				var librootpath = this._getLibPath();
				var scriptpath = this.libs[libname];
				this._loadScriptFile(librootpath+scriptpath);
				this.hasimportedlibs[libname] = true;
			}
		},
		
		/**
         * @description 引入该脚本
         * @param {String} paths 脚本路径（多个采用','隔开）
         * @return {void}
         */
		js: function(paths){
			head.js(paths);
		},
		
		/**
		 * @private
         * @description 引入该类的依赖样式
         * @param {String} csspath 样式路径
         * @return {void}
         */
		importcss: function(csspath){
			if(this.debugmode){
				csspath += "?timer="+new Date().getTime();
			}
			var librootpath = this._getLibPath();
			
			if($.browser.msie && $.browser.version < 9){
				document.createStyleSheet(librootpath+csspath);
			}else{
				var styleTag = jQuery("<link>");
	    		styleTag.attr("href",librootpath+csspath);
	    		styleTag.attr("rel","stylesheet");
	    		styleTag.attr("type","text/css");
	    		
	    		var h = jQuery("head").length ? 
	    				jQuery("head") : 
	    				jQuery("body");
	    		h.append(styleTag);
    		}
		},
		
		/**
		 * @private
         * @description 获取系统的根路径
         * @param {}
         * @return String 系统根路径
         */
    	_getLibPath: function(){
    		var elements = document.getElementsByTagName('script');
		    for (var i = 0, len = elements.length; i < len; i++) {
		        if (elements[i].src && elements[i].src.match(/jsloader.js/)) {
		            return elements[i].src.substring(0, elements[i].src.lastIndexOf('/') + 1);
		        }
		    }
		    throw new Error("未曾引用脚本管理类jsloader.js");
		    return "";
    	},
    	
    	/**
    	 * @private
         * @description 在系统中引入脚本
         * @param {String} path 脚本文件路径
         * @return void
         */
    	_loadScriptFile: function(path){
    		if(this.debugmode){
				path += "?timer="+this.guid;
			}
    		head.js(path);
    	},
    	
    	/**
         * @description 脚本加载完成之后回调函数
         */
    	ready: function(fun){
    		head.ready(function(){
				fun();
			});
    	}
	});
	JSLoader.getLibPath = JSLoader._getLibPath();
})(jQuery);