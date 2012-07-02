(function(cuiPackage){
	/**
	 * @class CUI.FormDB
	 * 表单数据库
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("FormDB",{
		records: null,
		meta: null,
		rowpoint: 0,
		columnpoint:0,
		pagepoint: 0,
		elements: null,
		connector: null,
		elementmap: null,
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize: function(options){
			for(var i in options){
				this[i] = options[i];
			}
			this.elements = [];
			this.elementmap = {};
		},
		
		/**
		 * @description 数据源发生变化事件
		 */
		dbchange: function(){
			
		},
		
		/**
		 * @description 触发事件
		 * @param {Object} 事件触发对象
		 * @param {String} 事件类型
		 * @param {Object} 参数
		 */
		trigger: function(target, type, data) {
			var callback = target[type];
			return !(jQuery.isFunction(callback) && callback.call(target, data) === false);
		},
		
		getRecord: function(){
			return this.records[this.rowpoint];
		},
		
		getColumnValues: function(){
			return null;
		},
		
		onRowChange: function(){
			for(var i in this.elements){
				var element = this.elements[i];
				var record = this.getRecord();
				var data = {
					record: record
				}
				this.trigger(element, "rowchange", data);
			}
		},
		
		onColumnChange: function(){
			for(var i in this.elements){
				var element = this.elements[i];
				var column = this.getColumnValues();
				var data = {
					columndata: column
				}
				this.trigger(element, "columnchange", data);
			}
		},
		
		onPageChange: function(){
			this.rowpoint = 0;
			this.onRowChange();
		},
		
		addElement: function(ele, issetvalue){
			this.elements.push(ele);
			this.elementmap[ele.name] = ele;
			if(issetvalue){
				ele.setRecord(this.getRecord());
			}else{
				ele.setDefaultValue();
			}
		},
		
		getElements: function(){
			return this.elements;
		},
		
		getElementById: function(id){
			return this.elementmap[id];
		},
		
		/**
		 * @description 添加记录
		 * @param {Number} type 执行类型
		 * @param {Function} success 成功回调
		 * @param {Function} error 失败回调
		 */
		executeRecord: function(type, success, error){
			var xql = null;
			switch(type){
				case 1: {
					xql = this.getInsertXML();
					break;
				}
				case 2: {
					xql = this.getUpdateXML();
					break;
				}
				case 3: {
					xql = this.getDeleteXML();
					break;
				}
			}
			if(xql){
				this.connector.execute(xql, true, function(result){
					if(result){
						if(success && jQuery.isFunction(success)){
							success();
						}
					}else{
						if(error && jQuery.isFunction(error)){
							error();
						}
					}
				});
			}
		},
		
		/**
		 * @description 获取添加记录xml
		 */
		getInsertXML: function(){
			var xml = [];
			xml.push('<records optype="insert">');
			xml.push('<record>');
			for(var i=0; i<this.elements.length; i++){
				var element = this.elements[i];
				var filedname = element.name;
				var filedvalue = element.value;
				var fieldmeta = element.fieldmeta;
				xml.push('<field ');
				xml.push('id="'+filedname+'" ');
				xml.push('type="'+fieldmeta.getfieldtype()+'" ');
				xml.push('iskey="'+fieldmeta.getfieldiskey()+'" ');
				//主键
				if(fieldmeta.getfieldiskey() == "-1"){
					//存在主键类型添加主键类型
					var fieldseqid = fieldmeta.getfieldseqid();
					if(fieldseqid){
						xml.push('seqid="'+fieldmeta.getfieldseqid()+'" ');
					}
				}
				xml.push('>');
				xml.push(filedvalue);
				xml.push('</field>');
			}
			xml.push('</record>');
			xml.push('</records>');
			
			return xml.join("");
		},
		
		/**
		 * @description 获取更新记录xml
		 */
		getUpdateXML: function(){
			var xml = [];
			xml.push('<records optype="update">');
			xml.push('<record>');
			for(var i=0; i<this.elements.length; i++){
				var element = this.elements[i];
				var filedname = element.name;
				var filedvalue = element.value+"";
				var fieldmeta = element.fieldmeta;
				if(filedvalue != "" && element.value != null){
					xml.push('<field ');
					xml.push('id="'+filedname+'" ');
					xml.push('type="'+fieldmeta.getfieldtype()+'" ');
					xml.push('iskey="'+fieldmeta.getfieldiskey()+'" ');
					xml.push('>');
					xml.push(filedvalue);
					xml.push('</field>');
				}
			}
			xml.push('<where>');
			var record = this.getRecord();
			for(var i=0; i<this.elements.length; i++){
				var element = this.elements[i];
				var filedname = element.name;
				var value = record.get(filedname)+"";
				var fieldmeta = element.fieldmeta;
				if(value != "" && record.get(filedname) != null){
					xml.push('<field ');
					xml.push('id="'+filedname+'" ');
					xml.push('type="'+fieldmeta.getfieldtype()+'" ');
					xml.push('>');
					xml.push(value);
					xml.push('</field>');
				}
			}
			xml.push('</where>');
			xml.push('</record>');
			xml.push('</records>');
			
			return xml.join("");
		},
		
		/**
		 * @description 获取删除记录xml
		 */
		getDeleteXML: function(){
			var xml = [];
			xml.push('<records optype="delete">');
			xml.push('<record>');
			xml.push('<where>');
			var record = this.getRecord();
			for(var i=0; i<this.elements.length; i++){
				var element = this.elements[i];
				var filedname = element.name;
				var filedvalue = element.value+"";
				var fieldmeta = element.fieldmeta;
				if(filedvalue != "" && element.value != null){
					xml.push('<field ');
					xml.push('id="'+filedname+'" ');
					xml.push('type="'+fieldmeta.getfieldtype()+'" ');
					xml.push('>');
					xml.push(filedvalue);
					xml.push('</field>');
				}
			}
			xml.push('</where>');
			xml.push('</record>');
			xml.push('</records>');
			
			return xml.join("");
		}
	});
})(jQuery.fn);