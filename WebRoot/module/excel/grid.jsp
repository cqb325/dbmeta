<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String json = (String)request.getAttribute("json");
%>
<%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
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
<script type="text/javascript">
	var jsonstr = '<%=json%>';
</script>
<script type="text/javascript" src="<%=path %>/module/excel/grid.js"></script>
<style type="text/css">
body{
	background: none;
}
#hideform{
	display: none;
}
</style>
</head>
<body>
	<div id="section">
		<div id="main">
			<div class="toolbar ui-state-default">
				<a href="#" class="toolbar_bt upload">上传数据</a>
				<select id="tablename" name="tablename"><option value="">请选择</option>
				<c:if test="${tables != null}">
					<c:forEach items="${tables}" var="table">
						<option value="${table.tableid}">${table.tablechnname}</option>
					</c:forEach>
				</c:if>
				</select>
			</div>
			<div class="oprang">
				<div id="grid">
				</div>
			</div>
		</div>
	</div>
	<div id="hideform"></div>
</body>
</html>