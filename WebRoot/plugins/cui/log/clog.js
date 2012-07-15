(function(cuiPackage){
	/**
	 * @class CUI.CLog
	 * 日志
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("CLog",{
		type: null,
		INFOLEVEL: 1,
		ERRORLEVEL: 2,
		logservice: "",
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize: function(type, options){
			this.type = type;
			alert(type);
			for(var i in options){
				this[i] = options[i];
			}
		},
		
		info: function(name, state){
			this.execute(this.INFOLEVEL,name, state);
		},
		
		error: function(name, state){
			this.execute(this.ERRORLEVEL,name, state);
		},
		
		execute: function(level, name, state){
			$.ajax({
				url: this.logservice,
				type: "post",
				data: {level: level, name: name, state: state, type: this.type},
				success: function(){}
			});
		}
	});
})(jQuery.fn);