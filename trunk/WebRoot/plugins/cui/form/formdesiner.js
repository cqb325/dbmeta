(function(cuiPackage){
	/**
	 * @class CUI.FormDB
	 * 表单设计器
	 * @author cqb
	 * @version 2.0
	 */
	cuiPackage.Class("FormDesiner",{
		elements: null,
		form: null,
		container: null,
		title: null,
		formwidgets: null,
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
			this.formwidgets = [];
		},
		
		init: function(){
			this.create();
			this._init();
		},
		
		create: function(){
			if (this.form.connector) {
				var meta = this.form.connector.meta;
				if (meta) {
					var desiner = meta.tabledesiner;
					if (desiner) {
						this._create(desiner);
					}else{
						this._createbymeta(meta);
					}
				}
			}
		},
		
		_create: function(desiner){
			this.container = $("<div>").addClass(desiner.clazz);
			if (desiner.title) {
				this.title = $("<h2>").html(desiner.title);
				this.container.append(this.title);
			}
			if(desiner.fields){
				for (var i in desiner.fields) {
					var field = desiner.fields[i];
					var fieldname = field.name;
					this._createFormElement(fieldname, field);
				}
			}
			if(this.form.formele){
				this.form.formele = typeof(this.form.formele) == "object" ? this.form.formele : jQuery(this.form.formele);
				$(this.form.formele).empty().append(this.container);
			}
		},
		
		_createbymeta: function(meta){
			this.container = $("<div>");
			if(meta){
				for (var i in meta.fieldMetas) {
					var field = meta.fieldMetas[i];
					var fieldname = field.getfieldname();
					this._createFormElementByMeta(fieldname, field);
				}
			}
			if(this.form.formele){
				this.form.formele = typeof(this.form.formele) == "object" ? this.form.formele : jQuery(this.form.formele);
				$(this.form.formele).empty().append(this.container);
			}
		},
		
		_createFormElementByMeta: function(fieldname, field){
			var divw = $("<div>");
			var label = $("<div>").html(field.getfieldchnname());
			var ele = this._createFormElementByType(fieldname, field).addClass("cui-form-ele");
			ele.data("parent", divw);
			
			this.elements.push(ele[0]);
			
			divw.append(label);
			divw.append(ele);
			
			this.container.append(divw);
		},
		
		_createFormElement: function(fieldname, field){
			var divw = $("<div>").addClass(field.clazz);
			var label = $("<div>").addClass(field.clazz).html(field.label);
			var ele = this._createFormElementByType(fieldname, field).addClass(field.clazz).addClass("cui-form-ele");
			field.height ? ele.height(field.height) : false;
			
			ele.data("parent", divw);
			ele.data("desiner", field);
			
			this.elements.push(ele[0]);
			
			divw.append(label);
			divw.append(ele);
			
			this.container.append(divw);
		},
		
		_createFormElementByType: function(fieldname, field){
			var type = field.getfieldtype ? this.getType(field) : field.type;
			var ele = null;
			switch(type){
				case "text":
				case "password":
				case "date":
				case "hidden": {
					var fieldtype = type == "date" ? "text" : type;
					ele = $("<input>").attr({
						name: fieldname,
						id: fieldname,
						type: fieldtype
					});
					break;
				}
				case "select":
				case "multiselect": {
					ele = $("<select>").attr({
						name: fieldname,
						id: fieldname
					});
					break;
				}
				case "edit": {
					ele = $("<textarea>").attr({
						name: fieldname,
						id: fieldname
					});
					break;
				}
				case "image": {
					ele = $("<div>").attr({
						name: fieldname,
						id: fieldname
					});
					break;
				}
			}
			return ele;
		},
		
		getType: function(fieldmeta){
			var ret = "text";
			var type = fieldmeta.getfieldtype();
			var codetable = fieldmeta.getcodetable();
			if(type == 3 || type == 4){
				ret = "date";
			}
			
			if(codetable){
				ret = "select";
			}
			
			if(type ==7){
				ret = "edit";
			}
			
			return ret;
		},
		
		_init: function(){
			if (this.form.connector) {
				var meta = this.form.connector.meta;
				if(meta){
					for (var i in this.elements) {
						var ele = this.elements[i];
						var name = $(ele).attr("name");
						var fieldmeta = meta.getFieldMetaByName(name);
						if (fieldmeta) {
							this._initElementByMeta(ele, name, fieldmeta);
						}
					}
				}
			}
		},
		
		_initElementByMeta: function(ele, name, fieldmeta){
			var desiner = $(ele).data("desiner");
			var showable = fieldmeta.getshowable();
			var display = showable=="-1" ? "block" : "none";
			
			
			var wrapper = $(ele).data("parent");
			if(wrapper){
				wrapper.css("display",display);
				if (desiner && desiner.type == "hidden") {
					wrapper.css("display","none");
				}
			}
			
			this.newFormEleWidget(name, desiner, fieldmeta);
		},
		
		newFormEleWidget: function(name, desiner, fieldmeta){
			var type = desiner ? desiner.type : this.getType(fieldmeta);
			var ele = null;
			switch(type){
				case "text":
				case "password": {
					ele = new CUI.InputText({
						name: name,
						desiner: desiner,
						elementid: name,
						fieldmeta: fieldmeta
					});
					break;
				}
				case "date": {
					ele = new CUI.DateInput({
						name: name,
						desiner: desiner,
						elementid: name,
						fieldmeta: fieldmeta
					});
					break;
				}
				case "select": {
					ele = new CUI.ComBox({
						name: name,
						desiner: desiner,
						elementid: name,
						fieldmeta: fieldmeta
					});
					break;
				}
				case "multiselect": {
					ele = new CUI.MultiSelect({
						name: name,
						desiner: desiner,
						elementid: name,
						fieldmeta: fieldmeta
					});
					break;
				}
				case "edit": {
					ele = new CUI.TextArea({
						name: name,
						desiner: desiner,
						elementid: name,
						fieldmeta: fieldmeta
					});
					break;
				}
				default : {
					ele = new CUI.InputText({
						name: name,
						elementid: name,
						desiner: desiner,
						fieldmeta: fieldmeta
					});
					break;
				}
			}
			this.formwidgets.push(ele);
		}
	});
})(jQuery.fn);