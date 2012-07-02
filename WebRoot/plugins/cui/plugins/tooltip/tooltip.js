(function(cuiPackage){
	/**
	 * @class CUI.ToolTip
	 * 表单数据库
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("ToolTip",cuiPackage.Object,{
		className: "tip-yellowsimple",
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize: function(options){
			cuiPackage.Object.prototype._initialize.apply(this,arguments);
			//渲染
			this._render();
		},
		
		/**
		 * 渲染
		 */
		_render: function(){
			$(this.target).addClass("cui-tooltip").poshytip(this);
		},
		
		/**
		 * 显示
		 */
		show: function(){
			$(this.target).poshytip("show");
		},
		
		/**
		 * 隐藏
		 */
		hide: function(){
			$(this.target).poshytip("hide");
		},
		
		/**
		 * 更新
		 * @param {Object} content 新的内容
		 */
		update: function(content){
			$(this.target).poshytip("update",content);
		},
		
		/**
		 * 不可用
		 */
		disable: function(){
			$(this.target).poshytip("disable");
		},
		
		/**
		 * 可用
		 */
		enable: function(){
			$(this.target).poshytip("enable");
		},
		
		/**
		 * 销毁
		 */
		destroy: function(){
			$(this.target).poshytip("destroy");
		}
	});
})(jQuery.fn);