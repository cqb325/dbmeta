(function(cuiPackage){
	/**
	 * @class CUI.TextArea
	 * 下拉框
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("TextArea",cuiPackage.DBLink,{
		label: null,
		labelele: null,
		width: null,
		height: null,
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize: function(options){
			cuiPackage.DBLink.prototype._initialize.apply(this,arguments);
			this._render();
		},
		
		_render: function(){
			if(this.name){
				//创建
				this._create();
				//添加事件监听
				this._listener();
			}
		},
		
		_create: function(){
			if(this.width){
				jQuery("#"+this.name).width(this.width);
			}
			if(this.height){
				jQuery("#"+this.name).height(this.height);
			}
			
			var beauty = $("<div>").addClass("cui-textarea-beauty").css("position","relative");
			beauty.width(jQuery("#"+this.name).width()).height(jQuery("#"+this.name).height());
			jQuery("#"+this.name).wrap(beauty);
			jQuery("#"+this.name).addClass("cui-textarea");
			this.labelele = jQuery("<label>").addClass("cui-inputtext-label").attr("for",this.name).html(this.label);
		},
		
		_listener: function(){
			var self = this;
			jQuery("#"+this.name).focus(function(){
				$(this).addClass("cui-textarea-focus");
				if(jQuery.trim($(this).val()) == ""){
					self.labelele.remove();
				}
			});
			jQuery("#"+this.name).blur(function(){
				$(this).removeClass("cui-textarea-focus");
				if(jQuery.trim($(this).val()) == ""){
					$(this).parent(".cui-textarea-beauty").append(self.labelele);
				}
			}).blur();
		}
	});
})(jQuery.fn);