(function(cuiPackage){
	/**
	 * @class CUI.Select
	 * Select
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("Select",cuiPackage.Object,{
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
		 * 执行
		 */
		_render: function(){
			this._create();
		},
		
		/**
		 * 创建
		 */
		_create: function(){
			
			var self = this;
			var id = $(this.target).attr("id");
			var wrapper = $("<div>").addClass("cui-select-dropdown").attr("id",id+"_s").attr("tabIndex","1");
			$(this.target).wrap(wrapper);
			var selectId = $(wrapper).attr('id'),selectZindex = $(wrapper).css('z-index'),selectIndex = $('#'+selectId+' option').index($('#'+selectId+' option:selected')[0]);
			$('#'+selectId).append('<div class="cui-select-dropselectbox"><h4></h4><ul style="display:none"><li></li></ul></div>');
			$('#'+selectId+' h4').empty().append($('#'+selectId+' option:selected').text());
			$('.cui-select-dropselectbox').show();
			var selectWidth;
			selectWidth=$('#'+selectId+' select').width();//:selectWidth = $('#'+selectId).width();
			$('#'+selectId+' h4').css({width:selectWidth});
			var selectUlwidth = selectWidth + parseInt($('#'+selectId+' h4').css("padding-left")) + parseInt($('#'+selectId+' h4').css("padding-right"));
			$('#'+selectId+' ul').css({width:selectUlwidth+'px'});
			$('#'+selectId+' select').hide();
			$('#'+selectId+' div').hover(function(){
				$('#'+selectId+' h4').addClass("over");
			},function(){
				$('#'+selectId+' h4').removeClass("over");
			});
			$('#'+selectId)
			.bind("focus",function(){
				self.clearSelectMenu();
				$('#'+selectId+' h4').addClass("over");
			})
			.bind("click",function(e){
				if($('#'+selectId+' ul').css("display") == 'block'){
					self.clearSelectMenu();
					return false;
				}else{
					if ($.browser.opera){self.clearSelectMenu();}
					$('#'+selectId+' h4').addClass("cui-select-current");
					$('#'+selectId+' ul').show();
					var selectZindex = $(this).css('z-index');
					if ($.browser.msie || $.browser.opera){$('.cui-select-dropdown').css({'position':'relative','z-index':'0'});}
					$('#'+selectId).css({'position':'relative','z-index':'999'});
					self.setSelectValue(selectId);
					var windowspace = ($(window).scrollTop() + document.documentElement.clientHeight) - $(this).offset().top;
					var ulspace = $('#'+selectId+' ul').outerHeight(true);
					var windowspace2 = $(this).offset().top - $(window).scrollTop() - ulspace;
					windowspace < ulspace && windowspace2 > 0?$('#'+selectId+' ul').css({top:-ulspace}):$('#'+selectId+' ul').css({top:$('#'+selectId+' h4').outerHeight(true)});
					selectIndex = $('#'+selectId+' li').index($('.cui-select-selectedli')[0]);
					$(window).scroll(function(){
						var windowspace = ($(window).scrollTop() + document.documentElement.clientHeight) - $('#'+selectId).offset().top;
						windowspace < ulspace?$('#'+selectId+' ul').css({top:-ulspace}):$('#'+selectId+' ul').css({top:$('#'+selectId+' h4').outerHeight(true)});
					});
					$('#'+selectId+' li').click(function(e){
							selectIndex = $('#'+selectId+' li').index(this);
							$('#'+selectId+' select')[0].selectedIndex = selectIndex;
							$($('#'+selectId+' select')[0]).change();
							$('#'+selectId+' h4').empty().append($('#'+selectId+' option:selected').text());
							self.clearSelectMenu(selectId,selectZindex);
							e.stopPropagation();
							e.cancelbubble = true;
					})
					.hover(
						   function(){
								$('#'+selectId+' li').removeClass("cui-select-over");
								$(this).addClass("cui-select-over").addClass("cui-select-selectedli");
								selectIndex = $('#'+selectId+' li').index(this);
							},
							function(){
								$(this).removeClass("cui-select-over");
							}
					);
				};
				e.stopPropagation();
			})
			 .bind('mousewheel', function(e) {
			 	var delta = e.originalEvent.wheelDelta;
					e.preventDefault();
					var mousewheel = {
						$obj : $('#'+selectId+' li.cui-select-over'),
						$slength : $('#'+selectId+' option').length,
						mup:function(){
							this.$obj.removeClass("cui-select-over");
							selectIndex == 0?selectIndex = 0:selectIndex--;
							self.keyDown(selectId,selectIndex);
						},
						mdown:function(){
							this.$obj.removeClass("cui-select-over");
							selectIndex == (this.$slength - 1)?selectIndex = this.$slength - 1:selectIndex ++;
							self.keyDown(selectId,selectIndex);
						}
					}
					delta>0?mousewheel.mup():mousewheel.mdown();
			 })
			.bind("dblclick", function(){
				self.clearSelectMenu();
				return false;
			})
			.bind("keydown",function(e){
				$(this).bind('keydown',function(e){
					if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 35 || e.keyCode == 36){
						return false;
					}
				});
				var $obj = $('#'+selectId+' li.cui-select-over'),$slength = $('#'+selectId+' option').length;
				switch(e.keyCode){
					case 9:
						return true;
						break;
					case 13:
						//enter
						self.clearSelectMenu();
						break;
					case 27:
						//esc
						self.clearSelectMenu();
						break;
					case 33:
						$obj.removeClass("cui-select-over");
						selectIndex = 0;
						self.keyDown(selectId,selectIndex);
						break;
					case 34:
						$obj.removeClass("cui-select-over");
						selectIndex = ($slength - 1);
						self.keyDown(selectId,selectIndex);
						break;
					case 35:
						$obj.removeClass("cui-select-over");
						selectIndex = ($slength - 1);
						self.keyDown(selectId,selectIndex);
						break;
					case 36:
						$obj.removeClass("cui-select-over");
						selectIndex = 0;
						self.keyDown(selectId,selectIndex);
						break;
					case 38:
						//up
						e.preventDefault();
						$obj.removeClass("cui-select-over");
						selectIndex == 0?selectIndex = 0:selectIndex--;
						self.keyDown(selectId,selectIndex);
						break;
					case 40:
						//down
						e.preventDefault();
						$obj.removeClass("cui-select-over");
						selectIndex == ($slength - 1)?selectIndex = $slength - 1:selectIndex ++;
						self.keyDown(selectId,selectIndex);
						break;
					default:
						e.preventDefault();
						break;
				};
			})
			.bind("blur",function(){
				self.clearSelectMenu(selectId,selectZindex);
				return false;
			});
			$('.cui-select-dropselectbox').bind("selectstart",function(){
					return false;
			});
		},
		
		clearSelectMenu:function(selectId,selectZindex){
			$('.cui-select-dropselectbox ul').empty().hide();
			$('.cui-select-dropselectbox h4').removeClass("cui-select-over").removeClass("cui-select-current");
			$('.cui-select-dropselectbox span').removeClass("cui-select-over");
			$('#'+selectId).css({'z-index':selectZindex});
		},
		
		setSelectValue:function(sID){
			$('#'+sID+' ul').empty();
			var content = []
			$.each($('#'+sID+' option'), function(i){
				content += "<li class='cui-select-FixSelectBrowser'>"+$(this).text()+"</li>";
			});
			$('#'+sID+' ul').html(content);
			$('#'+sID+' h4').empty().append($('#'+sID+' option:selected').text());
			$('#'+sID+' li').eq($('#'+sID+' select')[0].selectedIndex).addClass("cui-select-over").addClass("cui-select-selectedli");
		},
		keyDown:function(sID,selectIndex){
			$('#'+sID+' select')[0].selectedIndex = selectIndex;
			$('#'+sID+' li:eq('+selectIndex+')').toggleClass("cui-select-over");
			$('#'+sID+' h4').empty().append($('#'+sID+' option:selected').text());
		}
	});
})(jQuery.fn);