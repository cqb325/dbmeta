JSLoader.load("Panel,Box,cui.CUIConnector,ToolTip,Form,Grid");
var griddata = null;
var grid = null;
JSLoader.ready(function() {
	//页面布局
	initLayerout();
	
	griddata = eval('('+jsonstr+')');
	
	if(griddata){
		createGrid();
	}
	
	initoperation();
});

/**
 * 页面布局
 */
function initLayerout(){
	var main = $("#main").Panel({
		anchor: "client"
	}).data("Panel");
}

function createGrid(){
	if(grid){
		grid.destroy();
	}
	grid = $("#grid").Grid({
		title: "excel数据列表",
		pageable: true,
		sortable: false,
		editable: false,
		asyncEditorLoading: false,
		columns: griddata["columns"],
		data: griddata["data"]
	}).data("Grid");
}

function initoperation(){
	$(".toolbar_bt.upload").click(function(){
		var tableid = $("#tablename").val();
		if(!tableid || tableid == ""){
			$.Box.message("提示","请选择上传数据的表格");
			return false;
		}
		if(grid && tableid != ""){
			jQuery.ajax({
				async: true,
				dataType: "json",
				type: "get",
				url: "excelAction!insertData.action",
				data: {tableid: tableid},
				success: function(msg){
					alert(msg.result);
				}
			});
		}
		
		return false;
	});
}
