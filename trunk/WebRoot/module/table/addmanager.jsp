<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String tablename = request.getParameter("tablename");
String serverid = request.getParameter("serverid");
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>添加管理</title>
	<link href="<%=path %>/module/common.css" rel="stylesheet" type="text/css"/>
  </head>
  
  <body>
    <fieldset>
    	<legend>添加表格管理</legend>
    	<form action="dbAction!addTableManager.action" method="post" name="dataform">
    		<input type="hidden" name="tablename" value="<%=tablename %>">
    		<input type="hidden" name="serverid" value="<%=serverid %>">
    		<label for="tablechnname">中文名称:</label>
	    	<input type="text" id="tablechnname" name="tablechnname" style="margin-top:5px;">
	    	
	    	<div class="clear"></div>
	    	<br/>
	    	<a href="#" class="small button orange left" onclick="javascript: document.dataform.submit(); return false;"> 提交 </a>
    	</form>
    </fieldset>
  </body>
</html>
