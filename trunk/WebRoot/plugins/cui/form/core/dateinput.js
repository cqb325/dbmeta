(function(cuiPackage){
	/**
	 * @class CUI.DateInput
	 * 时间选择框
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("DateInput",cuiPackage.DBLink,{
		label: null,
		labelele: null,
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
			var beauty = $("<span>").addClass("cui-inputtext-beauty").css("position","relative");
			jQuery("#"+this.name).wrap(beauty);
			jQuery("#"+this.name).addClass("cui-inputtext");
			this.labelele = jQuery("<label>").addClass("cui-inputtext-label").attr("for",this.name).html(this.label);
			jQuery("#"+this.name).datepicker({
				changeMonth: true,
				changeYear: true
			},jQuery.datepicker.regional['zh-CN']);
		},
		
		_listener: function(){
			var self = this;
			jQuery("#"+this.name).focus(function(){
				$(this).addClass("cui-inputtext-focus");
				if(jQuery.trim($(this).val()) == ""){
					self.labelele.remove();
				}
			});
			jQuery("#"+this.name).blur(function(){
				$(this).removeClass("cui-inputtext-focus");
				if(jQuery.trim($(this).val()) == ""){
					$(this).parent(".cui-inputtext-beauty").append(self.labelele);
				}
			}).blur();
			
			//值改变后去掉label
			jQuery("#"+this.name).change(function(){
				self.labelele.remove();
			});
		}
	});
})(jQuery.fn);