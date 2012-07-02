(function(cuiPackage){
	/**
	 * @class CUI.DBLink
	 * 表单数据库
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("DBLink",{
		name: null,
		value: null,
		fieldmeta: null,
		record: null,
		columndata: null,
		elementid: null,
		rule: null,
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize: function(options){
			for(var i in options){
				this[i] = options[i];
			}
			this.rule = [];
			this._addRule();
		},
		
		_addRule: function(){
			if(this.fieldmeta){
				//字段类型
				var fieldsize = this.fieldmeta.getfieldsize();
				//字段规则
				var fieldrule = this.fieldmeta.getfieldrule();
				//是否必须
				var fieldrequired = this.fieldmeta.getfieldrequired();
				
				//是否必须的
				if(fieldrequired == "-1"){
					this.rule.push("required");
				}
				
				//字段长度
				if(parseInt(fieldsize) > 0){
					this.rule.push("maxSize["+fieldsize+"]");
				}
				
				//邮箱
				if(parseInt(fieldrule) == 1){
					this.rule.push("custom[email]");
				}
				if(parseInt(fieldrule) == 2){
					this.rule.push("custom[url]");
				}
				if(parseInt(fieldrule) == 3){
					this.rule.push("custom[phone]");
				}
				if(parseInt(fieldrule) == 4){
					this.rule.push("custom[postcode]");
				}
				if(parseInt(fieldrule) == 5){
					this.rule.push("custom[ipv4]");
				}
				if(parseInt(fieldrule) == 6){
					this.rule.push("custom[idcard]");
				}
				if(parseInt(fieldrule) == 7){
					this.rule.push("custom[integer]");
				}
				if(parseInt(fieldrule) == 8){
					this.rule.push("custom[minusint]");
				}
				if(parseInt(fieldrule) == 9){
					this.rule.push("custom[float]");
				}
				if(parseInt(fieldrule) == 10){
					this.rule.push("custom[date]");
				}
				if(parseInt(fieldrule) == 11){
					this.rule.push("custom[time]");
				}
				if(parseInt(fieldrule) == 12){
					this.rule.push("custom[datetime]");
				}
				if(parseInt(fieldrule) == 13){
					this.rule.push("custom[year]");
				}
				if(parseInt(fieldrule) == 14){
					this.rule.push("custom[month]");
				}
				if(parseInt(fieldrule) == 15){
					this.rule.push("custom[day]");
				}
				if(parseInt(fieldrule) == 16){
					this.rule.push("custom[onlyLetterNumber]");
				}
				if(parseInt(fieldrule) == 17){
					this.rule.push("custom[chinese]");
				}
				if(parseInt(fieldrule) == 18){
					this.rule.push("custom[onlyNumberSp]");
				}
				if(parseInt(fieldrule) == 19){
					this.rule.push("custom[onlyLetterSp]");
				}
				if(parseInt(fieldrule) == 20){
					this.rule.push("custom[nospecial]");// /^([\u4E00-\u9FA5]|\w)*$/
				}
				$("#"+this.elementid).addClass("validate["+this.rule.join(",")+"]");
			}
		},
		
		getValue: function(){
			return this.value;
		},
		
		setValue: function(value){
			this.value = value;
			if (this.fieldmeta) {
				
			}
			if(this.elementid){
				$("#"+this.elementid).val(this.value);
				if(this.labelele && $.trim($("#"+this.elementid).val()) != ""){
					this.labelele.remove();
				}
			}
		},
		
		setDefaultValue: function(){
			if (this.fieldmeta) {
				var defaultvalue = this.fieldmeta.getfielddefaultvalue();
				if(defaultvalue && defaultvalue != ""){
					this.setValue(defaultvalue);
				}
			}
		},
		
		rowchange: function(options){
			this.setRecord(options.record);
		},
		
		columnchange: function(options){
			this.columndata = options.columndata;
		},
		
		setRecord: function(record){
			this.record = record;
			var value = this.record.get(this.name);
			this.setValue(value);
		},
		
		setFieldmeta: function(fieldmeta){
			this.fieldmeta = fieldmeta;
		},
		
		valuechange: function(value){
			this.value = value;
		}
	});
})(jQuery.fn);