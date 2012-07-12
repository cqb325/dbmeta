(function(cuiPackage){
	/**
	 * @class jQuery.fn.cui.CUIConnector
	 * 客户端数据集类
 	 * 从服务器端加载数据
 	 * 提供操作数据集的接口
	 * @author cqb
	 * @version 1.0
	 */
	cuiPackage.Class("cui.CUIConnector",{
		/**
         * 服务器url
         * @type {String}
         */	
		url: 'cuiConnector.cui',
		/**
         * 同异步
         * @type {Boolean}
         */	
		async: false,
		/**
         * 表id，实体表
         * @type {String}
         */	
		tableId: null,
		/**
         * 元数据信息，当该值为null时，将从后台加载元数据
         * @type {Array}
         */	
		meta: null,
		/**
         * 数据信息，当该值不为null时，将不到后台加载数据
         * @type {Object}
         */	
		data: null,
		/**
         * 每页记录数; 如果值为-1则不分页，一次全部加载
         * @type {Number}
         */
		pageSize: -1,
		/**
         * 数据源格式：xml或json
         * @type {String}
         */
		dataType: 'xml',
		/**
         * 参数列表
         * @type {Object}
         */
		params: null,
		/**
         * 数据列表
         * @type {Object}
         */
		records: null,
		/**
         * 数据读取器，数据集对象通过它从不同的数据源中读取元数据和数据
         * @type {Object}
         */
		dataReader: null,
		/**
         * 总记录数
         * @type {Number}
         */	
		recordCount: 0,
		/**
         * 总页数
         * @type {Number}
         */
		pageCount: 1,
		/**
         * 当前页码
         * @type {Number}
         */
		pageIndex: 1,
		/**
         * 当前页面记录数
         * @type {Number}
         */
		currPageSize: 0,
		/**
         * 当前行数据指针
         * @type {Number}
         */
		rowPointer: -1,
		
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize: function(options){
			jQuery.extend(this, options);
			if(!this.params){
				this.params = {};
			}
		},
		
		connector: function(success, error){
			//初始化数据读取器
			this._initDataReader();
			//加载元数据
			this._loadMetaData();
			//加载数据
			this._loadRecords(null, success, error);
		},
		
		_initDataReader: function(){
			if(this.dataType == 'xml'){
				this.dataReader = new jQuery.fn.cui.XMLDataReader();
			}else{
				this.dataReader = new jQuery.fn.cui.JSONDataReader();
			}
		},
		
		_loadMetaData: function(){
			if(this.tableId == null){
				alert("执行_loadMetaData 方法: tableId不能为空!");
				return false;
			}
			var self = this;
			
			jQuery.ajax({
				dataType: this.dataType,
				url: this.url,
				async: false,
				data: {c_action: 'meta', c_tableid: self.tableId, c_datatype: self.dataType},
				success: function(data){
					//console.log(new XMLSerializer().serializeToString(doc,"text/xml"));
					self.meta = self.dataReader.readFieldMeta(data);
				}
			});
		},
		
		_loadRecords: function(async, success, error){
			if(this.tableId == null){
				alert("执行_loadRecords方法: tableId不能为空！");
			}
			var bAsync = this.async;
			if(async != undefined && async != null){
				bAsync = async;
			}
			
			//参数对象，对象内的参数将传递到后台
			var params = {};
			//过滤值为null的参数
			for(key in this.params){
				var v = this.params[key];
				v = encodeURI(v);
				if(v != null){
					params[key] = v;
				}
			}
			//数据服务类型
			params.c_action = 'record';
			//表格id
			params.c_tableid = this.tableId;
			//数据类型
			params.c_datatype = this.dataType;
			//每页显示的记录数
			params.c_pageSize = this.pageSize;
			//当前页数
			params.c_pagenum = this.pageIndex;
			var self = this;
			jQuery.ajax({
				async: bAsync,
				dataType: this.dataType,
				url: this.url,
				data: params,
				success: function(data){
					self.records = self.dataReader.readData(data);
					self.recordCount = self.dataReader.getRecordCount();
					if(self.pageSize == -1){
						self.pageCount = 1;
					}else{
						self.pageCount = self.dataReader.getPageCount();
					}
					if(self.complete){
						self.complete();
					}
					if(success){
						success.apply(self);
					}
				},
				error: function(e){
					if(error){
						error.apply(self,arguments);
					}
				}
			});
		},
		
		executeform: function(form){
			var xql = null;
			if(form.type == "insert"){
				xql = this.getInsertXML(form);
			}
			if(form.type == "update"){
				xql = this.getUpdateXML(form);
			}
			if(form.type == "delete"){
				xql = this.getDeleteXML(form);
			}
			
			var result = this.execute(xql);
			
			return result;
		},
		
		execute: function(xql, async, callback){
			var self = this;
			var result = false;
			async = async ? false : true;
			var params = {};
			//数据服务类型
			params.c_action = 'execute';
			//表格id
			params.c_tableid = this.tableId;
			//数据类型
			params.c_datatype = "json";
			//每页显示的记录数
			params.c_xml = xql;
			jQuery.ajax({
				async: async,
				dataType: "json",
				type: "POST",
				url: this.url,
				data: params,
				success: function(data){
					result = data.result;
					if(callback){
						callback(result);
					}
				}
			});
			
			return result;
		},
		
		/**
		 * 获得元数据
		 * return CField[]
		 */
		getMeta: function(){		
			return this.meta;
		},
		
		/**
		 * 获得缓存中的所有记录，
		 * 如果处于过滤状态，则只返回过滤后的记录
		 * 图表等一次性加载所有数据的组件使用该方法。
		 */
		getRecords: function(){
			return this.records;
		},
		
		/**
		 * 获得总记录数
		 *
		 */
		getRecordCount: function(){
			return this.recordCount;
		},
		
		/**
		 * 添加url参数
		 */
		addParam: function(key, value){
			this.params[key] = value;
		},
		
		/**
		 * 删除url参数
		 */
		removeParam: function(key){
			this.params[key] = null;
		},
		
		/**
		 * 设置数据集参数
		 */
		setParams: function(params){
			if(typeof(params) != "object"){
				alert("方法setParams 参数不合法");
				return;
			}
			this.params = params;
		},
		
		/**
		 * 清空参数
		 */
		clearParams: function(){
			this.params = {};
		}
	});
})(jQuery.fn);