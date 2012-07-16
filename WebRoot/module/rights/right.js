JSLoader.load("Panel,Tree,Box,cui.CUIConnector,ToolTip,Form,CLog");
var ugid = null;
var righttableid = "df1dae5d-2542-4e05-964e-6d445d6c2767";

var log = null;
var usergroupname = null;
JSLoader.ready(function() {
	log = new CUI.CLog("权限管理",{
		logservice: ctx+"logAction!addLog.action"
	});
	
	//页面布局
	initLayerout();
	//初始化用户组树
	initGroupTree();
	//初始化操作
	initOpListeners();
});

/**
 * 页面布局
 */
function initLayerout(){
	var west = $("#tree").Panel({
		anchor: "left",
		title: "用户组",
		width: 200
	}).data("Panel");
	
	var main = $("#main").Panel({
		anchor: "client",
		title: "操作区"
	}).data("Panel");
}

/**
 * 初始化用户组树
 */
function initGroupTree(){
	tree = $("#tree").Tree({
		treeid: "tree",
		treewidth: "100%",
		treeheight: "100%"
	}).data("Tree");
	
	tree.setSkin("dhx_skyblue");
	tree.setImagePath(ctx+"plugins/cui/images/tree/csh_dhx_skyblue/");
	tree.loadXML(ctx+"module/usergroup/tree.xml?v="+Math.random());
	
	tree.opened = function(id, item, state){
		loadChildrenItems(id, item, state);
	}
	
	tree.clicked = function(id, item, state){
		if(id != -1){
			ugid = id;
			usergroupname = tree.getItemText(id);
			getDesinerXML();
		}
	}
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
		var url = ctx+"userGroupAction!getChildrenXMLByParentId.action?parentid="+id+"&v="+Math.random();
		tree._loadDynXML(id, url, function(){
			
		});
	}
}

/**
 * 
 */
function getDesinerXML(){
	if(ugid){
		window.desiner.loadRights(ugid);
	}
}

/**
 * 操作按钮监听
 */
function initOpListeners(){
	$(".toolbar_bt.update").click(function(){
		updateRight();
	});
}

/**
 * 更新权限
 */
function updateRight(){
	if(!ugid){
		$.Box.message("提示","请选择要更新权限的用户组");
		return false;
	}
	var data = window.desiner.getTablesData();
	
	//删除所有权限
	deleteRight(ugid);
	
	addRights(data);
}

/**
 * 删除该用户的权限
 * @param {Object} guid
 */
function deleteRight(guid){
	var connector = createConnector({
		ugid : ugid
	});
	
	connector.connector(function(){
		if(connector.records.length){
			var form = new CUI.Form({
				type: 3,
				connector: connector,
				formele: $("#dataform")
			});
			form.init();
			//执行删除
			form.submit();
		}
	});
}

/**
 * 添加权限
 * @param {Object} data
 */
function addRights(data){
	for(var i in data){
		var table = data[i];
		for(var j in table.rows){
			var row = table.rows[j];
			if(row["def"]){
				addRight(row);
			}
		}
		updateorinsertDesiner(table);
	}
}

function addRight(row){
	var resid = row["id"];
	var restype = row["restype"];
	
	var connector = createConnector();
	connector.connector(function(){
		if (connector.records.length) {
			var form = new CUI.Form({
				type: 1,
				connector: connector,
				formele: $("#dataform")
			});
			form.init(function(){
				form.formdb.getElementById("ugid").setValue(ugid);
				form.formdb.getElementById("resid").setValue(resid);
				form.formdb.getElementById("restype").setValue(restype);
			});
			
			form.submit(function(){
				$.Box.message("提示","更新成功");
				log.info("修改"+usergroupname+"的权限","修改成功");
			});
		}
	});
}

function updateorinsertDesiner(table){
	var resid = table.id;
	var restype = table.restype;
	console.log(table);
	var x = table.x;
	var y = table.y;
	
	var connector = new CUI.cui.CUIConnector({
		tableId: "ed9b57b4-9a73-44d6-a4f0-b3e8fa53b99a",
		pageSize: 1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: {resid: resid, restype:restype}
	});
	connector.connector(function(){
		var formtype = connector.records.length ? 2 : 1;
		var form = new CUI.Form({
			type: formtype,
			connector: connector,
			formele: $("#dataform")
		});
		form.init(function(){
			form.formdb.getElementById("resid").setValue(resid);
			form.formdb.getElementById("restype").setValue(restype);
			form.formdb.getElementById("x").setValue(x);
			form.formdb.getElementById("y").setValue(y);
		});
		
		form.submit();
	});
}
function createConnector(params){
	var connector = new CUI.cui.CUIConnector({
		tableId: righttableid,
		pageSize: 1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: params
	});
	
	return connector;
}