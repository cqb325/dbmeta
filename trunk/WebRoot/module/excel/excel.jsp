<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Excel数据批量导入</title>
<link href="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/module/common.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/resource/theme/nomal/style.css" rel="stylesheet" type="text/css"/>

<script type="text/javascript" src="<%=path %>/resource/contains.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/head.load.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/cui/jsloader.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/cui/jsregister.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="<%=path %>/module/excel/excel.js"></script>
<style type="text/css">
#grid{
	position:absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	width: 100%;
	height: 100%;
}
#data_wrapper{
	position:absolute;
	top: 70px;
	left: 0px;
	right: 0px;
	bottom: 0px;
}
div.oprang{
	top: 10px;
}
</style>
</head>
<body>
	<div id="section">
		<div id="main">
			<div class="oprang">
				<fieldset>
					<legend>excel数据检测</legend>
					<form id="dataform" name="dataform" method="post" enctype="multipart/form-data" action="excelAction!validateExcel.action">
						<input type="file" name="file" id="file">
						<a href="#" id="validate_bt" class="toolbar_bt wrench">检测</a>
					</form>
				</fieldset>
				<div id="data_wrapper">
					<iframe id="grid" frameborder="0" src="<%=path %>/module/excel/grid.jsp"></iframe>
				</div>
			</div>
		</div>
	</div>
</body>
</html>