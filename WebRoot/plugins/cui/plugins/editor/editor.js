(function(cuiPackage){
	/**
	 * @class CUI.Editor
	 * @extends jQuery.fn.Object
	 * 文本编辑
	 * @author cqb
	 * @version 2.0
	 * @demo ../test/editor/index.html
	 */
	cuiPackage.Class("Editor",cuiPackage.Object, {
		editor: null,
		/**
         * @private
         * @description 设置参数信息
         * @param {options} 参数
         */
        _initialize : function(options){
        	cuiPackage.Object.prototype._initialize.apply(this,arguments);
        	
        	//
        	this._render(options);
        },
		
		_render: function(options){
			this._create(options);
		},
		
		_create: function(options){
			options = options||{};
			options["lang"] = "zh_cn";
			this.editor = $(this.target).redactor(options).data("redactor");
		},
		
		/**
		 * 获取文档
		 */
		getDoc: function(){
			return $(this.target).getDoc();
		},
		
		/**
		 * 获取iframe
		 */
		getFrame: function(){
			return $(this.target).getFrame();
		},
		
		/**
		 * 获取编辑器
		 */
		getEditor: function(){
			return $(this.target).getEditor();
		},
		
		/**
		 * 获取代码
		 */
		getCode: function(){
			return $(this.target).getCode();
		},
		
		/**
		 * 设置代码
		 * @param {Object} content
		 */
		setCode: function(content){
			$(this.target).setCode(content);
		},
		
		/**
		 * 获取文本
		 */
		getText: function(){
			return $(this.target).getText();
		},
		
		/**
		 * 插入html文本
		 * @param {Object} html
		 */
		insertHtml: function(html){
			$(this.target).insertHtml();
		},
		
		/**
		 * 销毁
		 */
		destroy: function(){
			$(this.target).destroyEditor();
			cuiPackage.Object.prototype.destroy.apply(this,arguments);
		},
		
		/**
		 * 设置焦点
		 */
		setFocus: function(){
			$(this.target).setFocus();
		},
		
		/**
		 * 执行命令
		 * execCommand('bold')
		 * execCommand('insertHtml','<p>text</p>')
		 * @param {Object} method	函数
		 * @param {Object} args		参数
		 */
		execCommand: function(method, args){
			$(this.target).execCommand(method, args);
		}
	});
})(jQuery.fn);