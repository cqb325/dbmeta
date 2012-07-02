<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title></title>
    <link href="<%=path %>/plugins/cui/themes/theme.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/lib/head.load.min.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/cui/jsloader.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/cui/jsregister.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/lib/jquery.event.drag-2.0.min.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.min.js"></script>
	<link rel="stylesheet" href="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.css" type="text/css" media="screen" charset="utf-8" />
	<style type="text/css">
	#grid{
		position: absolute;
		left: 1px;
		top: 0px;
		bottom: 3px;
		right: 1px;
		border: 1px solid #ccc;
	}
	#grid .cui-button{
		padding: 2px 10px 3px;
	}
	body{
		font-size: 12px;
	}
	</style>
	<script type="text/javascript">
		JSLoader.load("Grid,Panel,Box,cui.CUIConnector");
		//表格对象
		var grid = null;
		//CUIConnector对象
		var connector = null;
		
		var columns = [
			{id:"tablename", name:"表格名称", field:"tablename", fieldtype: 1, editable:false},
			{id:"tablechnname", name:"中文名", field:"tablechnname", fieldtype: 1, editable:false}
		];
		JSLoader.ready(function() {
			connector = new CUI.cui.CUIConnector({
				tableId: "df8934c2-8398-4060-8a69-5f159fc495db",
				pageSize: -1,
				url: "<%=path %>/cuiConnector.cui",
				dataType: "json"
			});
			connector.connector(function(){
				grid = $("#grid").Grid({
					columns: columns,
					op_bts: [{name: "操作", id: "#op_col", data:'<a class="cui-button op_col green">查看数据</a>'}],
					title: "表格列表",
					pageable: true,
					sortable: true,
					editable: false,
					asyncEditorLoading: false,
					datasource: connector
				}).data("Grid");
				$(".op_col").each(function(index){
					$(this).click(function(){
						var row = grid.dataView.getItemByIdx(index);
						var tableid = row.tableid;
						window.location.href = "<%=path %>/module/table/tableresult.jsp?tableid="+tableid;
						return false;
					});
				});
			});
		});
	</script>
  </head>
  
  <body>
  	<div id="grid"></div>
  </body>
</html>
