(function(cuiPackage){
	/**
	 * @class CUI.Form
	 * 表单
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("Form",{
		/**
		 * 表单数据库
		 * @type {object}
		 */
		formdb: null,
		/**
		 * 表单元素
		 * @type {object}
		 */
		elements: null,
		/**
		 * 表单对象
		 * @type {object}
		 */
		formele: null,
		/**
		 * CUIConnector对象
		 * @type {object}
		 */
		connector: null,
		/**
		 * 表单类型 1: 添加 2：修改 3：删除
		 * @type {Number}
		 */
		type: false,
		
		editorDimension: {
			width: 200,
			height: 100
		},
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
		},
		
		/**
		 * @private
		 * @description 初始化
		 */
		init: function(success){
			//创建表单
			this._createForm();
			//初始化表单数据库
			this._initFormDB();
			//初始化表单元素对象
			this._initFormElements();
			//添加事件监听
			this._addListeners();
			//验证
			this._validate();
			
			if(success){
				success(self);
			}
		},
		
		_initFormDB: function(){
			if(this.connector){
				var records = this.connector.records;
				var meta = this.connector.meta;
				
				//初始化formdb
				this.formdb = new cuiPackage.FormDB({
					connector: this.connector,
					records: records,
					meta: meta
				});
			}
		},
		
		_initFormElements: function(){
			if(this.connector){
				var meta = this.connector.meta;
				if(meta){
					var fieldMetas = meta.fieldMetas;
					for(var i in fieldMetas){
						var element = this._createElement(fieldMetas[i]);
						this.elements.push(element);
						var issetvalue = this.type == 1 ? false : this.type;
						this.formdb.addElement(element, issetvalue);
					}
				}
			}
		},
		
		_createForm: function(){
			var html = [];
			html.push('<table class="cui-form"><tbody>');
			if(this.connector){
				var meta = this.connector.meta;
				if(meta){
					var fieldMetas = meta.fieldMetas;
					for(var i in fieldMetas){
						var fieldmeta = fieldMetas[i];
						var showable = fieldmeta.getshowable();
						var display = showable=="-1" ? "" : "none";
						var fieldeditable = fieldmeta.getfieldeditable();
						var disabled = fieldeditable == "-1" ? false : true;
						html.push('<tr style="display:'+display+'">');
						html.push('<td class="cui-form-lable">');
						html.push(fieldmeta.getfieldchnname()+':');
						html.push('</td>');
						html.push('<td class="cui-form-field">');
						
						var ele = this._createFormElement(fieldmeta, disabled);
						html.push(ele);
						html.push('</td>');
						html.push('</tr>');
					}
				}
			}
			html.push('</tbody></table>');
			
			if(this.formele){
				this.formele = typeof(this.formele) == "object" ? this.formele : jQuery(this.formele);
				$(this.formele).empty().append(html.join(""));
			}
		},
		
		setFormdb: function(formdb){
			this.formdb = formdb;
		},
		
		_addListeners: function(){
			for(var i in this.formdb.elements){
				var element = this.formdb.elements[i];
				if(element.elementid && jQuery("#"+element.elementid).length){
					var self = this;
					jQuery("#"+element.elementid).change(function(){
						var id = $(this)[0].id;
						self.formdb.getElementById(id).valuechange($(this).val());
					});
				}
			}
		},
		
		submit: function(success, error){
			if(this.formele.validationEngine('validate')){
				this.formdb.executeRecord(this.type, success, error);
			}
		},
		
		_createElement: function(fieldmeta){
			var fieldtype = fieldmeta.getfieldtype();
			var name = fieldmeta.getfieldname();
			var chnname = fieldmeta.getfieldchnname();
			var hastablecode = fieldmeta.getcodetable();
			if(parseInt(fieldtype) == 3){
				return new CUI.DateInput({
					name: name,
					elementid: name,
					label: chnname,
					fieldmeta: fieldmeta
				});
			}
			if(hastablecode){
				return new CUI.ComBox({
					name: name,
					elementid: name,
					label: chnname,
					fieldmeta: fieldmeta
				});
			}
			if(parseInt(fieldtype) == 7){
				return new CUI.TextArea({
					name: name,
					elementid: name,
					label: chnname,
					fieldmeta: fieldmeta,
					width: this.editorDimension.width,
					height: this.editorDimension.height
				});
			}else{
				return new CUI.InputText({
					name: name,
					elementid: name,
					label: chnname,
					fieldmeta: fieldmeta
				});
			}
		},
		
		_createFormElement: function(fieldmeta, disabled){
			var ele = null;
			if(parseInt(fieldmeta.getfieldtype()) == 7){
				if(disabled){
					ele = '<textarea name="'+fieldmeta.getfieldname()+'" id="'+fieldmeta.getfieldname()+'" disabled="'+disabled+'"></textarea>';
				}else{
					ele = '<textarea name="'+fieldmeta.getfieldname()+'" id="'+fieldmeta.getfieldname()+'"></textarea>';
				}
			}else{
				if(disabled){
					ele = '<input name="'+fieldmeta.getfieldname()+'" id="'+fieldmeta.getfieldname()+'" disabled="'+disabled+'">';
				}else{
					ele = '<input name="'+fieldmeta.getfieldname()+'" id="'+fieldmeta.getfieldname()+'">';
				}
			}
			
			return ele;
		},
		
		_validate: function(){
			if(this.formele){
				this.formele = typeof(this.formele) == "object" ? this.formele : jQuery(this.formele);
			}			
			this.formele.validationEngine();
		}
	});
})(jQuery.fn);