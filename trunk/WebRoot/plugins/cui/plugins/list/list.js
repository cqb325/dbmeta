(function(cuiPackage){
	/**
	 * @class CUI.List
	 * @extends CUI.Object
	 * 列表
	 * @author cqb
	 * @version 2.0
	 * @demo ../example/list/index.html
	 */
	cuiPackage.Class("List",cuiPackage.Object, {
		/**
		 * 列表项
		 * @type {Array}
		 */
		items: null,
		/**
		 * 是否自适应高度
		 * @type {Boolean}
		 */
		autoheight: true,
		/**
		 * 显示状态
		 * @type {Boolean}
		 */
		state: true,
		
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
	        
	        //监听
	        this._listener();
        },
        
        /**
         * @private
         * @description 创建
         */
        _create: function(){
        	//添加样式类
        	if(!jQuery(this.target).hasClass("cui-list")){
        		jQuery(this.target).addClass("cui-list");
        	}
        	this.state = jQuery(this.target).css("display") == "none" ? false : true;
        	
        	if(this.items){
        		var listmain = $("<ul>").addClass("cui-list-main");
        		for(var i in this.items){
        			var item = this.items[i];
        			var listitem = $("<li>").addClass("cui-list-item");
        			listitem.html(item);
        			listmain.append(listitem);
        		}
        		jQuery(this.target).append(listmain);
        	}else{
        		var listmain = jQuery(this.target).find("ul").addClass("cui-list-main");
        		listmain.find("li").addClass("cui-list-item");
        	}
        	//是否自适应高度
        	if(this.autoheight){
        		jQuery(this.target).css("height","auto");
        	}else{
        		jQuery(this.target).Scroll();
        	}
        },
        
        _listener:function(){
        	jQuery(".cui-list-item",this.target).hover(function(){
        		$(this).addClass("cui-list-item-over");
        	},function(){
        		$(this).removeClass("cui-list-item-over");
        	});
        	
        	var self = this;
        	jQuery(".cui-list-item",this.target).click(function(){
        		self.selected(this);
        	});
        },
        
        selected: function(item){
        	
        },
        
        show: function(){
        	jQuery(this.target).show();
        	this.state = true;
        },
        
        hide: function(){
        	jQuery(this.target).hide();
        	this.state = false;
        }
	});
})(jQuery.fn);