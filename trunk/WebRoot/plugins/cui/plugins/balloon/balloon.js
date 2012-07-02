(function(cuiPackage){
	/**
	 * @class jQuery.fn.Balloon
	 * @extends jQuery.fn.Object
	 * 气泡
	 * @author cqb
	 * @version 2.0
	 * @demo ../example/balloon/index.html
	 */
	cuiPackage.Class("Balloon",cuiPackage.Object, {
		/**
         * 气泡圆角数组如：radius[5,5,5,5]
         * @type {Array}
         */
		radius: null,
		/**
         * 是否有阴影
         * @type {Boolean}
         */
		hasshadow: false,
		/**
         * 触发类型
         * @type {String}
         */
		triggertype: "hover",
		/**
         * 容器
         * @type {String}
         */
		containment: "body",
		/**
         * 容器
         * @type {String}
         */
		targetalign: "top-center",
		/**
         * 容器
         * @type {String}
         */
		balloonalign: "bottom",
		/**
         * 特效管理
         * @type {Object}
         */
    	animations: {},
		/**
         * 最大长度
         * @type {Number}
         */
		maxwidth: 200,
		/**
         * 是否有标题
         * @type {Boolean}
         */
		hastitle: true,
		/**
         * 气泡阴影参数
         * color: 阴影颜色
         * opacity： 阴影透明度
         * offsetx：阴影x轴偏移量
         * offsety：阴影y轴偏移量
         * blur：阴影淡化系数
         * @type {JSON}
         */
		shadow: {
			color: '#000',
			opacity: 1,
			offsetx: 0,
			offsety: 0,
			blur: 3
		},
		/**
		 * 边框粗细
		 * @type {Number}
		 */
		borderWidth: 5,
		/**
		 * 边框颜色
		 * @type {String}
		 */
		borderColor: '#000',
		/**
		 * 边框透明度
		 * @type {Number}
		 */
		borderopacity: 1,
		/**
		 * 箭头宽度
		 * @type {Number}
		 */
		spikew: 15,
		/**
		 * 箭头高度
		 * @type {Number}
		 */
		spikeh: 10,
		/**
		 * 箭头偏移量系数(0-1)
		 * @type {Number}
		 */
		spikeratio: 0.5,
		/**
		 * 箭头偏移量{x:20,y:0}
		 * @type {Object}
		 */
		spikeoffset: null,
		/**
		 * 气泡宽度
		 * @type {Number}
		 */
		width: null,
		/**
		 * 气泡高度
		 * @type {Number}
		 */
		height: null,
		/**
		 * 气泡背景
		 * color: 背景颜色
		 * 			为String#xxxxxx;
		 * 			为数组[{position: 0, color: '#f6fbfd'},{position: 1, color: '#f6fbfd'}]
		 * opacity：背景透明度
		 * @type {Object}
		 */
		background: {
      		color: [
	        { position: 0, color: '#f6fbfd'},
	        { position: 0.1, color: '#fff' },
	        { position: .48, color: '#fff'},
	        { position: .5, color: '#fefffe'},
	        { position: .52, color: '#f7fbf9'},
	        { position: .8, color: '#edeff0' },
	        { position: 1, color: '#e2edf4' }
      		],
      		opacity: 1
    	},
		/**
		 * 气泡填充样式
		 * @type {String/Object}
		 */
    	fillstyle: null,
		/**
		 * 气泡淡出时间
		 * @type {Number}
		 */
    	fadeIn: 500,
		/**
		 * 气泡淡入时间
		 * @type {Number}
		 */
   		fadeOut: 700,
		/**
		 * 气泡标题
		 * @type {String}
		 */
    	title: '标题',
		/**
		 * 气泡内容
		 * @type {String}
		 */
    	content: '',
		/**
		 * 画布页面元素
		 * @type {DOM}
		 */
    	canvasdom: null,
		/**
		 * 画布上下文
		 * @type {Object}
		 */
    	ctx: null,
		/**
		 * 画布开始绘制的x横向位置
		 * @type {Number}
		 */
    	x: 2,
		/**
		 * 画布开始绘制的y纵向位置
		 * @type {Number}
		 */
    	y: 2,
		/**
		 * 画布绘制的长度
		 * @type {Number}
		 */
    	draww: null,
		/**
		 * 画布绘制的宽度
		 * @type {Number}
		 */
    	drawh: null,
		/**
		 * 气泡容器
		 * @type {DOM}
		 */
    	balloonwrap: null,
		/**
		 * 气泡的状态 
		 * true：显示
		 * false：隐藏
		 * @type {Boolean}
		 */
    	state: true,
		/**
		 * 气泡的皮肤
		 * 目前有10中默认的皮肤black/cloud/dark/facebook/lavender/lime/liquid/blue/salmon/yellow
		 * @type {String}
		 */
    	skin: 'base',
		/**
         * @description 设置参数信息
         * @private
         * @param {target} 调用该方法的DOM对象
         * @param {options} 参数
         */
        _initialize : function(options){
        	this._getSkin(options);
        	cuiPackage.Object.prototype._initialize.apply(this,arguments);
        	//渲染
        	this._render();
        },
		
		/**
         * @description 获取皮肤
         * @private
         * @param {options} 参数
         */
        _getSkin: function(options){
        	if(options.skin && options.skin != ""){
	        	var skin = cuiPackage.Balloon.Skins[options.skin];
	        	jQuery.extend(this, skin);
        	}
        },
        
        /**
         * @description 渲染气泡
         * @private
         * @param {DOM} target调用该方法的DOM对象
         */
        _render: function(){
        	var ballooncreated = jQuery(this.target).data("ballooncreated");
        	if(!ballooncreated){
	        	//创建
	        	this._create();
	        	//添加标题内容
	        	this.setTitle(this.title);
	        	this.setContent(this.content);
	        	//设置大小
	        	this._setSize();
	        	//初始化画布
	        	this._initCanvas();
	        	//绘画气泡
	        	this._drawBalloon();
	        	
	        	this._listeners();
        		$(this.target).data("ballooncreated",true);
				if (this.triggertype != "create") {
					this.balloonwrap.hide();
				}
	        }
        },
        
        /**
         * @description 设置气泡的结构
         * @private
         * @param {target} 调用该方法的DOM对象
         */
        _create: function(){
        	var balloonwrap = $("<div>").addClass("cui-balloon_wrap");
        	this.balloonwrap = balloonwrap;
        	
        	var ballooncontent = $("<div>").addClass("cui-balloon_content");
        	var canvas = $("<canvas>").addClass("cui-balloon_canvas");
        	this.canvasdom = canvas[0];
        	balloonwrap.append(canvas);
        	balloonwrap.append(ballooncontent);
        	
        	if(this.hastitle){
	        	var balloontitle = $("<div>").addClass("cui-balloon_title");
	        	var balloontitle_text = $("<span>").addClass("cui-balloon_title_text");
	        	var ballooncloseicon = $("<div>").addClass("cui-balloon_closeicon");
	        	balloontitle.append(ballooncloseicon);
	        	balloontitle.append(balloontitle_text);
	        	ballooncontent.append(balloontitle);
        	}
        	
        	var balloonmain = $("<div>").addClass("cui-balloon_content_main");
        	ballooncontent.append(balloonmain);
        	
        	this.containment = this.containment ? jQuery(this.containment) : jQuery("body");
        	this.containment.append(balloonwrap);
        },
        
        /**
         * @private
         * @description 设置气泡的大小
         * @param {target} 调用该方法的DOM对象
         */
        _setSize: function(){
        	var contentdom = $(".cui-balloon_content");
        	var contentdompw = parseInt($(".cui-balloon_content").css("padding-left")) + parseInt($(".cui-balloon_content").css("padding-right"));
        	var contentdomph = parseInt($(".cui-balloon_content").css("padding-top")) + parseInt($(".cui-balloon_content").css("padding-bottom"));
        	
        	var width = contentdom.outerWidth(true);
        	var dw = this.width ? this.width : (width > this.maxwidth ? this.maxwidth : width);
        	
        	$(".cui-balloon_content").width(dw-this.borderWidth);
        	dw += this.borderWidth * 2 + contentdompw;
        	this.balloonwrap.width(dw);
        	
        	var height = contentdom.outerHeight(true);
        	var dh = this.height ? this.height : height;
        	dh += this.spikeh + this.borderWidth * 2 + contentdomph;
        	
        	this.width = dw;
        	this.height = dh;
        	
        	contentdom.css({
        		left: this.borderWidth,
				top: this.borderWidth        	
        	});
        	if(dw){
        		$(this.canvasdom).width(dw);
        		this.canvasdom.width = dw;
        	}
        	if(dh){
        		$(this.canvasdom).height(dh);
        		this.canvasdom.height = dh;
        	}
        	this.balloonwrap.height(dh);
        },
        
        /**
         * @description 设置标题
         * @param {title} 标题
         */
        setTitle: function(title){
        	this.balloonwrap.find(".cui-balloon_title_text").html(title);
        },
        
        /**
         * @description 设置内容
         * @param {content} 内容
         */
        setContent: function(content){
        	this.balloonwrap.find(".cui-balloon_content_main").html(content);
        },
        
        /**
         * @private
         * @description 初始化canvas以便后面在canvas中绘制
         */
        _initCanvas: function(){
        	if(this.canvasdom){
        		if($.browser.msie){
	        		if (typeof G_vmlCanvasManager != "undefined") {
					  G_vmlCanvasManager.initElement(this.canvasdom);
					}
				}
        		this.ctx = this.canvasdom.getContext("2d");
        	}
        },
        
        /**
         * @private
         * @description 绘制气泡
         */
        _drawBalloon: function(){
        	if(!this.radius){
        		this.radius = [0,0,0,0];
        	}
        	//保存
        	this.ctx.save();
        	//初始化阴影
        	if(this.hasshadow){
        		this._initShadow();
        	}
        	//绘制边框
        	this._drawBorder();
        	//还原状态
        	this.ctx.restore();
        	//保存
        	this.ctx.save();
        	//绘制内容
        	this._drawContent();
        },
        
        /**
         * @private
         * @description 初始化阴影设置
         */
        _initShadow: function(){
        	if(this.shadow){
				this.ctx.shadowOffsetX = this.shadow.offsetx;
				this.ctx.shadowOffsetY = this.shadow.offsety;
				this.ctx.shadowBlur = this.shadow.blur;
				var rgba = this._getRGBColor(this.shadow.color, this.shadow.opacity);
				this.ctx.shadowColor=rgba;
        	}
        },
        
        /**
         * @private
         * @description 初始化填充样式
         * @param {height} 内容区域的高度
         */
        _initFillStyle: function(height){
        	if(typeof this.background == "object"){
	        	var opacity = this.background.opacity;
	        	var colors = this.background.color;
        		if(colors && typeof(colors) == "string"){
        			var rgba = this._getRGBColor(colors, opacity);
        			return rgba;
        		}else{
		        	var gradient = this.ctx.createLinearGradient(0, 0, 0, height);
		        	for(var i in colors){
		        		var color = colors[i].color;
		        		var rgba = this._getRGBColor(color, opacity);
		        		gradient.addColorStop(colors[i].position,rgba);
		        	}
		        	return gradient;
		        }
        	}else{
        		return this.background;
        	}
        },
        
        /**
         * @private
         * @description 绘制气泡的边框
         */
        _drawBorder: function(){
        	this.draww = this.width;
        	this.drawh = this.height;
        	this.x = this.y = this.borderWidth/2;
        	this.draww = this.draww - this.x * 2 - this.borderWidth;
        	this.drawh = this.drawh - this.y * 2 - this.borderWidth - this.spikeh;
        	
        	//如果有阴影的话整个边框需错位
        	//边框的大小改变
        	if(this.hasshadow){
        		var offsetx = this.shadow.blur> Math.abs(this.shadow.offsetx)? this.shadow.blur: Math.abs(this.shadow.offsetx);
				var offsety = this.shadow.blur> Math.abs(this.shadow.offsety)? this.shadow.blur: Math.abs(this.shadow.offsety);
        		if(this.shadow.offsetx < 0){
        			this.x += offsetx;
        		}
        		if(this.shadow.offsety < 0){
					this.y += offsety;
				}
				//边框的大小改变
				this.draww -= offsetx;
				this.drawh -= offsety;
        	}
        	
        	var borderColor = this._getRGBColor(this.borderColor, this.borderopacity);
        	this._drawBalloonBorder(this.ctx, this.x, this.y, this.draww, this.drawh, this.radius, this.borderWidth, borderColor);
        },
        
        /**
         * @private
         * @description 绘制气泡的内部矩形
         */
        _drawContent: function(){
        	this.x += this.borderWidth/2;
			this.y += this.borderWidth/2;
			this.draww -= this.borderWidth;
			this.drawh -= this.borderWidth;
			
        	//初始化fillStyle
        	var fillstyle = this._initFillStyle(this.drawh);
        	
        	var self = this;
        	var timer = window.setTimeout(function(){
        		window.clearTimeout(timer);
	        	self._drawContentRect(self.ctx, self.x, self.y, self.draww, self.drawh, self.radius, fillstyle);
        	}, 100);
        },
        
        /**
         * @private
         * @description 获取十六进制颜色值的rgba形式的颜色值
         * @param {color} 十六进制颜色
         * @param {opacity} 颜色的透明度
         */
        _getRGBColor: function(color, opacity){
        	var rgb = [];
			var reg = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
			if (reg.test(color)) {
				var matched = color.match(reg);
				rgb.push(parseInt(matched[1], 16));
				rgb.push(parseInt(matched[2], 16));
				rgb.push(parseInt(matched[3], 16));
				if(opacity && opacity != ''){
					rgb.push(opacity);
					return "rgba(" + rgb.join(",") + ")";
				}else{
					return "rgb(" + rgb.join(",") + ")";
				}
			} 
			reg = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;
			if (reg.test(color)) {
				var matched = color.match(reg);
				rgb.push(parseInt(matched[1]+matched[1], 16));
				rgb.push(parseInt(matched[2]+matched[2], 16));
				rgb.push(parseInt(matched[3]+matched[3], 16));
				if(opacity && opacity != ''){
					rgb.push(opacity);
					return "rgba(" + rgb.join(",") + ")";
				}else{
					return "rgb(" + rgb.join(",") + ")";
				}
			}
        },
        
        /**
         * @private
         * @description 绘制气泡边框
         * @param {ctx} canvas上下文
         * @param {x} 开始的横坐标
         * @param {y} 开始的纵坐标
         * @param {width} 绘制的长度
         * @param {height} 绘制的宽度
         * @param {radius} 矩形的圆角
         * @param {borderWidth} 边框的粗细大小
         * @param {borderColor} 边框的颜色
         */
        _drawBalloonBorder: function(ctx, x, y, width, height, radius, borderWidth, borderColor){
        	//console.log(x + " : "+y);
        	//console.log(borderWidth + " : "+borderColor);
        	ctx.lineWidth = borderWidth;
			ctx.strokeStyle = borderColor;
			this._drawEnptyRoundedRect(ctx, x, y, width, height, radius);
			ctx.stroke();
        },
        
        /**
         * @private
         * @description 绘制气泡内容区域
         * @param {ctx} canvas上下文
         * @param {x} 开始的横坐标
         * @param {y} 开始的纵坐标
         * @param {width} 绘制的长度
         * @param {height} 绘制的宽度
         * @param {radius} 矩形的圆角
         * @param {fillStyle} 填充的样式
         */
        _drawContentRect: function(ctx, x, y, width, height, radius, fillStyle){
        	ctx.fillStyle = fillStyle;
			this._drawEnptyRoundedRect(ctx, x, y, width, height, radius);
			ctx.fill();
        },
        
        /**
         * @private
         * @description 绘制空的矩形
         * @param {ctx} canvas上下文
         * @param {x} 开始的横坐标
         * @param {y} 开始的纵坐标
         * @param {width} 绘制的长度
         * @param {height} 绘制的宽度
         * @param {radius} 矩形的圆角
         */
        _drawEnptyRoundedRect: function(ctx, x, y, width, height, radius){
        	ctx.beginPath();
			ctx.moveTo(x, y-this.borderWidth/2 + radius[0]);
			//左边
			ctx.lineTo(x, y + height - radius[1]);
			//左下角
			ctx.quadraticCurveTo(x, y + height, x + radius[1], y + height);
			
			if(this.spikeoffset){
				ctx.lineTo(x + width/2 + this.spikeoffset.x - this.spikew/2, y + height);
				ctx.lineTo(x + width/2 + this.spikeoffset.x, y + height+this.spikeh);
				ctx.lineTo(x + width/2 + this.spikeoffset.x + this.spikew/2, y + height);
			}else{
				ctx.lineTo(x + width*this.spikeratio - this.spikew/2, y + height);
				ctx.lineTo(x + width/2, y + height+this.spikeh);
				ctx.lineTo(x + width*this.spikeratio + this.spikew/2, y + height);
			}
			
			//下边
			ctx.lineTo(x + width - radius[2], y + height);
			//右下角
			ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius[2]);
			//右边
			ctx.lineTo(x + width, y + radius[3]);
			//右上角
			ctx.quadraticCurveTo(x + width, y, x + width - radius[3], y);
			//上边
			ctx.lineTo(x + radius[0], y);
			//左上角
			ctx.quadraticCurveTo(x, y, x, y + radius[0]);
        },
        
        /**
         * @private
         * @description 添加事件监听
         */
        _listeners: function(){
        	var self = this;
        	this.balloonwrap.find(".cui-balloon_closeicon").click(function(){
        		cuiPackage.Animate.call(self, "hide", []);
        	});
        	
        	var timer = null;
        	switch(this.triggertype){
        		case "hover":{
        			jQuery(this.target).hover(function(e){
		        		var x = this.offsetLeft;
		        		var y = this.offsetTop;
		        		timer = window.setTimeout(function(){
			        		cuiPackage.Animate.call(self, "show", []);
			        		self.setPosition(x,y);
		        		},300);
		        	},function(e){
		        		window.clearTimeout(timer);
		        		cuiPackage.Animate.call(self, "hide", []);
		        	});
		        	break;
        		}
        		case "click":{
        			jQuery(this.target).click(function(e){
		        		var x = this.offsetLeft;
		        		var y = this.offsetTop;
		        		cuiPackage.Animate.call(self, "show", []);
		        		self.setPosition(x,y);
		        	});
		        	break;
        		}
        	}
        },
        
        /**
         * @description 隐藏组件
         */
        hide: function(){
        	this.balloonwrap.fadeOut(this.fadeOut);
        	this.state = false;
        },
        
        /**
         * @description 显示组件
         */
        show: function(){
        	this.balloonwrap.fadeIn(this.fadeIn);
        	this.state = true;
        },
        
        /**
         * @description 隐藏组件回调函数
         */
        closed: function(){
        	
        },
        
        /**
         * @description 显示组件回调函数
         */
        opened: function(){
        	
        },
        
        /**
         * @description 获取气泡箭头的位置
         */
        getSpikeOffset: function(){
        	if(!this.spikeoffset){
        		return this.width/2;
        	}else{
        		return this.width/2 + this.spikeoffset.x;
        	}
        },
        
        /**
         * @description 销毁
         */
        destroy: function(){
        	this.balloonwrap.find(".cui-balloon_closeicon").unbind("click");
        	jQuery(this.target).removeData(this.CLASS_NAME);
        	jQuery(this.target).removeData("ballooncreated");
        	this.balloonwrap.remove();
        	this.width = null;
        	this.height = null;
        },
        
        /**
         * @description 设置气泡的位置
         * @param {Number} x 横坐标
         * @param {Number} y 纵坐标
         */
        setPosition: function(x, y){
        	var spikeOffset = this.getSpikeOffset();
        	x = x - spikeOffset;
        	var balloonh = this.height;
        	y = y - this.height;
        	this.balloonwrap.css({
        		left: x,
        		top: y
        	});
        }
	});
	
	/**
	 * 特效
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Animate.add(cuiPackage.Balloon,"fade",{
		hide: function(){
			var self = this;
			this.balloonwrap.fadeOut(this.fadeOut,function(){
				self.closed();
	        	self.state = false;
			});
		},
		show: function(){
			var self = this;
			this.balloonwrap.fadeIn(this.fadeIn,function(){
				self.opened();
	        	self.state = true;
			});
		}
	});
	/**
	 * @class CUI.Balloon.Skins
	 * @singleton
	 * 气泡的皮肤
	 * @author cqb
	 * @version 2.0
	 */
    cuiPackage.Balloon.Skins = {
		/**
		 * 黑色皮肤
		 */
    	'black': {
    		background: {
    			color: '#232323',
    			opacity: .9
    		},
     		borderWidth: 1,
     		borderColor: "#232323"
    	},
		
    	/**
		 * 云皮肤
		 */
    	'cloud': {
    		background: {
		      color: [
		        { position: 0, color: '#f6fbfd'},
		        { position: 0.1, color: '#fff' },
		        { position: .48, color: '#fff'},
		        { position: .5, color: '#fefffe'},
		        { position: .52, color: '#f7fbf9'},
		        { position: .8, color: '#edeff0' },
		        { position: 1, color: '#e2edf4' }
		      ],
		      opacity: 0.8
		    },
		    borderColor: "#bec6d5",
		    borderWidth: 5,
			radius: [5,5,5,5],
			borderopacity: 0.7
    	},
    	
		/**
		 * 暗色皮肤
		 */
    	'dark': {
    		borderColor: "#1f1f1f",
    		background: {
		      color: [
		        { position: .0, color: '#686766' },
		        { position: .48, color: '#3a3939' },
		        { position: .52, color: '#2e2d2d' },
		        { position: .54, color: '#2c2b2b' },
		        { position: 0.95, color: '#222' },
		        { position: 1, color: '#202020' }
		      ],
		      opacity: .75
		    },
		    radius: [3,3,3,3],
		    spikeratio: 0.55,
		    hasshadow: true,
		    shadow: {
		    	color: '#ccc',
				opacity: 0.5,
				offsetx: 3,
				offsety: 3,
				blur: 3
		    },
		    borderopacity: 0.8
    	},
    	
		/**
		 * facebook皮肤
		 */
    	'facebook': {
    		background: "#282828",
    		borderWidth: 0,
		    fadeIn: 500,
		    fadeOut: 700,
		    radius: [0,0,0,0]
    	},
    	
		/**
		 * 熏衣草皮肤
		 */
    	'lavender' : {
    		background: {
		      color: [
		        { position: .0, color: '#b2b6c5' },
		        { position: .5, color: '#9da2b4' },
		        { position: 1, color: '#7f85a0' }
		      ],
		      opacity: 0.8
		    },
		    borderWidth: 3,
		    borderColor: '#6b7290'
    	},
    	
		/**
		 * 石灰皮肤
		 */
    	'lime': {
    		background: {
		      color: [
		        { position: 0,   color: '#a5e07f' },
		        { position: .02, color: '#cef8be' },
		        { position: .09, color: '#7bc83f' },
		        { position: .35, color: '#77d228' },
		        { position: .65, color: '#85d219' },
		        { position: .8,  color: '#abe041' },
		        { position: 1,   color: '#c4f087' }
		      ],
		      opacity: 0.9
		    },
		    borderWidth: 5,
			radius: [5,5,5,5],
			borderopacity: 0.3
    	},
    	
		/**
		 * 明亮皮肤
		 */
    	'liquid': {	
    		borderWidth: 1,
			borderColor: "#454545",
    		background: {
		      color: [
		        { position: 0, color: '#515562'},
		        { position: .3, color: '#252e43'},
		        { position: .48, color: '#111c34'},
		        { position: .52, color: '#161e32'},
		        { position: .54, color: '#0c162e'},
		        { position: 1, color: '#010c28'}
		      ],
		      opacity: .8
		    },
		    radius: [5,5,5,5],
		    hasshadow: true,
		    shadow: {
		    	color: '#ccc',
				opacity: 0.75,
				offsetx: 3,
				offsety: 3,
				blur: 3
		    },
		    borderopacity: 0.5
    	},
    	
		/**
		 * 蓝色皮肤
		 */
    	'blue': {
		    borderWidth: 3,
		    borderColor: '#1e5290',
		    radius: [5,5,5,5],
		    spikeoffset: {x: -50, y:0},
		    background: {
		      color: [
		        { position: 0, color: '#3a7ab8'},
		        { position: .48, color: '#346daa'},
		        { position: .52, color: '#326aa6'},
		        { position: 1, color: '#2d609b' }
		      ],
		      opacity: .8
		    },
		    borderWidth: 1,
			borderColor: "#1e5290",
		    hasshadow: true,
		    shadow: {
		    	color: '#ccc',
				opacity: 0.3,
				offsetx: 3,
				offsety: 3,
				blur: 3
		    },
		    borderopacity: 0.5
		  },
		  
		  /**
		   * 肉色皮肤
		   */
		  'salmon' : {
		    background: {
		      color: [
		        { position: 0, color: '#fbd0b7' },
		        { position: .5, color: '#fab993' },
		        { position: 1, color: '#f8b38b' }
		      ],
		      opacity: .8
		    },
		    borderWidth: 3,
		    borderColor: '#eda67b',
		    radius: [4,4,4,4]
		  },
		  
		  /**
		   * 黄色
		   */
		  'yellow': {
		  	borderWidth: 3,
		    borderColor: '#f7c735',
		    background: '#ffffaa',
		    hasshadow: true,
		    shadow: {
		    	color: '#f7c735',
				opacity: 0.3,
				offsetx: 3,
				offsety: 3,
				blur: 3
		    },
		    radius: [4,4,4,4]
		  }
    }
})(jQuery.fn);