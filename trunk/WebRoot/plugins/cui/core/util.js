(function (cuiPackage) {
	/**
	 * @class jQuery.fn.Util
	 * @singleton
	 * 工具包
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Util = {
		/**
		 * 获取body的尺寸大小兼容各个浏览器
		 */
		getBodyDimensions : function(){
			var winWidth = 0;
			var winHeight = 0;
			//获取窗口宽度
			if (window.innerWidth){
				winWidth = window.innerWidth;
			}else if ((document.body) && (document.body.clientWidth)){
				winWidth = document.body.clientWidth;
			}
			//获取窗口高度
			if (window.innerHeight){
				winHeight = window.innerHeight;
			}else if ((document.body) && (document.body.clientHeight)){
				winHeight = document.body.clientHeight;
			}
			//通过深入Document内部对body进行检测，获取窗口大小
			if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
				winHeight = document.documentElement.clientHeight;
				winWidth = document.documentElement.clientWidth;
			}
			
			return {width:winWidth, height:winHeight};
		},
		
    	/**
         * @description 获取UUID
         * @return {String} UUID
         */
    	UUID: function(){
		    var S4 = function() {
		       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		    };
		    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    	},
    	    	
    	/**
         * @description 获取系统的根路径
         * @return {String} 系统根路径
         */
    	getRootPath: function(){
    		var strFullPath=window.document.location.href;
			var strPath=window.document.location.pathname;
			var pos=strFullPath.indexOf(strPath);
			var prePath=strFullPath.substring(0,pos);
			var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1)+"/";
			
			return(prePath+postPath);
    	}
	}
})(jQuery.fn);