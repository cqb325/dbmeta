(function(cuiPackage){
	/**
	 * @class jQuery.fn.Panel
	 * @extends jQuery.fn.Object
	 * 面板
	 * @author cqb
	 * @version 2.0
	 * @demo ../example/panel/index.html
	 */
	cuiPackage.Class("Panel",cuiPackage.Object, {
		/**
		 * 标题
		 * @type {String}
		 */
		title: null,
		/**
		 * 工具栏
		 * @type {Array}
		 */
		tbar: null,
		/**
		 * 长度
		 * @type {Number}
		 */
		width: null,
		/**
		 * 宽度
		 * @type {Number}
		 */
		height: null,
		/**
		 * 锚定位类型
		 * @type {String}
		 */
		anchor: "left",
		/**
		 * 容器对象
		 * @type {Object}
		 */
		container: null,
		/**
		 * 样式类
		 * @type {String}
		 */
		css_class: "cui-panel-default",
		/**
         * @private
         * @description 设置参数信息
         * @param {options} 参数
         */
        _initialize : function(options){
        	cuiPackage.Object.prototype._initialize.apply(this,arguments);
        	
        	//浮动渲染div
        	this._render();
        },
        
        /**
         * @private
         * @description 渲染panel
         */
        _render: function(){
        	//创建
        	this._create();
        	//锚定位
        	this._doanchor();
        	//设置大小或位置
        	this._setSize();
        },
        
        /**
         * @private
         * @description 创建
         */
        _create: function(){
        	$(this.target).addClass("cui-panel");
        	var panelwrapper = jQuery("<div>").addClass("cui-panel-wrapper");
        	var paneltitle = null;
        	if(this.title){
        		paneltitle = jQuery("<div>").addClass("cui-panel-title");
        		var textc = jQuery("<div>").addClass("cui-panel-title-text");
        		paneltitle.append(textc);
        		textc.html(this.title);
        		paneltitle.css({
        			width: "100%"
        		});
        	}
        	var paneltbar = null;
        	if(this.tbar){
        		paneltbar = jQuery("<div>").addClass("cui-panel-toolbar");
        		for(var i in this.tbar){
        			var button = this.tbar[i];
        			var menuitem = new cuiPackage.MenuItem(button);
        			paneltbar.append(menuitem.item);
        		}
        	}
        	jQuery(this.target).wrap(panelwrapper);
        	if(paneltitle){
        		jQuery(this.target).before(paneltitle);
        	}
        	if(paneltbar){
        		jQuery(this.target).before(paneltbar);
        	}
        	this.container = jQuery(this.target).parent(".cui-panel-wrapper");
        	this.container.css({
        		margin: "0px"
        	});
        	if(this.css_class){
        		this.container.addClass(this.css_class);
        	}
        },
        
        /**
         * @private
         * @description 锚定位
         */
        _doanchor: function(){
        	var parent = jQuery(this.container).parent()[0];
        	
        	if(parent.lastleft == undefined){
        		parent.lastleft = parent.lastright = parent.lasttop = parent.lastbottom = 0;
        	}
        	var css = {};
        	if(this.anchor){
        		css.position = "absolute";
        	}
        	switch(this.anchor){
        		case "left":{
        			css.left = parent.lastleft+"px";
        			css.top = parent.lasttop+"px";
        			css.bottom = parent.lastbottom+"px";
        			this.width ? css.width = this.width : "";
        			css.height = "";
        			var width = this.width ? parseFloat(this.width) : this.container.width();
        			var borderw = this._getBorderW(this.container);
        			parent.lastleft += width + borderw;
        			break;
        		}
        		case "top":{
        			css.top = parent.lasttop+"px";
        			css.left = parent.lastleft+"px";
        			css.right = parent.lastright+"px";
        			css.width = "";
        			this.height ? css.height = this.height : "";
        			var height = this.height ? parseFloat(this.height) : this.container.height();
        			var borderh = this._getBorderH(this.container);
        			parent.lasttop += height + borderh;
        			break;
        		}
        		case "right":{
        			css.top = parent.lasttop+"px";
        			css.right = parent.lastright+"px";
        			css.bottom = parent.lastbottom+"px";
        			this.width ? css.width = this.width : "";
        			css.height = "";
        			var width = this.width ? parseFloat(this.width) : this.container.width();
        			var borderw = this._getBorderW(this.container);
        			parent.lastright += width + borderw;
        			break;
        		}
        		case "bottom":{
        			css.bottom = parent.lastbottom+"px";
        			css.left = parent.lastleft+"px";
        			css.right = parent.lastright+"px";
        			css.width = "";
        			this.height ? css.height = this.height : "";
        			var height = this.height ? parseFloat(this.height) : this.container.height();
        			var borderh = this._getBorderH(this.container);
        			parent.lastbottom += height + borderh;
        			break;
        		}
        		case "client":{
        			css.bottom = parent.lastbottom+"px";
        			css.top = parent.lasttop+"px";
        			css.left = parent.lastleft+"px";
        			css.right = parent.lastright+"px";
        			css.width = "";
        			css.height= "";
        			break;
        		}
        		default: {
        			this.width ? css.width = this.width : "";
        			this.height ? css.height = this.height : "";
        		}
        	}
        	
        	this.container.css(css);
        },
        
        /**
         * @private
         * @description 设置大小
         */
        _setSize: function(){
        	var titleh = 0;
        	var tbarh = 0;
        	if(this.title){
        		titleh = jQuery(".cui-panel-title", this.container).outerHeight(true);
        	}
        	if(this.tbar){
        		tbarh = jQuery(".cui-panel-toolbar", this.container).outerHeight(true);
        	}
        	jQuery(this.target).css({
        		position: "absolute",
        		top: titleh + tbarh + parseFloat(jQuery(this.container).css("padding-top")),
        		bottom: jQuery(this.container).css("padding-bottom"),
        		left: jQuery(this.container).css("padding-left"),
        		right: jQuery(this.container).css("padding-right"),
        		margin: "0px"
        	});
        },
        
        /**
         * @private
         * @description 获取边宽度
         */
        _getBorderW: function(obj){
        	return parseFloat(obj.css("border-left-width")) +  parseFloat(obj.css("border-right-width"));
        },
        
        /**
         * @private
         * @description 获取边高度
         */
        _getBorderH: function(obj){
        	return parseFloat(obj.css("border-top-width")) + parseFloat(obj.css("border-bottom-width"));
        },
        
        /**
         * @description Resize事件回调
         * @param {Obj} 自身对象
         */
        resize: function(obj){
			return false;
		},
		
		/**
         * @description 销毁
         */
		destroy: function(){
			var original = jQuery(this.target).data("original");
			this.container.before(original);
			original = null;
			var target = this.container.remove();
			target = null;
			jQuery(this.target).removeData(this.CLASS_NAME);
		},
		
		/**
         * @description 显示
         */
		show: function(){
			this.container.show();
		},
		
		/**
         * @description 隐藏
         */
		hide: function(){
			this.container.hide();
		}
	});
})(jQuery.fn);