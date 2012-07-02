(function(cuiPackage){
	/**
	 * @class jQuery.fn.LayerOut
	 * @extends jQuery.fn.Object
	 * 面板
	 * @author cqb
	 * @version 2.0
	 * @demo ../test/layerout/index.html
	 */
	cuiPackage.Class("LayerOut",cuiPackage.Object, {
		container: null,
		type: null,
		components: null,
		/**
         * @private
         * @description 设置参数信息
         * @param {options} 参数
         */
        _initialize : function(options){
        	cuiPackage.Object.prototype._initialize.apply(this,arguments);
        	
        	//渲染
        	this._render();
        },
        
        _render: function(){
        	this.components = [];
        	//创建
        	this._create();
        	//注册事件
        	this._listeners();
        },
        
        _create: function(){
        	this.container = jQuery("<div>").addClass("cui-layerout-wrapper");
        	jQuery("body").append(this.container);
        	
        	this.container.css({
        		top: "0px",
        		left: "0px",
        		right: "0px",
        		bottom: "0px",
        		width: "",
        		height: "",
        		position: "absolute",
        		padding: "0px",
        		margin: "0px",
        		"z-index": -1
        	});
        },
        
        add: function(obj){
        	this.components.push(obj);
        },
        
        _listeners: function(){
        	var self = this;
        	//防止二次响应
        	var flag = 1;
        	jQuery(window).resize(function(event){
        		if(flag%2 == 1){
	        		for(var i in self.components){
	        			var component = self.components[i];
	        			component._trigger("resize", component);
	        		}
	        	}
		        if(jQuery.browser.msie || jQuery.browser.webkit){
	        		flag = flag + 1;
	        	}
	        	
	        	return false;
        	});
        }
	});
})(jQuery.fn);