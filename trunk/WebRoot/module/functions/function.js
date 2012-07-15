JSLoader.load("Panel,Tree,Grid,Box,cui.CUIConnector,FloatDiv,Form,ToolTip,CLog");
var tree = null;
var grid = null;
var floatform = null;
var form = null;
var functiontableid = "c38a4e37-bfe3-4177-937c-068601c83f56";
var functionid = null;
//操作类型1: 功能组 2： 子功能
var oprationtype = 1;

var log = null;
JSLoader.ready(function() {
	
	log = new CUI.CLog("功能",{
		logservice: ctx+"logAction!addLog.action"
	});
	//页面布局
	initLayerout();
	
	//初始化用户组树
	initGroupTree();
	
	//操作区监听
	initOpListeners();
});

/**
 * 页面布局
 */
function initLayerout(){
	var west = $("#tree").Panel({
		anchor: "left",
		title: "功能树",
		width: 200
	}).data("Panel");
	
	var main = $("#main").Panel({
		anchor: "client",
		title: "操作区"
	}).data("Panel");
}

/**
 * 初始化功能树
 */
function initGroupTree(){
	tree = $("#tree").Tree({
		treeid: "tree",
		treewidth: "100%",
		treeheight: "100%"
	}).data("Tree");
	
	tree.setSkin("dhx_skyblue");
	tree.setImagePath(ctx+"plugins/cui/images/tree/csh_dhx_skyblue/");
	tree.loadXML(ctx+"module/functions/tree.xml?v="+Math.random());
	
	tree.opened = function(id, item, state){
		loadChildrenItems(id, item, state);
	}
	
	tree.clicked = function(id, item, state){
		functionid = id;
		createTable(id);
	}
}

/**
 * 操作区监听
 */
function initOpListeners(){
	$(".toolbar_bt.addFun").click(function(){
		oprationtype = 1;
		addFunction();
		return false;
	});
	
	$(".toolbar_bt.editFun").click(function(){
		oprationtype = 1;
		editFunction();
		return false;
	});
	
	$(".toolbar_bt.deleteFun").click(function(){
		oprationtype = 1;
		delFunction();
		return false;
	});
	
	
	$(".toolbar_bt.addSubFun").click(function(){
		oprationtype = 2;
		addSubFunction();
		return false;
	});
	
	$(".toolbar_bt.editSubFun").click(function(){
		oprationtype = 2;
		editSubFunction();
		return false;
	});
	
	$(".toolbar_bt.deleteSubFun").click(function(){
		oprationtype = 2;
		delSubFunction();
		return false;
	});
}

/**
 * 加载子节点
 * @param {Object} id
 * @param {Object} item
 * @param {Object} state
 */
function loadChildrenItems(id, item, state){
	if (state == -1) {
		//加载子节点
		tree.deleteChildItems(id);
		var url = ctx+"functionAction!getChildrenXMLByParentId.action?parentid="+id+"&isgroup=-1&v="+Math.random();
		tree._loadDynXML(id, url);
	}
}

/**
 * 初始化浮动表单
 */
function initfloatform(){
	if(!floatform){
		floatform = $("#formdiv").show().FloatDiv({
			title: "标题",
			draggable: true,
			fadehide: true,
			height: "auto",
			width: "auto"
		}).data("FloatDiv");
		//表单操作
		initFormListener();
	}else{
		floatform.show();
	}
	
}
/**
 * 添加
 */
function addFunction(){
	if(!functionid){
		$.Box.message("提示","请选择添加功能的功能组");
		return false;
	}
	initfloatform();
	floatform.setTitle("添加功能组");
	var connector = new CUI.cui.CUIConnector({
		tableId: functiontableid,
		pageSize: 1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json"
	});
	
	connector.connector(function(){
		form = new CUI.Form({
			type: 1,
			connector: connector,
			formele: $("#dataform")
		});
		form.init(function(){
			form.formdb.getElementById("tparentid").setValue(functionid);
		});
	});
}

/**
 * 添加
 */
function addSubFunction(){
	if(!functionid){
		$.Box.message("提示","请选择添加功能的功能组");
		return false;
	}
	initfloatform();
	floatform.setTitle("添加功能");
	var connector = new CUI.cui.CUIConnector({
		tableId: functiontableid,
		pageSize: 1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json"
	});
	
	connector.connector(function(){
		form = new CUI.Form({
			type: 1,
			connector: connector,
			formele: $("#dataform")
		});
		form.init(function(){
			form.formdb.getElementById("tparentid").setValue(functionid);
			form.formdb.getElementById("tisgroup").setValue(0);
		});
	});
}


/**
 * 修改
 */
function editFunction(){
	if(!functionid){
		$.Box.message("提示","请选择要修改的功能");
		return false;
	}
	initfloatform();
	floatform.setTitle("修改功能信息");
	var connector = new CUI.cui.CUIConnector({
		tableId: functiontableid,
		pageSize: 1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: {
			where : "tid|1|"+functionid
		}
	});
	
	connector.connector(function(){
		form = new CUI.Form({
			type: 2,
			connector: connector,
			formele: $("#dataform")
		});
		form.init();
	});
}


/**
 * 修改
 */
function editSubFunction(){
	if (!grid.selectedRowIds.length || grid.selectedRowIds.length > 1) {
		$.Box.message("提示","请选择一个用户进行修改");
		return false;
	}
	var rowid = grid.selectedRowIds[0];
	var row = grid.dataView.getItemById(rowid);
	var funid = row["tid"];
	
	initfloatform();
	floatform.setTitle("修改功能信息");
	var connector = new CUI.cui.CUIConnector({
		tableId: functiontableid,
		pageSize: 1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: {
			where : "tid|1|"+funid
		}
	});
	
	connector.connector(function(){
		form = new CUI.Form({
			type: 2,
			connector: connector,
			formele: $("#dataform")
		});
		form.init();
	});
}

/**
 * 删除
 */
function delFunction(){
	if(!functionid){
		$.Box.message("提示","请选择要删除的功能");
		return false;
	}
	
	var connector = new CUI.cui.CUIConnector({
		tableId: functiontableid,
		pageSize: 1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: {
			where : "tid|1|"+functionid
		}
	});
	
	connector.connector(function(){
		form = new CUI.Form({
			type: 3,
			connector: connector,
			formele: $("#dataform")
		});
		form.init();
		
		$.Box.confirm("提示","确定要删除该功能组?",{
			callbacks: [function(l, v){//取消
				
			}, function(l, v){//确定
				form.submit(function(){
					$.Box.success("提示", "删除功能成功");
					var node = tree._globalIdStorageFind(functionid);
	      			var parentnode = node.parentObject;
					var parentid = parentnode.id;
					loadChildrenItems(parentid, null, -1);
				});
			}]
		});
	});
}

/**
 * 删除
 */
function delSubFunction(){
	if (!grid.selectedRowIds.length) {
		$.Box.message("提示","请选择要删除的用户");
		return false;
	}
	var rowids = grid.selectedRowIds;
	
	$.Box.confirm("提示","确定要删除选中的功能?",{
		callbacks: [function(l, v){//取消
			
		}, function(l, v){//确定
			for (var i in rowids) {
				var rowid = rowids[i];
				var row = grid.dataView.getItemById(rowid);
				var funid = row["tid"];
				var connector = new CUI.cui.CUIConnector({
					tableId: functiontableid,
					pageSize: 1,
					url: ctx+"/cuiConnector.cui",
					dataType: "json",
					params: {
						where : "tid|1|"+funid
					}
				});
				
				connector.connector(function(){
					form = new CUI.Form({
						type: 3,
						connector: connector,
						formele: $("#dataform")
					});
					form.init();
					
					form.submit(function(){
						createTable(functionid);
					});
				});
			}
			$.Box.success("提示", "删除功能成功");
		}]
	});
}

function createTable(id){
	var connector = new CUI.cui.CUIConnector({
		tableId: functiontableid,
		pageSize: -1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: {
			where: "tparentid|1|"+id+",tisgroup|1|0"
		}
	});
	connector.connector(function(){
		if(grid){
			grid.destroy();
		}
		grid = $("#grid").Grid({
			title: "功能列表",
			pageable: true,
			sortable: true,
			editable: true,
			checkcolumn: true,
			asyncEditorLoading: false,
			datasource: connector
		}).data("Grid");
	});
}

/**
 * 初始化表单监听
 */
function initFormListener(){
	$("#form_control .save").click(function(){
		if (oprationtype == 1) {
			functiongroupformop();
		}else{
			functionformop();
		}
		return false;
	});
	
	$("#form_control .cancle").click(function(){
		if(floatform){
			floatform.hide();
		}
		return false;
	});
}

/**
 * 功能组
 */
function functiongroupformop(){
	form.submit(function(){
		var parentid = functionid;
		if (form.type == 1) {
			$.Box.success("提示", "添加功能成功");
			log.info("添加功能组","添加成功");
		}
		if(form.type == 2){
			$.Box.success("提示", "修改功能成功");
			log.info("修改功能组","修改成功");
			var node = tree._globalIdStorageFind(functionid);
  			var parentnode = node.parentObject;
			parentid = parentnode.id;
		}
		if(floatform){
			floatform.hide();
		}
		loadChildrenItems(parentid, null, -1);
	}, function(){
		$.Box.error("提示", "功能更新失败");
		log.error("更新功能组","更新失败");
	});
}

/**
 * 功能操作
 */
function functionformop(){
	form.submit(function(){
		log.info("更新功能","更新成功");
		createTable(functionid);
		if(floatform){
			floatform.hide();
		}
	}, function(){
		$.Box.error("提示", "功能更新失败");
		log.info("更新功能","更新失败");
	});
}