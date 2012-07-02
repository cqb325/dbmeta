<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>权限管理</title>
<link href="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/module/common.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/resource/theme/nomal/style.css" rel="stylesheet" type="text/css"/>

<script type="text/javascript" src="<%=path %>/resource/contains.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/head.load.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/cui/jsloader.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/cui/jsregister.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery.event.drag-2.0.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="<%=path %>/module/rights/right.js"></script>
</head>
<style type="text/css">
#desiner{
	position:absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	width: 100%;
	height: 100%;
}
</style>
<body>
	<div id="section">
		<div id="tree">
		</div>
		<div id="main">
			<div class="toolbar ui-state-default">
				<a href="#" class="toolbar_bt update">更新权限</a>
			</div>
			<div class="oprang">
				<iframe id="desiner" frameborder="0" src="<%=path %>/module/rights/desiner.html"></iframe>
			</div>
		</div>
	</div>
	<form action="" id="dataform" style="display: none;"></form>
</body>
</html>