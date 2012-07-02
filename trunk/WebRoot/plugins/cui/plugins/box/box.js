(function(cuiPackage){
	/**
	 * @class jQuery.Box
	 * @singleton
	 * 弹出框
	 * @author cqb
	 * @version 2.0
	 * @demo ../test/box/index.html
	 */
	cuiPackage.Box = {
		title: null,
		content: null,
		floatdiv: null,
		width: 300,
		height: 100,
		type: null,
		buttons: null,
		callbacks: null,
		afterClose: null,
		_render: function(){
			this._create();
			this._init();
			this._litener();
		},
		destroy: function(){
			if(this.floatdiv){
				$(this.floatdiv).find("a.cui-box-button").removeData("value");
				var floatdiv = $(this.floatdiv).data("FloatDiv");
				floatdiv.destroy();
				$(this.floatdiv).removeData("FloatDiv");
				$(this.floatdiv).remove();
				this.title = this.content = this.floatdiv = this.type = this.buttons = this.callbacks = this.afterClose = null;
			}
		},
		_create: function(){
			if(!this.floatdiv){
				this.floatdiv = $("<div>").addClass("cui-box")[0];
				$("body").append(this.floatdiv);
			}
			$(this.floatdiv).empty();
			$(this.floatdiv).FloatDiv({
				draggable: true,
				fadehide: true,
				width: this.width,
				height: this.height,
				title: this.title
			});
			
			var messageArea = $("<div>").addClass("cui-message-area");
			var buttonArea = $("<div>").addClass("cui-button-area");
			$(".cui-floatdiv-content", this.floatdiv).append(messageArea);
			$(".cui-floatdiv-content", this.floatdiv).append(buttonArea);
			
			//message area
			var icon = this._createIcon();
			var text = $("<span>").addClass("cui-box-content");
			text.html(this.content);
			messageArea.append(icon);
			messageArea.append(text);
			
			//button area
			if(this.buttons){
				var buttons = this._getButtons();
				for(var i in  buttons){
					buttonArea.append(buttons[i]);
				}
			}
		},
		_createIcon: function(){
			var icon = $("<div>").addClass("cui-box-icon");
			icon.addClass("cui-box--icon-"+this.type);
			return icon;
		},
		
		_getButtons: function(){
			if(this.buttons){
				var array = [];
				for(var name in this.buttons){
					var bt = $("<a>").addClass("cui-box-button");
					bt.html(name);
					bt.data("value", this.buttons[name]);
					bt.attr("href","javascript:void(0)");
					array.push(bt);
				}
				return array;
			}
			return null;
		},
		
		_init: function(){
			var $content = $(".cui-floatdiv-content",this.floatdiv);
			var contenth = $content.height();
			var $buttonarea = $(".cui-button-area",this.floatdiv);
			var buttonareah = $buttonarea.height();
			$(".cui-message-area",this.floatdiv).height(contenth-buttonareah);
		},
		_litener: function(){
			var self = this;
			$(this.floatdiv).find("a.cui-box-button").each(function(index){
				$(this).click(function(){
					if(self.callbacks && index < self.callbacks.length){
						self.callbacks[index]($(this).html(), $(this).data("value"));
					}
					self.close();
				});
			});
			$(document).bind('keyup', function(e){
				self._keyup(e);
			});
		},
		
		_keyup: function(e){
			if (e.which == 27){
				this.close();
			}
            return true;
		},
		
		_execute: function(title, msg, type, buttons, options){
			this.content = msg;
			this.title = title;
			this.type = type;
			this.buttons = buttons;
			$.extend(this, options);
			this._render();
		},
		
		close: function(){
			var self = this;
			$(this.floatdiv).animate({top: -this.height-100, opacity: 0}, 550,function(){
				self.destroy();
				if(self.afterClose){
					self.afterClose();
				}
			});
		},
		
		message: function(title, msg, options){
			this._execute(title, msg, "message", {"确定": true}, options);
		},
		
		error: function(title, msg, options){
			this._execute(title, msg, "error", {"确定": true}, options);
		},
		
		warning: function(title, msg, options){
			this._execute(title, msg, "warning", {"确定": true}, options);
		},
		
		success: function(title, msg, options){
			this._execute(title, msg, "success", {"确定": true}, options);
		},
		
		confirm: function(title, msg, options){
			this._execute(title, msg, "confirm", {"取消": false, "确定": true}, options);
		}
	};
})(jQuery);