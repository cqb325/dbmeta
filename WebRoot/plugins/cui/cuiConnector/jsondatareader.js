(function(cuiPackage){
	/**
	 * @class jQuery.fn.cui.JSONDataReader
	 * 数据读取器
	 * @author cqb
	 * @version 1.0
	 */
	cuiPackage.Class("cui.JSONDataReader",cuiPackage.DataReader, {
		total: 0,
		pagecount: 1,
		codetablefield: "codetable",
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize : function(){},
		
		/**
		 * @description 读取元数据
		 * @param {Object} json 元数据源
		 */
		readFieldMeta: function(json){
			var metas = [];
			var tablename = json.tablename;
			var tableid = json.tableid;
			var tabledesiner = json.tabledesiner;
			//console.log(tablename);
			var meta = new cuiPackage.cui.Meta();
			if(json){
				//console.log(json.fields.length);
				for(var i = 0; i < json.fields.length; i++){
					var field = json.fields[i];
					var fieldMeta = new cuiPackage.cui.FieldMeta();
					for(var key in field){
						//console.log(key);
						var method = this.getSetMethod(key);
						try{
							fieldMeta[method](field[key]);
						}catch(e){
							alert("不存在名称为 " + key + " 的元数据属性");
						}
					}
					metas.push(fieldMeta);
					meta.fieldMetasNameMap[fieldMeta.getfieldname()] = fieldMeta;
					meta.fieldMetasIDMap[fieldMeta.getfieldid()] = fieldMeta;
				}
			}else{
				alert("JSONDataReader.readFieldMeta: XML 存在问题!");
			}
			meta.setFieldMetas(metas);
			meta.setTableName(tablename);
			meta.setTableId(tableid);
			meta.tabledesiner = tabledesiner;
			return meta;
		},
		
		/**
		 * @description 读取数据
		 * @param {Object} objs 数据源
		 */
		readData: function(json){
			var datas = [];
			if(json){
				this.total = json.total;
				this.pagecount = json.pagecount;
				var records = json.records;
				for(var i = 0; i < records.length; i++){
					var row = records[i];
					var record = new cuiPackage.cui.Record();
					for(var fieldname in row){
						var field = new cuiPackage.cui.Field();
						field.setFieldName(fieldname);
						field.setFieldValue(row[fieldname]);
						record.addField(field);
					}
					datas.push(record);
				}
			}else{
				alert("JSONDataReader.readData: 获取的json数据存在问题!");
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
		 		alert("JSONDataReader.getSetMethod: 获取的元数据存在问题!");
		 	}
		},
		
		/**
		 * @private
		 * @description 获取代码表
		 * @param {Object} 字段
		 */
		getCodeTable: function(codetable){
			var result = {};
		}
	});
})(jQuery.fn);