(function(cuiPackage){
	/**
	 * @class jQuery.fn.cui.Record
	 * 记录封装类,对应表格的一行数据
	 * @author cqb
	 * @version 1.0
	 */
	cuiPackage.Class("cui.Record",{
		/**
         * 字段列表
         * @type {Array}
         */
		id: 0,
		/**
         * 数据列表
         * @type {Array}
         */
		fields: null,
		
		/**
         * 数据列表
         * @type {Map<fieldname, value>}
         */
		fieldsMap: null,
		
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize : function(options){
			this.fields = [];
			this.fieldsMap = {};
		},
		
		/**
		 * @description 获得指定字段名对应的值
		 * @param {String} fieldName 字段名称
		 * @return {String} 字段值
		 */
		get: function(fieldName){
			if(fieldName == null){
				return null;
			}else{
				return this.fieldsMap[fieldName];
			}
		},
		
		/**
		 * @description 设置指定字段名对应的值
		 * @param {String} name 字段名称
		 * @param {String} value 字段值
		 */
		set: function(name, value){
			if(!name || name == ""){
				alert('设置的字段为空!');
				return;
			}
			this.fieldsMap[name] = value;
		},
		
		/**
		 * @description 添加字段
		 * @param {Object} field 字段
		 */
		addField: function(field){
			if(typeof(field) == 'object'){
				this.fields.push(field);
				this.set(field.getFieldName(), field.getFieldValue());
			}else{
				alert("error");
			}
		}
	});
})(jQuery.fn);