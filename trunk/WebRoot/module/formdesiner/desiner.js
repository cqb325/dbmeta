JSLoader.load("Panel,Tree,Box,cui.CUIConnector,FloatDiv,Form,ToolTip,CLog,Select");
var meta = null;
var desiner = {};
var formdesiner = null;

var container = null;

var log = null;

JSLoader.ready(function() {
	log = new CUI.CLog("表单设计",{
		logservice: ctx+"logAction!addLog.action"
	});
	
	container = $("#canvas").children("div").addClass("sort");
	
	//获取所有的表格
	getAllTables();
	//页面布局
	initLayerout();
	
	//禁止右键
	$("#canvas").bind("contextmenu",function(e){
		return false;
	}).click(function(){
		$("div.selected").removeClass("selected");
	});
	formdesiner = new CUI.FormDesiner();
	
	//initFields();
	
});

function initFields(){
	var connector = new jQuery.fn.cui.CUIConnector({
		tableId: tableid,
		pageSize: -1,
		url: "/dbmeta/cuiConnector.cui",
		dataType: "json"
	});
	
	connector.connector(function(){
		meta = connector.meta;
		container.empty();
		if (meta.tabledesiner) {
			desiner["tablename"] = meta.tabledesiner.tablename;
			desiner["tableid"] = meta.tabledesiner.tableid;
			desiner.clazz = meta.tabledesiner.clazz;
			
			container[0].className = desiner.clazz + " sort";
			container.append("<h2>表单设计</h2>");
			$("#desiner_w option").removeAttr("selected");
			$("#desiner_w option[value='"+desiner.clazz+"']").attr("selected", true);
			
			desiner.fields = {};
			
			var fieldmetas = meta.fieldMetas;
			
			for (var i in meta.tabledesiner.fields) {
				var fieldname = meta.tabledesiner.fields[i].name;
				var fieldmeta = meta.getFieldMetaByName(fieldname);
				var fieldchnname = fieldmeta.getfieldchnname();
				addField2Canvas(fieldmeta, meta.tabledesiner.fields[i]);
			}
			
			var formbt = $("<div>").addClass("form_tool");
			var submit = $("<a href='#' class='toolbar_bt submit'>提 交</a>");
			var cancel = $("<a href='#' class='toolbar_bt cancel'>取 消</a>");
			
			formbt.append(submit);
			formbt.append(cancel);
			container.append(formbt);
		}
		else {
			desiner["tablename"] = meta.tableName;
			desiner["tableid"] = meta.tableId;
			desiner.clazz = "container_12";
			
			container[0].className = desiner.clazz + " sort";
			container.append("<h2>哈哈</h2>");
			
			desiner.fields = {};
			var fieldmetas = meta.fieldMetas;
			//var outer = $("ul.outer").empty();
			for (var i in fieldmetas) {
				var fieldmeta = fieldmetas[i];
				var fieldchnname = fieldmeta.getfieldchnname();
				addField2Canvas(fieldmeta);
			}
			
			var formbt = $("<div>").addClass("form_tool");
			var submit = $("<a href='#' class='toolbar_bt submit'>提 交</a>");
			var cancel = $("<a href='#' class='toolbar_bt cancel'>取 消</a>");
			
			formbt.append(submit);
			formbt.append(cancel);
			container.append(formbt);
		}
	});
}

function addField2Canvas(fieldmeta, fieldsiner){
	var type = fieldsiner ? fieldsiner.type : getType(fieldmeta);
	var showable = fieldmeta.getshowable();
	var field = null;
	if (fieldsiner) {
		field = fieldsiner;
	}
	else {
		if (showable == 0 || showable == "0") {
			field = {
				label: fieldmeta.getfieldchnname(),
				clazz: "grid_3",
				type: "hidden"
			};
		}
		else {
			field = {
				label: fieldmeta.getfieldchnname(),
				clazz: "grid_3",
				type: type
			};
		}
	}
	var name = fieldmeta.getfieldname();
	desiner.fields[name] = field;
	
	var fieldw = $("<div>").addClass(field.clazz+" field");
	if (showable == 0 || showable == "0") {
		fieldw.addClass("hide");
	}
	var label = $("<div>").addClass("cui-form-label").html(fieldmeta.getfieldchnname());
	var ele = formdesiner._createFormElementByType(name, {type: type}).addClass("cui-form-ele");
	
	field.height ? ele.height(field.height) : false;
	
	fieldw.append(label);
	fieldw.append(ele);
	
	
	fieldw.click(function(){
		$("div.selected").removeClass("selected");
		$(this).addClass("selected");
		$("#field_prop").show();
		
		$("#field_w option").removeAttr("selected");
		$("#field_type option").removeAttr("selected");
		$("#field_w option[value='"+field.clazz+"']").attr("selected", true);
		$("#field_type option[value='"+field.type+"']").attr("selected", true);
		$("#field_h").val(ele.height());
		return false;
	});
			
	container.append(fieldw);
}
function initLayerout(){
	$("#tables").Select();
	$("#desiner_w").Select();
	$("#field_w").Select();
	$("#field_type").Select();
	$("#section").Panel({
		anchor: "client"
	});
	$("#right_section").Panel({
		anchor: "right",
		width: 220,
		title: "属性-操作"
	});
	$("#main").Panel({
		anchor: "client",
		title: "设计区域"
	});
	
	container.sortable({
		connectWith: '.sort'
	}).disableSelection();
	
	
	$(".cleardesiner").click(function(){
		$.Box.confirm("提示","确定清除?", {
			callbacks: [function(l, v){//取消
				
			}, function(l, v){//确定
				$("#canvas div.container_12").empty();
			}]
		});
		
		return false;
	});
	
	$(".delete").click(function(){
		var fieldname = $("div.selected").find(".cui-form-ele").attr("name");
		$("div.selected").remove();
		desiner[fieldname] = undefined;
		return false;
	});
	
	$(".save").click(function(){
		var desiner = getdesiner();
		var connector = new jQuery.fn.cui.CUIConnector({
			tableId: "df8934c2-8398-4060-8a69-5f159fc495db",
			pageSize: 1,
			url: "/dbmeta/cuiConnector.cui",
			dataType: "json",
			params: {tableid: tableid}
		});
		connector.connector(function(){
			var form = new CUI.Form({
				type: 2,
				connector: connector,
				formele: $("#dataform")
			});
			
			form.init(function(){
				form.formdb.getElementById("tabledesiner").setValue(decode(desiner));
			});
			
			form.submit(function(){
				$.Box.message("提示","保存成功!");
				log.info("修改"+connector.meta.getTableName()+"的表单设计", "修改成功");
			});
		});
		
		return false;
	});
	
	$("#field_w").change(function(){
		var value = $(this).val();
		var ele = $("div.selected").find(".cui-form-ele");
		var label = $("div.selected").find(".cui-form-label");
		var fieldname = $("div.selected").find(".cui-form-ele").attr("name");
		var field = desiner.fields[fieldname];
		if (field.clazz) {
			$("div.selected").removeClass(field.clazz);
			$("div.selected").addClass(value);
			ele.removeClass(field.clazz);
			ele.addClass(value);
			label.removeClass(field.clazz);
			label.addClass(value);
			desiner.fields[fieldname].clazz = value;
		}else{
			alert(fieldname+"没有clazz");
		}
	});
	
	$("#field_h").change(function(){
		var value = $(this).val();
		var ele = $("div.selected").find(".cui-form-ele");
		var fieldname = $("div.selected").find(".cui-form-ele").attr("name");
		var field = desiner.fields[fieldname];
		ele.height(value);
		desiner.fields[fieldname]["height"] = value;
	});
	
	$("#desiner_w").change(function(){
		var value = $(this).val();
		
		$("#canvas").children("div").removeClass(desiner.clazz);
		$("#canvas").children("div").addClass(value);
		desiner.clazz = value;
	});
	$("#field_type").change(function(){
		var value = $(this).val();
		var fieldname = $("div.selected").find(".cui-form-ele").attr("name");
		
		$("div.selected").find(".cui-form-ele").remove();
		var ele = formdesiner._createFormElementByType(fieldname, {type: value}).addClass("cui-form-ele");
		$("div.selected").append(ele);
		desiner.fields[fieldname].type = value;
	});
	
	$("#tables").change(function(){
		var value = $(this).val();
		tableid = value;
		initFields();
	});
}

function getType(fieldmeta){
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
}

function getdesiner(){
	var newdesiner = {
		tablename: desiner.tablename,
		tableid: desiner.tableid,
		clazz: desiner.clazz,
		fields: []
	};
	$(".field").each(function(){
		var ele = $(this).find(".cui-form-ele");
		var fieldname = ele.attr("name");
		var field = desiner.fields[fieldname];
		if (field) {
			var newfield = {
				type: field.type,
				label: field.label,
				clazz: field.clazz,
				name: fieldname,
			};
			field.height == undefined ? false :  newfield.height = field.height;
			newdesiner.fields.push(newfield);
		}
	});
	
	return newdesiner;
}

function decode(json){
	var arr = [];
	var self = this;
	var fmt = function(s){
		if(typeof s == "object" && s != null){
			return self.decode(s);
		}
		return /^(string|number)$/.test(typeof(s)) ? "'"+s+"'" : s;
	}
	if (json instanceof Array) {
		for (var i in json) {
			arr.push(fmt(json[i]));
		}
		return '[' + arr.join(',') + ']';
		
	}
	else {
		for (var i in json) {
			arr.push("'" + i + "':" + fmt(json[i]));
		}
		return '{' + arr.join(',') + '}';
	}
}

/**
 * 获取所有的表格
 */
function getAllTables(){
	var connector = new jQuery.fn.cui.CUIConnector({
		tableId: "df8934c2-8398-4060-8a69-5f159fc495db",
		url: ctx + "cuiConnector.cui",
		dataType: "json"
	});
	
	
	connector.connector(function(){
		if(connector.records){
			for(var i in connector.records){
				var record = connector.records[i];
				var tableid = record.get("tableid");
				var tablechnname = record.get("tablechnname");
				var option = $("<option>").attr("value", tableid).html(tablechnname);
				$("#tables").append(option);
			}
		}
	});
}
