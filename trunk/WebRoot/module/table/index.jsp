<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>表格列表</title>
	<link href="<%=path %>/module/common.css" rel="stylesheet" type="text/css"/>
	<link rel="stylesheet" type="text/css" href="<%=path %>/plugins/cui/themes/theme.css">
	<link rel="stylesheet" type="text/css" href="<%=path %>/plugins/lib/jquery-ui-1.8.6.custom.css">
    <script type="text/javascript" src="<%=path %>/plugins/lib/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/lib/head.load.min.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/cui/jsloader.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/cui/jsregister.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-ui-1.8.1.custom.min.js"></script>
    <script type="text/javascript" src="<%=path %>/resource/jpage/jpage.js"></script> 
    <link href="<%=path %>/resource/jpage/theme/default/css/jpage.css" type="text/css" rel="stylesheet">
	<script type="text/javascript">
		JSLoader.load("Scroll,Util,Panel,LayerOut,FloatDiv");
		var buttons = [
		{
			id: "addtable",
			title: "添加表格元数据",
			handler: addTable,
			skin: "green"
		}];
		JSLoader.ready(function() {
			var client = $("#main").Panel({
				anchor: "client",
				tbar: buttons
			}).data("Panel");
			var layerout = new CUI.LayerOut();
			layerout.add(client);
			
			var bodyDimension = CUI.Util.getBodyDimensions();
			$("#main").css({
				width: bodyDimension.width,
				height: bodyDimension.height
			}).Scroll();
			
			
			//删除管理按钮点击事件
			$(".field_delbt").click(function(){
				if(window.confirm("确定删除?")){
					var tablename = $(this).parent().parent().children(".tablename").text();
					var tableserverid = $(this).parent().parent().children(".tableserverid").text();
					window.location.href = "dbAction!delTableManager.action?tablename="+tablename+"&serverid="+tableserverid;
				}
				return false;
			});
		});
		var tablelist = null;
		function addTable(){
			if(!tablelist){
				tablelist = $("#tableList").FloatDiv({
					title: "表格列表",
					draggable: true,
					fadehide: true,
					ismode: true,
					framemode: true,
					height: 300,
					width: 300,
				}).data("FloatDiv");
			}else{
				tablelist.show();
			}
			tablelist.setContent({
				url: "dbAction!getAllTables.action"
			});
		}
	</script>
	<style type="text/css">
	fieldset{
		margin: 10px;
		background: ;
	}
	.cui-panel-wrapper{
		background-color: transparent;
	}
	.cui-panel-toolbar{
		background: transparent;
	}
	</style>
  </head>
  
  <body>
  	<div id="main">
	    <fieldset>
	  		<legend>表格列表</legend>
		    <table class="table_list">
		    	<tr>
		    		<th>表名</th>
		    		<th>中文名</th>
		    		<th>表类型</th>
		    		<th>表服务ID</th>
		    		<th colspan="2" style="text-align: right; margin-right: 10px;">操作</th>
		    	</tr>
		    	<c:forEach items="${pageNation.list}" var="table">
		    		<tr>
		    			<td class="tablename">${table.tablename}</td>
		    			<td>${table.tablechnname}</td>
		    			<td>${table.tabletype}</td>
		    			<td class="tableserverid">${table.tableserverid}</td>
		    			<td><a class="small button green right field_delbt" href="javascript: void(0);">删除管理</a></td>
		    			<td><a class="small button green right field_bt" href="module/field/list.jsp?tableid=${table.tableid }">字段元数据</a></td>
		    		</tr>
		    	</c:forEach>
		    </table>
		    
		    <form action="dbAction!getAllTables.action" method="post" name="pageform">
		    <input name="page" type="hidden" value="${pageNation.page }">
		    <input name="pageCount" type="hidden" value="${pageNation.pageCount }">
		    <table width="100%" border="0" cellpadding="0" cellspacing="0" class="default_pgToolbar">
		    	<tbody>
		    		<tr><td>
		    			<table border="0" cellpadding="0" cellspacing="0" class="default_pgPanel">
		    			<tbody><tr>
		    				<td valign="middle"><div class="default_separator"></div></td>
		    				<td valign="middle"><div class="default_pgBtn default_pgFirst" title="首页"></div></td>
		    				<td valign="middle"><div class="default_pgBtn default_pgPrev" title="上页"></div></td>
		    				<td valign="middle" width="10" align="left"><div class="default_separator"></div></td>
		    				<td valign="middle">第 <input disabled="disabled" class="default_pgCurrentPage" type="text" value="${pageNation.page+1 }" title="页码"> 页 / 共 <span class="default_pgTotalPage">${pageNation.pagenum }</span> 页</td>
		    				<td valign="middle" width="10" align="right"><div class="default_separator"></div></td>
		    				<td valign="middle"><div class="default_pgBtn default_pgNext" title="下页"></div></td>
		    				<td valign="middle"><div class="default_pgBtn default_pgLast" title="尾页"></div></td>
		    				<td valign="middle" width="10" align="left"><div class="default_separator"></div></td>
		    				<td valign="middle" class="default_pgSearchInfo">检索到&nbsp;${pageNation.totleCounts }&nbsp;条记录</td>
		    			</tr></tbody></table>
		    		</td></tr>
		    	</tbody>
		    </table>
		    </form>
		</fieldset>
	</div>
	
	<div id="tableList"></div>
  </body>
</html>
