(function(cuiPackage){
	/**
	 * @class CUI.Combox
	 * 下拉框
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("ComBox",cuiPackage.DBLink,{
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
			var codes = this.fieldmeta.codetable.codes;
			var select = $("#"+this.name).empty();
			for(var i in codes){
				var code = codes[i];
				var option = $("<option>").html(code).attr("value", i);
				select.append(option);
			}
			
			select.Select();
		},
		
		_listener: function(){
		},
		
		setValue: function(value){
			this.value = value;
			var codes = this.fieldmeta.codetable.codes;
			if(this.elementid){
				$("#"+this.elementid).find("option[value='"+value+"']").attr("selected",true);
				if(this.labelele && $.trim($("#"+this.elementid).val()) != ""){
					this.labelele.remove();
				}
			}
		},
	});
})(jQuery.fn);