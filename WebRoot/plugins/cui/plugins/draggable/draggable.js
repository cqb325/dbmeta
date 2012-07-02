(function(cuiPackage){
	/**
	 * @class jQuery.fn.Draggable
	 * 拖拽
	 * @author cqb
	 * @version 2.0
	 * @demo ../example/draggable/index.html
	 */
	cuiPackage.Class("Draggable",cuiPackage.Object,{
		/**
         * 是否使用拖拽
         * @type {Boolean}
         */
		isdraggable: false,
		/**
         * 拖拽方向 "x","y"
         * @type {String}
         */
		axis: false,
		/**
         * 不拖拽的元素
         * @type {String}
         */
		cancel: ":input,option",
		/**
         * 容器
         * @type {Object}
         */
		containment: false,
		/**
         * 鼠标样式
         * @type {String}
         */
		cursor: "auto",
		/**
         * 鼠标位置
         * @type {Object}
         */
		cursorAt: false,
		/**
         * 按照网格拖拽
         * @type {Object}
         */
		grid: false,
		/**
         * 拖拽的对象
         * @type {String}
         */
		handle: false,
		/**
         * 拖拽的样式
         * @type {Boolean}
         */
		helper: "original",
		/**
         * 是否还原
         * @type {Boolean}
         */
		revert: false,
		/**
         * 
         * @type {String}
         */
		scope: "default",
		/**
         * 滚动条是否随之移动
         * @type {Boolean}
         */
		scroll: true,
		/**
         * 停靠
         * @type {String}
         */
		snap: false,
		/**
         * 是否使用层栈
         * @type {Boolean}
         */
		stack: false,
		/**
         * 显示的层级
         * @type {String}
         */
		zIndex: false,
	    /**
		 * @private
		 * @description 构造函数
         * @param {Object} options参数
		 */
		_initialize : function(options){
			cuiPackage.Object.prototype._initialize.apply(this, arguments);
			//如果可以拖拽
			if(this.isdraggable){
				this._init();
			}
		},
		
		/**
		 * @private
		 * @description 初始化， 先整合参数最后条用ui的draggable插件
		 */
		_init: function(){
			var self = this;
			var options = {};
			jQuery.extend(options, this);
			jQuery.extend(options, {
				start: function(event, ui){
					self.start(event);
				},
				
				drag: function(event, ui){
					self.drag(event);
				},
				
				stop: function(event, ui){
					self.stop(event);
				}
			});
			
			$(this.target).draggable(options);
		},
		
		/**
		 * @description 开始拖拽回调函数
		 * @param {Object} event拖拽事件
		 */
		start: function(event){
			
		},
		
		/**
		 * @description 拖拽时回调函数
		 * @param {Object} event拖拽事件
		 */
		drag: function(event){
			
		},
		
		/**
		 * @description 结束拖拽回调函数
		 * @param {Object} event拖拽事件
		 */
		stop: function(event){
			
		}
	});
})(jQuery.fn);