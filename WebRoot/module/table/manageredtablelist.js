JSLoader.load("Panel,Tree,Grid,Box,cui.CUIConnector,FloatDiv,Form,ToolTip");
var tableid = "df8934c2-8398-4060-8a69-5f159fc495db";
var grid = null;
var tablelist = null;
JSLoader.ready(function() {
	//页面布局
	initLayerout();
	
	initGrid();
	
	//操作区监听
	initOpListeners();
});

/**
 * 页面布局
 */
function initLayerout(){
	var main = $("#main").Panel({
		anchor: "client",
		title: "操作区"
	}).data("Panel");
}

/**
 * 操作区监听
 */
function initOpListeners(){
	$(".toolbar_bt.add").click(function(){
		showTableList();
		return false;
	});
	
	$(".toolbar_bt.edit").click(function(){
		edit();
		return false;
	});
}

/**
 * 初始化表格
 */
function initGrid(){
	var conn = initConnector();
	conn.connector(function(){
		if(grid){
			grid.destroy();
		}
		grid = $("#grid").Grid({
			title: "表格列表",
			pageable: true,
			sortable: true,
			editable: true,
			checkcolumn: true,
			asyncEditorLoading: false,
			datasource: conn,
			op_bts: [{id: "table_op",name: "操作",data:'<a href="#" class="op_col delete">删除管理</a><a href="#" class="op_col inter">查看字段元数据</a>'}]
		}).data("Grid");
		
		$(".op_col.delete").click(function(){
			deleteManager(this);
			return false;
		});
		
		$(".op_col.inter").click(function(){
			viewTableFields(this);
			return false;
		});
	});
}

/**
 * 初始化connector
 */
function initConnector(params){
	var connector = new CUI.cui.CUIConnector({
		tableId: tableid,
		pageSize: -1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: params
	});
	
	return connector;
}

/**
 * 删除管理
 */
function deleteManager(obj){
	var tablename = $(obj).parent().parent().children(".l3").html();
	
	var connector = initConnector({tablename: tablename});
	connector.connector(function(){
		form = new CUI.Form({
			type: 3,
			connector: connector,
			formele: $("#dataform")
		});
		form.init();
	});
	$.Box.confirm("提示","确定要删除该记录?",{
		callbacks: [function(l, v){//取消
			
		}, function(l, v){//确定
			form.submit(function(){
				$.Box.success("提示", "删除记录成功");
				initGrid();
			});
		}]
	});
}

/**
 * 
 */
function viewTableFields(obj){
	var tablename = $(obj).parent().parent().children(".l3").html();
	
	var connector = initConnector({tablename: tablename});
	connector.connector(function(){
		if(connector.records && connector.records.length){
			var record = connector.records[0];
			var tableid = record.get("tableid");
			var tablename = record.get("tablename");
			var tableserverid = record.get("tableserverid");
			var url = "module/field/list.jsp?tableid="+tableid+"&tablename="+tablename+"&tableserverid="+tableserverid;
			window.location.href=url;
		}
	});
}

/**
 * 表格列表
 */
function showTableList(){
	if(!tablelist){
		tablelist = $("#tableList").FloatDiv({
			title: "表格列表",
			draggable: true,
			fadehide: true,
			ismode: true,
			framemode: true,
			height: 400,
			width: 350,
		}).data("FloatDiv");
	}else{
		tablelist.show();
	}
	tablelist.setContent({
		url: "dbAction!getAllTables.action"
	});
}

/**
 * 
 */
function edit(){
	if (!grid.selectedRowIds.length || grid.selectedRowIds.length > 1) {
		$.Box.message("提示","请选择一条记录进行修改");
		return false;
	}
	var rowid = grid.selectedRowIds[0];
	var row = grid.dataView.getItemById(rowid);
	var tableid = row["tableid"];
	
	var tablechnname = row["tablechnname"];
	var sql = row["tablesql"];
	var tabletype = row["tabletype"];
	var tablememo = row["tablememo"];
	
	var connector = initConnector({tableid: tableid});
	connector.connector(function(){
		form = new CUI.Form({
			type: 2,
			connector: connector,
			formele: $("#dataform")
		});
		form.init(function(){
			form.formdb.getElementById("tablechnname").setValue(tablechnname);
			form.formdb.getElementById("tablesql").setValue(sql);
			form.formdb.getElementById("tabletype").setValue(tabletype);
			form.formdb.getElementById("tablememo").setValue(tablememo);
		});
		
		form.submit(function(){
			$.Box.success("提示", "删除记录成功");
			initGrid();
		});
	});
	
	return false;
}
