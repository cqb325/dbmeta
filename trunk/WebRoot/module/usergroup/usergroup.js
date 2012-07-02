JSLoader.load("Panel,Tree,Grid,Box,cui.CUIConnector,FloatDiv,Form,ToolTip");
var tree = null;
var grid = null;
var ugid = null;
var uid = null;
var floatform = null;
var form = null;
var usergrouptableid = "f5bce544-0771-497e-86a8-77e4ff578579";
var usertableid = "a8f1ce50-7124-4a6b-8fec-0780fb8bba9b";
JSLoader.ready(function() {
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
		ugid = id;
		createUserTable(id);
	}
}

/**
 * 操作区监听
 */
function initOpListeners(){
	$(".toolbar_bt.addUg").click(function(){
		addgroup();
		$("#form_control").addClass("ugform");
		$("#form_control").removeClass("userform");
		return false;
	});
	
	$(".toolbar_bt.editUg").click(function(){
		editgroup();
		$("#form_control").addClass("ugform");
		$("#form_control").removeClass("userform");
		return false;
	});
	
	$(".toolbar_bt.deleteUg").click(function(){
		delgroup();
		$("#form_control").addClass("ugform");
		$("#form_control").removeClass("userform");
		return false;
	});
	$(".toolbar_bt.addUser").click(function(){
		addUser();
		$("#form_control").addClass("userform");
		$("#form_control").removeClass("ugform");
		return false;
	});
	
	$(".toolbar_bt.editUser").click(function(){
		editUser();
		$("#form_control").addClass("userform");
		$("#form_control").removeClass("ugform");
		return false;
	});
	
	$(".toolbar_bt.deleteUser").click(function(){
		deleteUser();
		$("#form_control").addClass("userform");
		$("#form_control").removeClass("ugform");
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
		var url = ctx+"userGroupAction!getChildrenXMLByParentId.action?parentid="+id+"&v="+Math.random();
		tree._loadDynXML(id, url, function(){
			
		});
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
			height: "auto"
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
function addgroup(){
	if(!ugid){
		$.Box.message("提示","请选择要添加的用户组");
		return false;
	}
	initfloatform();
	floatform.setTitle("添加用户组");
	var connector = new CUI.cui.CUIConnector({
		tableId: "f5bce544-0771-497e-86a8-77e4ff578579",
		pageSize: -1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: {
			ugid : ugid
		}
	});
	
	connector.connector(function(){
		form = new CUI.Form({
			type: 1,
			connector: connector,
			formele: $("#dataform")
		});
		form.init();
	});
}

/**
 * 修改
 */
function editgroup(){
	if(!ugid){
		$.Box.message("提示","请选择要修改的用户组");
		return false;
	}
	initfloatform();
	floatform.setTitle("修改用户组");
	var connector = new CUI.cui.CUIConnector({
		tableId: "f5bce544-0771-497e-86a8-77e4ff578579",
		pageSize: -1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: {
			ugid : ugid
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
function delgroup(){
	if(!ugid){
		$.Box.message("提示","请选择要删除的用户组");
		return false;
	}
	
	var connector = new CUI.cui.CUIConnector({
		tableId: "f5bce544-0771-497e-86a8-77e4ff578579",
		pageSize: -1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: {
			ugid : ugid
		}
	});
	
	connector.connector(function(){
		form = new CUI.Form({
			type: 3,
			connector: connector,
			formele: $("#dataform")
		});
		form.init();
		
		$.Box.confirm("提示","确定要删除该用户组?",{
			callbacks: [function(l, v){//取消
				
			}, function(l, v){//确定
				form.submit(function(){
					$.Box.success("提示", "删除用户组成功");
					var node = tree._globalIdStorageFind(ugid);
	      			var parentnode = node.parentObject;
					var parentid = parentnode.id;
					loadChildrenItems(parentid, null, -1);
				});
			}]
		});
	});
}

function addUser(){
	if(!ugid){
		$.Box.message("提示","请选择要添加用户的用户组");
		return false;
	}
	
	initfloatform();
	floatform.setTitle("添加用户");
	
	var connector = new CUI.cui.CUIConnector({
		tableId: usertableid,
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
			form.formdb.getElementById("ugroupid").setValue(ugid);
		});
	});
}

function editUser(){
	if (!grid.selectedRowIds.length || grid.selectedRowIds.length > 1) {
		$.Box.message("提示","请选择一个用户进行修改");
		return false;
	}
	var rowid = grid.selectedRowIds[0];
	var row = grid.dataView.getItemById(rowid);
	uid = row["uid"];
	
	initfloatform();
	floatform.setTitle("修改用户");
	var connector = new CUI.cui.CUIConnector({
		tableId: usertableid,
		pageSize: 1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params:{uid: uid}
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

function deleteUser(){
	if (!grid.selectedRowIds.length) {
		$.Box.message("提示","请选择要删除的用户");
		return false;
	}
	var rowids = grid.selectedRowIds;
	for(var i in rowids){
		var rowid = rowids[i];
		var row = grid.dataView.getItemById(rowid);
		var uid = row["uid"];
		var connector = new CUI.cui.CUIConnector({
			tableId: usertableid,
			pageSize: -1,
			url: ctx+"/cuiConnector.cui",
			dataType: "json",
			params:{uid: uid}
		});
		
		connector.connector(function(){
			form = new CUI.Form({
				type: 3,
				connector: connector,
				formele: $("#dataform")
			});
			form.init();
			
			$.Box.confirm("提示","确定要删除该用户?",{
				callbacks: [function(l, v){//取消
					
				}, function(l, v){//确定
					form.submit(function(){
						$.Box.success("提示", "删除用户组成功");
						createUserTable(ugid);
					});
				}]
			});
		});
	}
}
var columns = [
	{id:"username", name:"用户名", field:"username", fieldtype: 1, editable:false},
	{id:"ualias", name:"昵称", field:"ualias", fieldtype: 1, editable:true},
	{id:"uemail", name:"邮箱", field:"uemail", fieldtype: 1, editable:true},
	{id:"uphone", name:"电话", field:"uphone", fieldtype: 1, editable:true}
];

function createUserTable(id){
	var connector = new CUI.cui.CUIConnector({
		tableId: "a8f1ce50-7124-4a6b-8fec-0780fb8bba9b",
		pageSize: -1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: {
			where: "ugroupid|1|"+id
		}
	});
	connector.connector(function(){
		if(grid){
			grid.destroy();
		}
		grid = $("#grid").Grid({
			columns: columns,
			title: "用户列表",
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
		if($("#form_control").hasClass("ugform")){
			ugformop();
		}
		if($("#form_control").hasClass("userform")){
			userformop();
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
 * 
 */
function ugformop(){
	form.submit(function(){
		var parentid = ugid;
		if (form.type == 1) {
			$.Box.success("提示", "添加用户组成功");
		}
		if(form.type == 2){
			$.Box.success("提示", "修改用户组成功");
			var node = tree._globalIdStorageFind(ugid);
  			var parentnode = node.parentObject;
			parentid = parentnode.id;
		}
		if(floatform){
			floatform.hide();
		}
		loadChildrenItems(parentid, null, -1);
	}, function(){
		$.Box.error("提示", "用户组更新失败");
	});
}

/**
 * 
 */
function userformop(){
	form.submit(function(){
		if (form.type == 1) {
			$.Box.success("提示", "添加用户成功");
		}
		if(form.type == 2){
			$.Box.success("提示", "修改用户成功");
		}
		if(floatform){
			floatform.hide();
		}
		createUserTable(ugid);
	}, function(){
		$.Box.error("提示", "用户更新失败");
	});
}
