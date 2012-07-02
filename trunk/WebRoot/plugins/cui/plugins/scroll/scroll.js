(function(cuiPackage){
	/**
	 * @class jQuery.fn.Scroll
	 * @extends jQuery.fn.Object
	 * 滚动条
	 * @author cqb
	 * @version 2.0
	 * @demo ../test/scroll/index.html
	 */
	cuiPackage.Class("Scroll",cuiPackage.Object, {
		/**
         * how many pixels must the mouswheel scroll at a time.
         * @type {Number}
         */
		wheelstep: 40,
		/**
         * enable or disable the mousewheel;
         * @type {Boolean}
         */
		scroll: true,
		/**
         * set the size of the scrollbar to auto or a fixed number.
         * @type {String/Number}
         */
		ysize: 'auto',
		/**
         * x轴方向长度
         * @type {String/Number}
         */
		xsize: 'auto',
		/**
         * set the size of the thumb to auto or a fixed number.
         * @type {String/Number}
         */
		ysizethumb: 'auto',
		/**
         * x轴方向滑块长度
         * @type {String/Number}
         */
		xsizethumb: 'auto',
		/**
         * 一起随着滚动的对象
         * @type {String/Object}
         */
        alsoscroll: null,
		/**
         * @private
         * @description 设置参数信息
         * @param {Object} options 参数
         */
        _initialize : function(options){
        	cuiPackage.Object.prototype._initialize.apply(this,arguments);

        	this._render();
        },
        
        /**
         * @private
         * @description 渲染滚动条
         */
        _render: function(){
        	//创建
        	this._create();
        	
        	//刷新
        	this.update();
        	
        	//设置大小
        	this._setSize();
        	
        	//添加事件
        	this._listener();
        },
        
        /**
         * @private
         * @description 创建
         */
        _create: function(){
        	$(this.target).addClass("cui-scroll");
        	var html = $(this.target).html();
        	$(this.target).empty();
        	
        	//ybar
        	var yscrollbar = $("<div>").addClass("cui-scroll-bar");
        	var track = $("<div>").addClass("cui-scroll-track");
        	var thumb = $("<div>").addClass("cui-scroll-thumb");
        	var end = $("<div>").addClass("cui-scroll-end");
        	
        	$(this.target).append(yscrollbar);
        	yscrollbar.append(track);
        	track.append(thumb);
        	thumb.append(end);
        	
        	//content
        	var viewport = $("<div>").addClass("cui-scroll-viewport").width("100%").height("100%");
        	var content = $("<div>").addClass("cui-scroll-content");
        	$(this.target).append(viewport);
        	viewport.append(content);
        	
        	content.html(html);
        	
        	//xbar
        	var xscrollbar = yscrollbar.clone().addClass("cui-scroll-bar-x");
        	$(this.target).append(xscrollbar);
        	yscrollbar.addClass("cui-scroll-bar-y");
        	
        	content.css({
        		"padding-left": $(this.target).css("padding-left"),
        		"padding-right": $(this.target).css("padding-right"),
        		"padding-top": $(this.target).css("padding-top"),
        		"padding-bottom": $(this.target).css("padding-bottom")
        	});
        	
        	this.target.style.padding = "0px";
        },
        
        /**
         * @description 更新
         */
        update: function(sScroll){
        	//设置长宽
        	var w = $(this.target).width();
        	var h = $(this.target).height();
        	
        	this.oViewport = { obj: $('.cui-scroll-viewport', this.target) };
			this.oContent = { obj: $('.cui-scroll-content', this.target) };
			this.yoScrollbar = { obj: $('.cui-scroll-bar-y', this.target) };
			this.xoScrollbar = { obj: $('.cui-scroll-bar-x', this.target) };
			this._getOffsetSize();
			
			if(this.oViewport["y"] / this.oContent["y"] < 1){
				var barw = this.yoScrollbar.obj.width();
				w = w - barw;
				this.oViewport.obj.width(w);
				this._getOffsetSize();
			}else{
				this.yoScrollbar.obj.hide();
			}
			
			if(this.oViewport["x"] / this.oContent["x"] < 1){
				var barh = this.xoScrollbar.obj.show().height();
				h = h - barh;
				this.oViewport.obj.height(h);
				this._getOffsetSize();
			}
			
			if((this.oViewport["y"] / this.oContent["y"] < 1) && (this.oViewport["x"] / this.oContent["x"] < 1)){
				this.yoScrollbar.obj.height(h);
				this.xoScrollbar.obj.width(w);
			}
        	
        	//设置长宽 end
        	
			this.yoTrack = { obj: $('.cui-scroll-track', this.yoScrollbar.obj) };
			this.yoThumb = { obj: $('.cui-scroll-thumb', this.yoTrack.obj) };
			this.xoTrack = { obj: $('.cui-scroll-track', this.xoScrollbar.obj) };
			this.xoThumb = { obj: $('.cui-scroll-thumb', this.xoTrack.obj) };
			this._ycaculate(sScroll);
			this._xcaculate(sScroll);
        },
        
        /**
         * @private
         * @description 获取内容和容器的大小 当自身或者父节点隐藏的时候也可以获取
         */
        _getOffsetSize: function(){
        	//隐藏对象 只能是空或在自身以及父节点
        	var hiddenobj = $(this.target).css("display") == "none" ? this.target : null;
        	$(this.target).parents().each(function(index){
        		if($(this).css("display") == "none"){
        			hiddenobj = this;
        		}
        	});
			//如果有隐藏的对象先显示算出大小后再隐藏
        	if(hiddenobj){
				$(hiddenobj).show();
				this.oViewport["y"] = this.oViewport.obj[0]['offsetHeight'];
				this.oContent["y"] = this.oContent.obj[0]['scrollHeight'];
				this.oViewport["x"] = this.oViewport.obj[0]['offsetWidth'];
				this.oContent["x"] = this.oContent.obj[0]['scrollWidth'];
				$(hiddenobj).hide();
			}else{
				this.oViewport["y"] = this.oViewport.obj[0]['offsetHeight'];
				this.oContent["y"] = this.oContent.obj[0]['scrollHeight'];
				this.oViewport["x"] = this.oViewport.obj[0]['offsetWidth'];
				this.oContent["x"] = this.oContent.obj[0]['scrollWidth'];
			}
        },
        
        /**
         * @private
         * @description 设置y方向的滚动条的一些参数
         */
        _ycaculate: function(sScroll){
        	this.ysDirection = 'top'; var sSize = 'Height';
        	this.yiScroll, this.yiPosition = { start: 0, now: 0 }, this.yiMouse = {};
			this.oContent.yratio = this.oViewport["y"] / this.oContent["y"];
			this.yoScrollbar.obj.toggleClass('cui-scroll-disable', this.oContent.ratio >= 1);
			this.yoTrack["y"] = this.ysize == 'auto' ? this.oViewport["y"] : this.ysize;
			this.yoThumb["y"] = Math.min(this.yoTrack["y"], Math.max(0, ( this.ysizethumb == 'auto' ? (this.yoTrack["y"] * this.oContent.yratio) : this.ysizethumb )));
			this.yoScrollbar.ratio = this.ysizethumb == 'auto' ? (this.oContent["y"] / this.yoTrack["y"]) : (this.oContent["y"] - this.oViewport["y"]) / (this.yoTrack["y"] - this.yoThumb["y"]);
			this.yiScroll = (sScroll == 'relative' && this.oContent.yratio <= 1) ? Math.min((this.oContent["y"] - this.oViewport["y"]), Math.max(0, this.yiScroll)) : 0;
			this.yiScroll = (sScroll == 'bottom' && this.oContent.yratio <= 1) ? (this.oContent["y"] - this.oViewport["y"]) : isNaN(parseInt(sScroll)) ? this.yiScroll : parseInt(sScroll);
			
        },
        
        /**
         * @private
         * @description 设置x方向的滚动条的一些参数
         */
         _xcaculate: function(sScroll){
        	this.xsDirection = 'left'; var sSize = 'Width';
        	this.xiScroll, this.xiPosition = { start: 0, now: 0 }, this.xiMouse = {};
			this.oContent.xratio = this.oViewport["x"] / this.oContent["x"];
			this.xoScrollbar.obj.toggleClass('cui-scroll-disable', this.oContent.ratio >= 1);
			this.xoTrack["x"] = this.xsize == 'auto' ? this.oViewport["x"] : this.xsize;
			this.xoThumb["x"] = Math.min(this.xoTrack["x"], Math.max(0, ( this.xsizethumb == 'auto' ? (this.xoTrack["x"] * this.oContent.xratio) : this.xsizethumb )));
			this.xoScrollbar.ratio = this.xsizethumb == 'auto' ? (this.oContent["x"] / this.xoTrack["x"]) : (this.oContent["x"] - this.oViewport["x"]) / (this.xoTrack["x"] - this.xoThumb["x"]);
			this.xiScroll = (sScroll == 'relative' && this.oContent.xratio <= 1) ? Math.min((this.oContent["x"] - this.oViewport["x"]), Math.max(0, this.xiScroll)) : 0;
			this.xiScroll = (sScroll == 'bottom' && this.oContent.xratio <= 1) ? (this.oContent["x"] - this.oViewport["x"]) : isNaN(parseInt(sScroll)) ? this.xiScroll : parseInt(sScroll);
        },
        
        /**
         * @private
         * @description 设置大小
         */
        _setSize: function(){
        	//y
        	this.yoThumb.obj.css(this.ysDirection, this.yiScroll / this.yoScrollbar.ratio);
			this.oContent.obj.css(this.ysDirection, -this.yiScroll);
			this.yiMouse['start'] = this.yoThumb.obj.offset()[this.ysDirection];
			var sCssSize = "height";
			this.yoTrack.obj.css(sCssSize, this.yoTrack["y"]);
			this.yoThumb.obj.css(sCssSize, this.yoThumb["y"]);
			
			//x
			this.xoThumb.obj.css(this.xsDirection, this.xiScroll / this.xoScrollbar.ratio);
			this.oContent.obj.css(this.xsDirection, -this.xiScroll);
			this.xiMouse['start'] = this.xoThumb.obj.offset()[this.xsDirection];
			var sCssSize = "width"; 
			this.xoTrack.obj.css(sCssSize, this.xoTrack["x"]);
			this.xoThumb.obj.css(sCssSize, this.xoThumb["x"]);
        },
        
        /**
         * @private
         * @description 添加事件
         */
        _listener: function(){
        	if(this.alsoscroll){
				this.alsoscroll = typeof(this.alsoscroll) == "string" ? $(this.alsoscroll) : this.alsoscroll;
				var originaltop = this.alsoscroll.css("top");
				var originalleft = this.alsoscroll.css("left");
				if(this.alsoscroll.css("position") == "static"){
					this.alsoscroll.css("position", "absolute");
					originaltop = this.alsoscroll.offset().top;
					originalleft = this.alsoscroll.offset().left;
					this.alsoscroll.css({
						left: originalleft,
						top: originaltop
					});
				}
				this.alsoscroll.data("originaltop",originaltop);
				this.alsoscroll.data("originalleft",originalleft);
			}
        	var self = this;
        	//y
        	this.yoThumb.obj.bind('mousedown', function(event){self.start(event, "y")});
        	this.yoTrack.obj.bind('mouseup', function(event){self.drag(event, "y")});
        	
        	if(this.scroll && window.addEventListener){
				this.target.addEventListener('DOMMouseScroll', function(event){self.wheel(event)}, false);
				this.target.addEventListener('mousewheel', function(event){self.wheel(event)}, false );
			}
			else if(this.scroll){this.target.onmousewheel = function(event){self.wheel(event)};}
			
			//x
			this.xoThumb.obj.bind('mousedown', function(event){self.start(event, "x")});
        	this.xoTrack.obj.bind('mouseup', function(event){self.drag(event, "x")});
        },
        
        /**
         * @private
         * @description 开始滚动
         * @param {Object} oEvent 鼠标事件
         * @param {String} sAxis 滚动条方向 “y” 竖直方向 、 “x” 横向
         */
        start: function(oEvent, sAxis){
        	var self = this;
        	if(sAxis == "y"){
				this.yiMouse.start = oEvent.pageY;
				var oThumbDir = parseInt(this.yoThumb.obj.css(this.ysDirection));
				this.yiPosition.start = oThumbDir == 'auto' ? 0 : oThumbDir;
				$(document).bind('mousemove', function(event){self.drag(event,"y")});
				
				$(document).bind('mouseup', function(event){self.end(event)});
				this.yoThumb.obj.bind('mouseup', function(event){self.end(event)});
			}else{
				this.xiMouse.start = oEvent.pageX;
				var oThumbDir = parseInt(this.xoThumb.obj.css(this.xsDirection));
				this.xiPosition.start = oThumbDir == 'auto' ? 0 : oThumbDir;
				$(document).bind('mousemove', function(event){self.drag(event,"x")});
				
				$(document).bind('mouseup', function(event){self.end(event)});
				this.xoThumb.obj.bind('mouseup', function(event){self.end(event)});
			}
			return false;
		},
		
		/**
         * @private
         * @description 鼠标滚轮滚动
         * @param {Object} oEvent 鼠标事件
         */
		wheel: function(oEvent){
			if(!(this.oContent.yratio >= 1)){
				var oEvent = oEvent || window.event;
				var iDelta = oEvent.wheelDelta ? oEvent.wheelDelta/120 : -oEvent.detail/3;
				this.yiScroll -= iDelta * this.wheelstep;
				
				this.yiScroll = Math.min((this.oContent["y"] - this.oViewport["y"]), Math.max(0, this.yiScroll));
				this.yoThumb.obj.css(this.ysDirection, this.yiScroll / this.yoScrollbar.ratio);
				this.oContent.obj.css(this.ysDirection, -this.yiScroll);
				if(this.alsoscroll){
					var originaltop = this.alsoscroll.data("originaltop");
					this.alsoscroll.css(this.ysDirection, originaltop-this.yiScroll);
				}
				this.afterscroll(this.yiScroll);
				oEvent = $.event.fix(oEvent);
				oEvent.preventDefault();
			};
		},
		
		/**
         * @description 结束滚动后的回调函数
         * @param {Number} offset 滚动的距离
         */
		afterscroll: function(offset){
			
		},
		
		/**
         * @private
         * @description 结束滚动
         * @param {Object} oEvent 鼠标事件
         */
		end: function(oEvent){
			var self = this;
			$(document).unbind('mousemove');
			$(document).unbind('mouseup');
			this.yoThumb.obj.unbind('mouseup');
			this.xoThumb.obj.unbind('mouseup');
			return false;
		},
		
		/**
         * @private
         * @description 拖拽滚动
         * @param {Object} oEvent 鼠标事件
         * @param {String} sAxis 滚动条方向 “y” 竖直方向 、 “x” 横向
         */
		drag: function(oEvent, sAxis){
			if(sAxis=="y" && !(this.oContent.yratio >= 1)){
				this.yiPosition.now = Math.min((this.yoTrack["y"] - this.yoThumb["y"]), Math.max(0, (this.yiPosition.start + (oEvent.pageY - this.yiMouse.start))));
				this.yiScroll = this.yiPosition.now * this.yoScrollbar.ratio;
				this.oContent.obj.css(this.ysDirection, -this.yiScroll);
				this.yoThumb.obj.css(this.ysDirection, this.yiPosition.now);
				if(this.alsoscroll){
					var originaltop = this.alsoscroll.data("originaltop");
					this.alsoscroll.css(this.ysDirection, originaltop-this.yiScroll);
				}
				this.afterscroll(this.yiScroll);
			}else if(sAxis=="x" && !(this.oContent.xratio >= 1)){
				this.xiPosition.now = Math.min((this.xoTrack["x"] - this.xoThumb["x"]), Math.max(0, (this.xiPosition.start + (oEvent.pageX - this.xiMouse.start))));
				this.xiScroll = this.xiPosition.now * this.xoScrollbar.ratio;
				this.oContent.obj.css(this.xsDirection, -this.xiScroll);
				this.xoThumb.obj.css(this.xsDirection, this.xiPosition.now);
				if(this.alsoscroll){
					var originalleft = this.alsoscroll.data("originalleft");
					this.alsoscroll.css(this.xsDirection, originalleft-this.xiScroll);
				}
				this.afterscroll(this.xiScroll);
			}
			return false;
		}
	});
	
})(jQuery.fn);