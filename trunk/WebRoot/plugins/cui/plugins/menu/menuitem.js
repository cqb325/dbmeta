(function(cuiPackage){
	/**
	 * @class CUI.MenuItem
	 * @extends CUI.Object
	 * 菜单项
	 * @author cqb
	 * @version 2.0
	 * @demo ../example/menu/index.html
	 */
	cuiPackage.Class("MenuItem",cuiPackage.Object, {
		/**
		 * 菜单项对象
		 * @type {Object}
		 */
		item: null,
		/**
		 * 菜单类型
		 * @type {Object}
		 */
		type: null,
		/**
		 * 回调函数
		 * @type {Function}
		 */
		handler: null,
		/**
		 * 菜单标题
		 * @type {String}
		 */
		title: null,
		/**
		 * 菜单项id
		 * @type {String}
		 */
		id: null,
		
		skin: null,
		
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
        	//创建
        	this._create();
        	//添加事件的监听
        	this._listener();
        },
        
        /**
         * @private
         * @description 创建
         */
        _create: function(){
        	if(!this.title){
        		alert("菜单项需要一个标题");
        		return false;
        	}
        	
        	this.item = $("<a href='javascript:void(0);'></a>").addClass("cui-menuitem").addClass("cui-button").html(this.title);
        	if(this.skin){
        		this.item.addClass(this.skin);
        	}
        	if(this.id){
        		this.item.attr("id", this.id);
        	}
        	if(this.type){
        		this.item.append("<span>").addClass("cui-menuitem-"+this.type).addClass("cui-icon");
        	}
        },
        
        /**
         * @private
         * @description 添加事件的监听
         */
        _listener: function(){
        	var self = this;
        	this.item.hover(function(){
        		self.item.addClass("cui-menuitem-over");
        		self.over();
        	},function(){
        		self.item.removeClass("cui-menuitem-over");
        		self.out();
        	});
        	
        	this.item.click(function(){
        		if(self.handler){
        			self.handler();
        		}
        	});
        },
        
        /**
         * @description 鼠标滑过
         */
        over: function(){},
        
        /**
         * @description 鼠标滑走
         */
        out: function(){}
	});
})(jQuery.fn);