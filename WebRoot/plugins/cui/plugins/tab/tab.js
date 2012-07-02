(function(cuiPackage){
	/**
	 * @class CUI.Tab
	 * Spin
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("Tab",cuiPackage.Object,{
		/**
		 * @type {String}
		 * 滚动方向
		 */
  		rolldir: "lr",
  		/**
		 * @type {String}
		 * 选项卡位置
		 */
  		talign: "top",
  		/**
  		 * @type {Integer}
		 * 选项卡数量
  		 */
  		tabnum: 0,
  		/**
  		 * @type {Integer}
		 * 特效时间
  		 */
  		spped: 700,
  		/**
  		 * @type {Boolean}
		 * ajax加载
  		 */
  		ajaxload: false,
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize: function(options){
			cuiPackage.Object.prototype._initialize.apply(this,arguments);
			this._render();
		},
		
		/**
		 * @author cqb 
		 */
		_render: function(){
			//创建
			this._create();
			//初始化大小和位置
			this._initdem();
			//事件监听
			this._listener();
		},
		
		/**
		 * 创建
		 */
		_create: function(){
			$(this.target).addClass("cui-tab").addClass("cui-tab-align"+this.talign);
			var titles = $(this.target).children("a").addClass("cui-tab-but");
			var contents = $(this.target).children("div").addClass("cui-tab-content");
			
			this.tabnum = titles.length;
			
			$(this.target).append("<div class='cui-tab-title'></div>");
			$(this.target).append("<div class='cui-tab-main'></div>");
			
			var scroll = $("<div class='cui-tab-roll'></div>");
			scroll.append(contents);
			
			$(this.target).children(".cui-tab-title").append(titles);
			$(this.target).children(".cui-tab-main").append(scroll);
			
		},
		
		/**
		 * 初始化大小和位置
		 */
		_initdem: function(){
			var titleH = $(this.target).children(".cui-tab-title").children("a").outerHeight(true);
			var titleW = $(this.target).children(".cui-tab-title").children("a").outerWidth(true);
			var cdem = (this.talign == "top" || this.talign == "bottom") ? titleH : titleW;
			$(this.target).children(".cui-tab-main").css(this.talign,cdem);
			
			//滚动div的大小
			var end = (1 - this.tabnum) * 100 + "%";
			var dirs = {"lr":["left","right"],"tb":["top","bottom"]};
			var dir = dirs[this.rolldir];
			$(this.target).children(".cui-tab-main").children(".cui-tab-roll").css(dir[1],end);
			
			//内容的大小
			var dem = this.rolldir == "lr" ? "width" : "height";
			var demv = (1 / this.tabnum * 100) + "%";
			$(this.target).children(".cui-tab-main").find(".cui-tab-content").css(dem, demv);
		},
		
		/**
		 * 
		 */
		_listener: function(){
			var self = this;
			$(this.target).children(".cui-tab-title").children("a").each(function(index){
				$(this).click(function(){
					self.slide(this, index);
					self.tabclicked(this, index);
					return false;
				});
			});
			
			if(this.ajaxload){
				$(this.target).children(".cui-tab-title").children("a").eq(0).click();
			}
		},
		
		/**
		 * 
		 */
		slide: function(tab, index){
			var start = -index * 100 + "%";
			var end = (index + 1 - this.tabnum) * 100 + "%";
			var dirs = {"lr":["left","right"],"tb":["top","bottom"]};
			var dir = dirs[this.rolldir];
			
			var self = this;
			var cssobj = {};
			cssobj[dir[0]] = start;
			cssobj[dir[1]] = end;
			$(this.target).children(".cui-tab-main").children(".cui-tab-roll")
				.animate(cssobj,this.spped, function(){
					self.slideend(index);
				});
			if(this.ajaxload){
				var href = $(tab).attr("href");
				if(href && href != ""){
					$(this.target).children(".cui-tab-main").children(".cui-tab-roll")
						.children(".cui-tab-content").eq(index).empty()
						.load(href,function(){
							self.contentloadend(this);
						});
				}
			}
		},
		
		/**
		 * 
		 */
		tabclicked: function(tab, index){
			
		},
		
		/**
		 * 
		 */
		slideend:function(index){
			
		},
		
		/**
		 * 
		 */
		contentloadend: function(cont){
			
		}
	});
})(CUI);