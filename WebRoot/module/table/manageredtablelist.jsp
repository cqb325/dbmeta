<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理的表格</title>
<link href="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/resource/theme/nomal/style.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=path %>/resource/contains.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/head.load.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/cui/jsloader.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/cui/jsregister.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery.event.drag-2.0.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="<%=path %>/module/table/manageredtablelist.js"></script>
<style type="text/css">

</style>
</head>
<body>
	<div id="section">
		<div id="main">
			<div class="toolbar ui-state-default">
				<a href="#" class="toolbar_bt add">添加表格元数据</a>
				<a href="#" class="toolbar_bt edit">更新</a>
			</div>
			<div class="oprang">
				<div id="grid"></div>
			</div>
		</div>
	</div>
	
	<div id="tableList"></div>
	<form id="dataform" style="display: none;"></form>
</body>
</html>