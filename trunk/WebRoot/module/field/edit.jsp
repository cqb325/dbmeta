<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>修改字段信息</title>
    <link href="<%=path %>/module/common.css" rel="stylesheet" type="text/css"/>
  </head>
  
  <body>
    <fieldset>
    	<legend>修改字段信息</legend>
	    <form action="fieldAction!editField.action" method="post" name="dataform">
	    	<input name="tableid" type="hidden" value="${tableid }">
	    	<input type="hidden" value="${field.fieldid }" name="fieldid">
	    	<label for="fieldname">字段名称:</label>
	    	<input name="fieldname" type="text" value="${field.fieldname }" disabled>
	    	<div class="clear"></div>
	    	<label for="fieldchnname">中文名称:</label>
	    	<input name="fieldchnname" value="${field.fieldchnname }" id="fieldchnname"/>
	    	<div class="clear"></div>
	    	<label for="codetableid">代码表:</label>
	    	<input name="codetableid" value="${field.codetableid }" id="codetableid"/>
	    	<div class="clear"></div>
	    	<label for="fieldiskey">是否主键:</label>
	    	<input name="fieldiskey" value="${field.fieldiskey }" id="fieldiskey"/>
	    	<div class="clear"></div>
	    	<label for="fieldrule">字段规则:</label>
	    	<input name="fieldrule" value="${field.fieldrule }" id="fieldrule"/>
	    	<div class="clear"></div>
	    	<label for="fieldposition">字段排序:</label>
	    	<input name="fieldposition" value="${field.fieldposition }" id="fieldposition"/>
	    	<div class="clear"></div>
	    	<label for="fielddefaultvalue">默认值:</label>
	    	<input name="fielddefaultvalue" value="${field.fielddefaultvalue }" id="fielddefaultvalue"/>
	    	<div class="clear"></div>
	    	<label for="fieldseqid">主键类型:</label>
	    	<input name="fieldseqid" value="${field.fieldseqid }" id="fieldseqid"/>
	    	<div class="clear"></div>
	    	<br/>
	    	<a href="#" class="small button orange left" onclick="javascript:document.dataform.submit();return false;"> 修改 </a>
	    </form>
	</fieldset>
  </body>
</html>
