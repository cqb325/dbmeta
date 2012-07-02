(function(cuiPackage){
	/**
	 * @class jQuery.fn.cui.Field
	 * 字段类
	 * 用来存储、操作某个字段的值
	 * @author cqb
	 * @version 1.0
	 */
	cuiPackage.Class("cui.Field",{
		/**
         * 字段名称
         * @type {String}
         */
		fieldName: null,
		/**
         * 字段值
         * @type {Object}
         */
		fieldValue: null,
		/**
         * 代码表值名称
         * @type {String}
         */
		codeName: null,
		/**
		 * @private
         * @description 初始化
         */
		_initialize : function(options){},
		
		/**
         * @description 设置字段名称
         * @param {String} fieldname 字段名称
         */
		setFieldName: function(fieldname){
			this.fieldName = fieldname;
		},
		
		/**
		 * @description 获取字段名称
		 * @return {String} 字段名称
		 */
		getFieldName: function(){
			return this.fieldName;
		},
		
		/**
         * @description 设置字段值
         * @param {Object} value 字段值
         */
		setFieldValue: function(value){
			this.fieldValue = value;
		},
		
		/**
		 * @description 获取字段值
		 * @return {Object} 字段值
		 */
		getFieldValue: function(){
			return this.fieldValue;
		},
		
		/**
         * @description 设置代码表值名称
         * @param {String} codename 代码表值名称
         */
		setCodeName: function(codename){
			this.codeName = codename;
		},
		
		/**
		 * @description 获取代码表值名称
		 * @return {String} 代码表值名称
		 */
		getCodeName: function(){
			return this.codeName;
		}
	});
})(jQuery.fn);