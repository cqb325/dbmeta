(function(cuiPackage){
	/**
	 * @class CUI.Menu
	 * @extends CUI.Object
	 * 菜单项
	 * @author cqb
	 * @version 2.0
	 * @demo ../example/menu/index.html
	 */
	cuiPackage.Class("Menu",cuiPackage.Object, {
		/**
		 * 菜单项对象
		 * @type {Array}
		 */
		items: null,
		
		container: null,
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
        
        /**
         * @private
         * @description 渲染
         */
        _render: function(){
        	if(!this.items){
        		this.items = [];
        	}
        	if(this.items.length){
	        	//创建
	        	this._create();
	        	//添加事件的监听
	        	this._listener();
        	}
        },
        
        /**
         * @private
         * @description 创建
         */
        _create: function(){
        	
        },
        
        /**
         * @description 添加菜单项
         * @param {Object} menuitem
         */
        add: function(menuitem){
        	this.items.push(menuitem);
        	if(typeof(this.container) != "object"){
        		this.container = jQuery(this.container);
        	}
        	this.container.append(menuitem.item);
        }
	});
})(jQuery.fn);