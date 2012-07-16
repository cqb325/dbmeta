JSLoader.load("Panel,Grid,Box,cui.CUIConnector,Form,ToolTip,CLog");

var log = null;
var logtableid = "3332984c-7dd9-428b-b68d-7e8a95f1fc8d";
var grid = null;
JSLoader.ready(function() {
	log = new CUI.CLog("日志管理",{
		logservice: ctx+"logAction!addLog.action"
	});
	
	//页面布局
	initLayerout();
	
	//初始化日志表格
	initLogGrid({
		where: "logtime|21|true"
	});
	
	//操作区监听
	initOpListeners();
});

/**
 * 页面布局
 */
function initLayerout(){
	var main = $("#main").Panel({
		anchor: "client"
	}).data("Panel");
	
	$("#starttime").datepicker({
				changeMonth: true,
				changeYear: true
			},jQuery.datepicker.regional['zh-CN']);
	$("#endtime").datepicker({
				changeMonth: true,
				changeYear: true
			},jQuery.datepicker.regional['zh-CN']);
}

/**
 * 初始化日志表格
 */
function initLogGrid(params){
	var connector = new CUI.cui.CUIConnector({
		tableId: logtableid,
		pageSize: -1,
		url: ctx+"/cuiConnector.cui",
		dataType: "json",
		params: params
	});
	
	connector.connector(function(){
		createGrid(connector);
	});
}

/**
 * 创建表格
 * @param {Object} connector
 */
function createGrid(connector){
	if(grid){
		grid.destroy();
	}
	grid = $("#grid").Grid({
		title: "日志列表",
		pageable: true,
		sortable: true,
		editable: false,
		checkcolumn: true,
		asyncEditorLoading: false,
		datasource: connector
	}).data("Grid");
}

/**
 * 操作区事件
 */
function initOpListeners(){
	$(".delete").click(function(){
		deleteLog();
		return false;
	});
	
	$(".query").click(function(){
		queryLog();
		return false;
	});
}

/**
 * 删除日志
 */
function deleteLog(){
	if (!grid.selectedRowIds.length) {
		$.Box.message("提示","请选择要删除的日志");
		return false;
	}
	var rowids = grid.selectedRowIds;
	
	$.Box.confirm("提示","确定要删除选中的功能?",{
		callbacks: [function(l, v){//取消
			
		}, function(l, v){//确定
			for (var i in rowids) {
				var rowid = rowids[i];
				var row = grid.dataView.getItemById(rowid);
				var logid = row["logid"];
				var connector = new CUI.cui.CUIConnector({
					tableId: logtableid,
					pageSize: 1,
					url: ctx+"/cuiConnector.cui",
					dataType: "json",
					params: {
						where : "logid|1|"+logid
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
						log.info("删除日志","删除成功");
						initLogGrid({
							where: "logtime|21|true"
						});
					});
				});
			}
			$.Box.success("提示", "删除功能成功");
		}]
	});
}

function queryLog(){
	var starttime = $("#starttime").val();
	var endtime = $("#endtime").val();
	var opuser = $("#opuser").val();
	
	var args = [];
	opuser == "" ? false : args.push("username|7|"+opuser);
	if(starttime != "" && endtime != ""){
		args.push("logtime|6|"+starttime+"$"+endtime);
	}else if(starttime != "" && endtime == ""){
		args.push("logtime|2|"+starttime);
	}else if(starttime == "" && endtime != ""){
		args.push("logtime|3|"+endtime);
	}
	
	args.push("logtime|21|true");
	var params = {};
	params["where"] = args.join(",");
	
	initLogGrid(params);
}
