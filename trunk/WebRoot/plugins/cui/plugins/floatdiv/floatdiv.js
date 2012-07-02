(function(cuiPackage){
	/**
	 * @class CUI.FloatDiv
	 * @extends jQuery.fn.Div
	 * 浮动DIV组件
	 * @author cqb
	 * @version 2.0
	 * @demo ../test/floatdiv/index.html
	 */
	cuiPackage.Class("FloatDiv",cuiPackage.Object, {
		/**
         * 是否可以关闭
         * @type {Boolean}
         */
		closeable: true,
    	/**
         * 关闭按钮的位置只能是“left” or “right”
         * @type {String}
         */
		closeiconalign: "right",
		/**
         * 关闭按钮路径
         * @type {String}
         */
    	closeiconfile: null,
    	/**
         * 特效管理
         * @type {Object}
         */
    	animations: {},
    	/**
         * 特效时间
         * @type {Number}
         */
    	speed: 700,
    	/**
         * 浮动的层级
         * @type {Number}
         */
    	zindex: 10000,
    	/**
         * 标题
         * @type {String}
         */
    	title: null,
    	/**
         * 是否允许退拽
         * @type {Boolean}
         */
    	draggable: false,
    	/**
         * 是否允许大小可变
         * @type {Boolean}
         */
    	resizeable: false,
    	/**
         * 最小高度
         * @type {Number}
         */
		minHeight: 25,
		/**
         * 最小宽度
         * @type {Number}
         */
		minWidth: 200,
		/**
         * 组件状态
         * @type {Boolean}
         */
		contentready: false,
		/**
         * 是否为模态
         * @type {Boolean}
         */
		ismode: false,
		/**
         * 模态透明度
         * @type {Number}
         */
		shadowopacity: 0.7,
		/**
         * 内容
         * text: ""
         * url: 地址
         * @type {Object}
         */
		content: null,
		/**
         * 内容采用iframe
         * @type {Boolean}
         */
		framemode: false,
		/**
         * 组件浮动的位置
         * @type {String}
         */
		widgetalign: "center",
		/**
         * 浮动div的状态
         * @type {Boolean}
         */
		state: null,
		/**
         * 浮动的父框
         * @type {String}
         */
		containment: "parent",
		/**
         * 长度
         * @type {Number}
         */
		width: 400,
		/**
         * 宽度
         * @type {Number}
         */
		height: 200,
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
         * @description 浮动渲染div
         */
        _render: function(){
        	//添加样式类
        	$(this.target).addClass("cui-floatdiv");
        	
        	//检查浮动div的状态
        	this._checkState();
        	
        	//创建浮动div的结构
        	this._create();
        	
        	//设置大小
        	this._setSize();
        	
        	//设置位置
        	this._setPosition();
        	
        	//拖拽
        	this._setDraggable();
        	
        	//resize
        	this._setResizeable();
        	
        	//添加事件监听
        	this._listener();
        },
        
        /**
         * @private
         * @description 检查浮动div的状态
         */
        _checkState: function(){
        	//当前样式
        	this.state = $(this.target).css("display") == "none" ? false : true;
        },
        
        /**
         * @private
         * @description 创建浮动div的结构
         */
    	_create: function(){
    		var content = $(this.target).html();
    		$(this.target).empty().css("padding","");
    		//创建div
        	var floatdivcontent = $("<div>").addClass("cui-floatdiv-content");
    		var floatdivwrapper = $("<div>").addClass("cui-floatdiv-wrapper");
    		var floatdivtitle = $("<div>").addClass("cui-floatdiv-title");
    		var closeicon = $("<div>").addClass("cui-floatdiv-closeicon");
    		
    		$(this.target).css("zIndex",this.zindex);
    		$(this.target).append(floatdivwrapper);
    		floatdivwrapper.append(floatdivtitle);
    		floatdivwrapper.append(floatdivcontent);
    		if(this.title){
    			floatdivtitle.html(this.title);
    		}
    		floatdivcontent.html(content);
    		if(this.content){
    			this.setContent(this.content);
    		}
    		//如果设置了关闭选项
        	if(this.closeable){
        		//关闭按钮放左边
        		if(this.closeiconalign == "left"){
        			closeicon.addClass("cui-floatdiv-leftcloseicon");
        		}
        		floatdivwrapper.append(closeicon);
        	}
        	
        	//模态
        	if(this.ismode){
        		if(!$("#cui-floatdiv-mode").length){
	        		var floatdivmode = $("<div>").attr("id","cui-floatdiv-mode");
	        		$("body").append(floatdivmode);
	        		$("#cui-floatdiv-mode").css("zIndex",this.zindex-1)
	        				.css("opacity",this.shadowopacity);
        		}
        		//如果当前状态为隐藏
        		if(!this.state){
	        		$("#cui-floatdiv-mode").hide();
	        	}
        	}
    	},
    	
    	/**
         * @private
         * @description 设置大小
         */
    	_setSize: function(){
    		if(this.width){
    			$(this.target).width(this.width);
    		}
    		if(this.height && this.height != "auto"){
    			$(this.target).height(this.height);
    			var wrapper = $(".cui-floatdiv-wrapper",this.target);
    			var paddingborder = wrapper.outerHeight(true) - wrapper.height();
    			$(".cui-floatdiv-wrapper",this.target).height(this.height - paddingborder);
    			var titleh = $(".cui-floatdiv-title",this.target).outerHeight(true);
    			$(".cui-floatdiv-content",this.target).height(this.height-titleh - paddingborder);
    		}
    	},
    	
    	/**
         * @private
         * @description 设置位置
         */
    	_setPosition: function(){
    		if(this.widgetalign == "center"){
	    		//父节点
	        	var parent = this.containment != 'parent' ? $(this.target).parents(this.containment) : $(this.target).parent();
	        	//父节点长宽
	        	var parentw = parent.width();
	        	var parenth = parent.height();
	        	
	    		//如果父节点为body
	        	if(parent[0].tagName == "BODY"){
	        		parenth = cuiPackage.Util.getBodyDimensions().height;
	        	}
	        	//当前对象的长宽
	        	var width = $(this.target).width();
	        	var height = $(this.target).height();
	        	
    			$(this.target).css({
	        		left: (parentw-width)/2,
	        		top: (parenth-height)/2
	        	});
    		}
    	},
    	
    	/**
    	 * @private
         * @description 设置拖拽
         */
    	_setDraggable: function(){
    		var self = this;
    		if(this.draggable){
    			$(this.target).Draggable({
    				isdraggable: true,
        			handle:".cui-floatdiv-title",
        			containment: this.containment,
        			start: function(event){self.beforeDrag(event);},
        			stop: function(event, ui){self.afterDrag(event);}
        		});
    		}
    	},
    	
    	/**
    	 * @private
         * @description 设置resize
         */
    	_setResizeable: function(){
    		if(this.resizeable){
    			var self = this;
	    		$(this.target).resizable({
	       			alsoResize: '.cui-floatdiv-wrapper, .cui-floatdiv-content',
					minHeight: this.minHeight,
					minWidth: this.minWidth,
					stop: function(event, ui){
						self.afterResize(event);
					},
					start: function(event, ui){
						self.beforeResize(event);
					}
	       		});
	       	}
    	},
    	
    	/**
    	 * @private
         * @description 设置事件
         */
    	_listener: function(){
    		//关闭组件监听
        	if(this.closeable){
        		var self = this;
        		$(".cui-floatdiv-closeicon",this.target).click(function(){
        			cuiPackage.Animate.call(self, "doclose", []);
        			if(self.ismode){
		       			$("#cui-floatdiv-mode").hide();
		       		}
		       		self.state = false;
		       		self.close();
        		});
        	}
    	},
    	
    	/**
         * @description 关闭浮动div回调函数
         */
    	close: function(){
    		
    	},
    	
    	/**
         * @description 显示
         */
    	show: function(){
    		cuiPackage.Animate.call(this, "doshow", []);
       		this.state = true;
       		this.aftershow();
    	},
    	
    	hide: function(){
    		cuiPackage.Animate.call(this, "doclose", []);
    		this.state = false;
    		this.close();
    	},
    	
    	/**
         * @description 显示后回调函数
         */
    	aftershow: function(){
    		
    	},
    	
    	/**
         * @description 拖拽之前
         * @param {Object} event 事件
         */
    	beforeDrag: function(event){
    		
    	},
    	
    	/**
         * @description 拖拽之后
         * @param {Object} event 事件
         */
    	afterDrag: function(event){
    		
    	},
    	
    	/**
         * @description Resize之前
         * @param {Object} event 事件
         */
    	beforeResize: function(event){
    		
    	},
    	
    	/**
         * @description Resize之后
         * @param {Object} event 事件
         */
    	afterResize: function(event){
    		
    	},
    	/**
         * @description 设置大小
         * @param {Number} width 长度
         * @param {Number} height 宽度
         */
    	setSize: function(width, height){
    		if(width){
    			$(this.target).width(width);
    		}
    		if(height){
    			$(this.target).height(height);
    			var wrapper = $(".cui-floatdiv-wrapper",this.target);
    			var paddingborder = wrapper.outerHeight(true) - wrapper.height();
    			$(".cui-floatdiv-wrapper",this.target).height(height-paddingborder);
    			var titleh = $(".cui-floatdiv-title",this.target).outerHeight(true);
    			$(".cui-floatdiv-content",this.target).height(height-titleh-paddingborder);
    		}
    	},
    	
    	/**
         * @description 设置标题
         * @param {String} title 标题
         */
    	setTitle: function(title){
    		$(".cui-floatdiv-title", this.target).eq(0).html(title);
    	},
    	
    	/**
         * @description 设置内容
         * @param {String} content 内容
         */
    	setContent: function(options, callback){
    		if(typeof(options) == "object"){
    			if(options.text){
    				$(".cui-floatdiv-content", this.target).eq(0).html(options.text);
    				if(callback){
    					callback(this);
    				}
    			}
    			if(options.url){
    				if(!this.framemode){
	    				var self = this;
	    				$(".cui-floatdiv-content", this.target).eq(0).load(options.url,function(){
	    					callback(self);
	    				});
    				}else{
    					$(".cui-floatdiv-content", this.target).eq(0).empty()
    						.append("<iframe class='.cui-floatdiv-iframe' width='100%' height='100%' frameBorder='no' src='"+options.url+"'></iframe>");
    				}
    			}
    		}
    	},
    	
    	/**
         * @description 定位
         * @param {Json} options 样式对象
         */
    	setPosition: function(options){
    		if(typeof(options) != "object"){
    			throw new Error("参数必须是一个JSON对象");
    		}else{
    			$(this.target).css(options);
    		}
    	},
    	
    	/**
         * @description 销毁
         */
    	destroy: function(){
    		$(".cui-floatdiv-closeicon",this.target).unbind();
    		cuiPackage.Object.prototype.destroy.apply(this,arguments);
    		$(this.target).removeData("Draggable");
    	}
	});
	cuiPackage.Animate.add(cuiPackage.FloatDiv,"nomalhide",{
		doclose: function(){
			$(this.target).hide();
		}
	});
	
	cuiPackage.Animate.add(cuiPackage.FloatDiv,"fadehide",{
		doclose: function(){
			if(this.ismode){
       			$("#cui-floatdiv-mode").fadeOut(this.speed);
       		}
			$(this.target).fadeOut(this.speed);
		},
		doshow: function(){
			if(this.ismode){
       			$("#cui-floatdiv-mode").fadeIn(this.speed);
       		}
       		$(this.target).fadeIn(this.speed);
		}
	});
})(jQuery.fn);