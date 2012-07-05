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
<title>Insert title here</title>
<link href="<%=path %>/module/common.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/resource/theme/nomal/style.css" rel="stylesheet" type="text/css"/>
<link href="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/lib/head.load.min.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/cui/jsloader.js"></script>
<script type="text/javascript" src="<%=path %>/plugins/cui/jsregister.js"></script>
<script type="text/javascript">
JSLoader.load("Scroll,Util");
JSLoader.ready(function() {
	var bodyDimension = CUI.Util.getBodyDimensions();
	var oph = $("#op_area").height();
	$("#main").Scroll();
	
	$(".table_list tr").click(function(){
		$(".table_list tr.selected").removeClass("selected");
		$(this).addClass("selected");
	});
	//提取元数据
	$("a.toolbar_bt.add").click(function(){
		if($(".table_list tr.selected").length){
			var tablename = $(".table_list tr.selected").text();
			tablename = $.trim(tablename);
			if(!hasTableManagered(tablename)){
				window.parent.location.href = "dbAction!addTableManager.action?tablename="+tablename+"&serverid=-1";
			}else{
				alert("已经添加到管理");
			}
		}else{
			alert("请选择一个表!");
		}
		return false;
	});
	
	$("a.toolbar_bt.cancle").click(function(){
		parent.tablelist.hide();
		return false;
	});
});

function hasTableManagered(tablename){
	var result = null;
	$.ajax({
		type: "POST",
		async: false,
		dataType: "json",
		url: "dbAction!hasTableManagered.action?tablename="+tablename+"&serverid=-1",
		success: function(msg){
			result = msg.result;
		}
	});
	return result;
}
</script>
<style type="text/css">
#main{
	position:absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 33px;
}
#op_area{
	text-align: center;
	position:absolute;
	height: 33px;
	left: 0px;
	right: 0px;
	bottom: 0px;
}
.table_list tr.selected{
	background-color: #91BD09;
}
.table_list tr{
	cursor: pointer;
}
</style>
</head>
<body>
<div id="main">
	    <table class="table_list">
	    	<tbody>
		    	<c:forEach items="${tables}" var="table">
		    		<tr>
		    			<td>${table}</td>
		    		</tr>
		    	</c:forEach>
	    	</tbody>
	    </table>
</div>
<div id="op_area" class="toolbar ui-state-default">
	<a href="#" class="toolbar_bt add">提取元数据</a>
	<a href="#" class="toolbar_bt cancle">取消</a>
</div>
</body>
</html>