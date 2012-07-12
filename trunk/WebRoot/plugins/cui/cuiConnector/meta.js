(function(cuiPackage){
	/**
	 * @class jQuery.fn.cui.Meta
	 * 元数据封装类
	 * @author cqb
	 * @version 1.0
	 */
	cuiPackage.Class("cui.Meta",{
		/**
         * 字段列表
         * @type {Array}
         */
		fieldMetas: null,
		/**
         * 字段列表
         * @type {Map<fieldname, FieldMeta>}
         */
		fieldMetasNameMap: null,
		/**
         * 字段列表
         * @type {Map<fieldID, FieldMeta>}
         */
		fieldMetasIDMap: null,
		/**
         * xml根节点名称
         * @type {String}
         */
		rootTagName: 'metas',
		/**
         * xml字段节点名称
         * @type {String}
         */
		fieldTagName: 'field',
		/**
         * 表格id
         * @type {String}
         */
		tableId: '',
		
		/**
         * 表格名称
         * @type {String}
         */
		tableName: '',
		
		/**
		 * 
		 */
		tabledesiner: null,
		
		_initialize : function(){
			this.fieldMetasNameMap = {};
			this.fieldMetasIDMap = {};
		},
		
		/**
		 * @description 设置表格id
		 * @param {String} tableid 表格id
		 */
		setTableId: function(tableid){
			this.tableId = tableid;
		},
		
		/**
		 * @description 获取表格id
		 * @return {String} 表格id
		 */
		getTableId: function(){
			return this.tableId;
		},
		
		/**
		 * @description 设置表格名称
		 * @param {String} tablename 表格名称
		 */
		setTableName: function(tablename){
			this.tableName = tablename;
		},
		
		/**
		 * @description 获取表格名称
		 * @return {String} 表格名称
		 */
		getTableName: function(){
			return this.tableName;
		},
		
		/**
		 * @description 根据字段名获得某个字段的元数据信息
		 * @param {String} fieldName 字段名称
		 * return {FieldMeta} 字段元数据对象
		 */
		getFieldMetaByName: function(fieldName){
			if(this.fieldMetasNameMap == null){
				return null;
			}else{
				return this.fieldMetasNameMap[fieldName];
			}
		},
		
		/**
		 * @description 根据字段ID获得该字段的元数据信息
		 * @param {String} id 字段id
		 * return {FieldMeta} 字段元数据对象
		 */
		getFieldMetaById: function(id){
			if(this.fieldMetasIDMap == null){
				return null;
			}else{
				return this.fieldMetasIDMap[id];
			}
		},
		
		/**
		 * @description 根据索引获得某个字段的元数据信息
		 * @param {Number} index 字段顺序
		 * return {FieldMeta} 字段元数据对象
		 */
		getFieldMeta: function(index){
		 	//判断index是否数字
		 	if(typeof(index) != "number"){
		 		alert("the parameter of getFieldMeta must be number!");
		 		index = 1;
		 	}
			if(this.fieldMetas == null){
				return null;
			}else if(this.fieldMetas.length < index){
				alert("元数据项数组越界！");
				return null;
			}else{
				return this.fieldMetas[index-1];
			}
		},
		
		/**
		 * @description 设置字段元数据列表
		 * @param {Object} metas 字段列表
		 */
		setFieldMetas: function(metas){
			this.fieldMetas = metas;
		}
	});
})(jQuery.fn);