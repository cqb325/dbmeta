<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>功能管理</title>
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
<script type="text/javascript" src="<%=path %>/module/functions/function.js"></script>
<style type="text/css">
form{
	padding: 10px;
}
.cui-inputtext{
	width: 280px;
}
#form_control{
	height: 30px;
	line-height: 30px;
	text-align: center;
}
#formdiv{
	display: none;
}
</style>
</head>
<body>
	<div id="section">
		<div id="tree">
		</div>
		<div id="main">
			<div class="toolbar ui-state-default">
				<a href="#" class="toolbar_bt addFun">添加功能组</a>
				<a href="#" class="toolbar_bt editFun">修改功能组</a>
				<a href="#" class="toolbar_bt deleteFun">删除功能组</a>
				
				<a href="#" class="toolbar_bt addSubFun">添加功能</a>
				<a href="#" class="toolbar_bt editSubFun">修改功能</a>
				<a href="#" class="toolbar_bt deleteSubFun">删除功能</a>
			</div>
			<div class="oprang">
				<div id="grid"></div>
				<div id="formdiv">
					<form name="dataform" id="dataform"></form>
					<div id="form_control" class="ui-state-default">
						<a href="#" class="toolbar_bt save"> 保存 </a>
						<a href="#" class="toolbar_bt cancle"> 取消 </a>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>