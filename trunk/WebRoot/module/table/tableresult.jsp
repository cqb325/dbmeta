<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String tableid = request.getParameter("tableid");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
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
		bottom: 2px;
		right: 1px;
		border: 1px solid #ccc;
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
		
		JSLoader.ready(function() {
			connector = new CUI.cui.CUIConnector({
				tableId: "<%=tableid%>",
				pageSize: -1,
				url: "<%=path %>/cuiConnector.cui",
				dataType: "json"
			});
			connector.connector(function(){
				grid = $("#grid").Grid({
					title: "字段信息",
					pageable: true,
					sortable: true,
					editable: false,
					asyncEditorLoading: true,
					datasource: connector
				}).data("Grid");
			});
		});
	</script>
  </head>
  
  <body>
    <div id="grid"></div>
  </body>
</html>
