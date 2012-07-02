(function(cuiPackage){
	/**
	 * @class CUI.Spin
	 * Spin
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("Spin",cuiPackage.Object,{
		lines: 12, // The number of lines to draw
		length: 7, // The length of each line
		width: 5, // The line thickness
		radius: 10, // The radius of the inner circle
		color: '#000', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 100, // Afterglow percentage
		shadow: true, // Whether to render a shadow
  
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize: function(options){
			cuiPackage.Object.prototype._initialize.apply(this,arguments);
			this._render();
		},
		
		_render: function(){
			
		},
		
		_create: function(){
			
		},
		
		_listener: function(){
			
		}
	});
})(jQuery.fn);