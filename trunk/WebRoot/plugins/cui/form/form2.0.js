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
		 * 表单设计器
		 * @type {object}
		 */
		formdesiner: null,
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
			if(this.formdesiner){
				this.elements = this.formdesiner.formwidgets;
				for(var i in this.formdesiner.formwidgets){
					var element = this.formdesiner.formwidgets[i];
					var issetvalue = this.type == 1 ? false : this.type;
					this.formdb.addElement(element, issetvalue);
				}
			}
		},
		
		_createForm: function(){
			this.formdesiner = new cuiPackage.FormDesiner({
				form: this
			});
			this.formdesiner.init();
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
		
		_validate: function(){
			if(this.formele){
				this.formele = typeof(this.formele) == "object" ? this.formele : jQuery(this.formele);
			}			
			this.formele.validationEngine();
		}
	});
})(jQuery.fn);