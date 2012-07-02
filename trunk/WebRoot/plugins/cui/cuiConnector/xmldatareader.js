(function(cuiPackage){
	/**
	 * @class jQuery.fn.cui.XMLDataReader
	 * 数据读取器
	 * @author cqb
	 * @version 1.0
	 */
	cuiPackage.Class("cui.XMLDataReader",cuiPackage.DataReader, {
		total: 0,
		pagecount: 1,
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize : function(){},
	
		/**
		 * @description 读取元数据
		 * @param {Object} doc 元数据源
		 */
		readFieldMeta: function(doc){
			var metas = [];
			var doc = new cuiPackage.XML({xml: doc});
			//alert(doc.toString());
			var tablename = null;
			var tableid = null;
			var meta = new cuiPackage.cui.Meta();
			if(typeof(doc) == 'object'){
				var root = doc.getRootNode();
				tablename = root.getAttribute('tablename');
				tableid = root.getAttribute('tableid');
				var fields = root.getChildNodes("field");
				for(var i = 0; i < fields.length; i++){
					var field = fields[i];
					var fieldMeta = new cuiPackage.cui.FieldMeta();
					var attrs = field.getAttributes();
					for(var j = 0; j < attrs.length; j++){
						var attr = attrs[j];
						var methodStr = this.getSetMethod(attr.name);
						if(attr.value != "*"){
							try{
								fieldMeta[methodStr](attr.value);
							}catch(e){
								alert("不存在名称为 " + attr.name + " 的元数据属性");
							}
						}
					}
					//codetable
					var codetablenodes = field.getChildNodes("codetable");
					if(codetablenodes.length){
						var codetable = {};
						var codetablenode = codetablenodes[0];
						var codetabletitle = codetablenode.getAttribute("name");
						codetable.name = codetabletitle;
						var codenodes = codetablenode.getChildNodes("code");
						if(codenodes.length){
							var codes = {};
							for(var k in codenodes){
								var codenode = codenodes[k];
								codes[codenode.getAttribute("value")] = codenode.getAttribute("name");
							}
							codetable.codes = codes;
						}
						fieldMeta.setcodetable(codetable);
					}//end if
					metas.push(fieldMeta);
					meta.fieldMetasNameMap[fieldMeta.getfieldname()] = fieldMeta;
					meta.fieldMetasIDMap[fieldMeta.getfieldid()] = fieldMeta;
				}
			}else{
				alert("XMLDataReader.readFieldMeta: XML 存在问题!");
			}
			
			meta.setFieldMetas(metas);
			meta.setTableName(tablename);
			meta.setTableId(tableid);
			return meta;
		},

		/**
		 * @description 读取数据
		 * @param {Object} doc 数据源
		 */
		readData: function(doc){
			var doc = new cuiPackage.XML({xml: doc});
			var datas = [];
			if(doc){
				var root = doc.getRootNode();
				this.total = root.getAttribute("total");
				this.pagecount = root.getAttribute("pagecount");
				var rows = root.getChildNodes("record");
				for(var i = 0; i < rows.length; i++){
					var row = rows[i];
					var record = new cuiPackage.cui.Record();
					var fields = row.getChildNodes("field");
					for(var j = 0; j < fields.length; j++){
						var field = fields[j];
						var fieldName = field.getAttribute('name');
						//console.log(fieldName);
						var fieldValue = field.getAttribute('value');
						//console.log(fieldValue);
						var cField = new cuiPackage.cui.Field();
						cField.setFieldName(fieldName);
						cField.setFieldValue(fieldValue);
						record.addField(cField);
					}
					datas.push(record);
				}
			}else{
				alert("XMLDataReader.readData: XML 存在问题!");
			}
			return datas;
		},
		
		/**
		 * @description 读取总记录数
		 * @param {Object} doc 数据源
		 */
		getRecordCount: function(){
			return this.total;
		},
		
		/**
		 * @description 获取页数
		 * @return {Number} 页数
		 */
		getPageCount: function(){
			return this.pagecount;
		},
		/**
		 * @private
		 * @description 获取方法
		 * @param {String} 字段名称
		 */
		getSetMethod: function(name){
		 	if(typeof(name) == 'string' && name.length > 0){
		 		return 'set' + name;
		 	}else{
		 		alert("XMLDataReader.getSetMethod: 获取的元数据存在问题!");
		 	}
		}
	});
})(jQuery.fn);