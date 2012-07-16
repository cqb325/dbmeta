<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>日志管理</title>
<link href="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/resource/theme/nomal/style.css" rel="stylesheet" type="text/css"/>

<script type="text/javascript" src="<%=path %>/resource/contains.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/head.load.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/cui/jsloader.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/cui/jsregister.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery.event.drag-2.0.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/ui.datepicker-zh-CN.js"></script>
<script type="text/javascript" src="<%=path %>/module/log/index.js"></script>
<style type="text/css">
#result{
	position:absolute;
	top: 30px;
	bottom: 0px;
	left: 0px;
	right: 0px;
}
#query{
	height: 30px;
	width: 100%;
	overflow: hidden;
}
</style>
</head>
<body>
	<div id="section">
		<div id="main">
			<div class="toolbar ui-state-default">
				<a href="#" class="toolbar_bt delete">删除日志</a>
			</div>
			<div class="oprang">
				<div id="query" class="">
					<div>时间从<input id="starttime">到<input id="endtime"> 操作人员:<input id="opuser">
						<a href="#" class="toolbar_bt query">查询</a>
					</div>
				</div>
				<div id="result">
					<div id="grid"></div>
				</div>
				<form name="dataform" id="dataform" style="display: none;"></form>
			</div>
		</div>
	</div>
</body>
</html>