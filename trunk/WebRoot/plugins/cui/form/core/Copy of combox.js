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
		listele: null,
		list: null,
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
			
			this.listele = $("<div>").addClass("cui-combox-list");
			jQuery("#"+this.name).before(this.listele);
			var width = jQuery("#"+this.name).outerWidth(true);
			var inpm = parseInt(jQuery("#"+this.name).css("margin-left")) + parseInt(jQuery("#"+this.name).css("margin-right"));
			this.listele.width(width - inpm - 2);
			
			this.listcontrol = jQuery("<div>").addClass("cui-combox-control");
			jQuery("#"+this.name).before(this.listcontrol);
			this.listcontrol.css({
				left: jQuery("#"+this.name).width() - 14,
				top: 0
			});
			
			var codes = this.fieldmeta.codetable.codes;
			var ul = jQuery("<ul>");
			for(var i in codes){
				var code = codes[i];
				var li = jQuery("<li>").html(code).data("val",i);
				ul.append(li);
			}
			this.listele.empty().append(ul);
			
			//列表组件
			this.listele.List({
				autoheight: true
			});
			
			this.list =  this.listele.data("List");
			
			this.listele.css({
				left: parseInt(jQuery("#"+this.name).css("margin-bottom")),
				top: jQuery("#"+this.name).height() + parseInt(jQuery("#"+this.name).css("margin-bottom"))
			});
			this.list.hide();
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
			
			jQuery(document).click(function(e){
				if(e.srcElement && e.srcElement != self.listele[0] && self.list.state){
					self.list.hide();
				}
				if(e.target && e.target != self.listele[0] && self.list.state){
					self.list.hide();
				}
				
				return false;
			});
			
			this.listcontrol.click(function(){
				if(self.list.state){
					self.list.hide();
				}else{
					self.list.show();
				}
				return false;
			});
			
			this.list.selected = function(item){
				self.value = jQuery(item).data("val");
				jQuery("#"+self.name).val(jQuery(item).text()).blur();
				self.labelele.remove();
				self.list.hide();
			}
		},
		
		setValue: function(value){
			this.value = value;
			var codes = this.fieldmeta.codetable.codes;
			if(this.elementid){
				$("#"+this.elementid).val(codes[value]);
				if(this.labelele && $.trim($("#"+this.elementid).val()) != ""){
					this.labelele.remove();
				}
			}
		},
	});
})(jQuery.fn);