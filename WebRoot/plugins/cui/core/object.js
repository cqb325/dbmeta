(function(cuiPackage) {
	
	cuiPackage.Class("Object",{
		/**
         * 所有的特效
         * @type {Object}
         */
		animations: null,
		/**
         * 事件名称前缀
         * @type {String}
         */
		eventPrefix: "cui",
		/**
         * @private
         * @description 构造函数
         * @param {Object} options 构造参数对象
         */
		_initialize: function(options){
			for(var i in options){
				this[i] = options[i];
			}
		},
		
		/**
         * @description 销毁 销毁该对象、或则该对象创建的元素。将操作的对象还原
         */
		destroy: function() {
			var original = jQuery(this.target).data("original");
			jQuery(this.target).before(original);
			original = null;
			var target = jQuery(this.target).remove();
			target = null;
			jQuery(this.target).removeData(this.CLASS_NAME);
		},
		
		/**
         * @description 获取该类的类名
         * @return {String} 类名
         */
		getClassName: function(){
			return this.CLASS_NAME;
		},
		
		/**
         * @description 组件resize事件
         * @param {Object} event事件
         * @param {Object} obj组件
         */
		resize: function(obj){
			return false;
		},
		
		_trigger: function(type, data) {
			var callback = this[type];
			
			return !(jQuery.isFunction(callback) && callback.call(this.target, data) === false);
		}
	});
})(jQuery.fn);