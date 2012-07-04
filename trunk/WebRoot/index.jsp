<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>CQB</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="plugins/cui/themes/theme.css">
	<link rel="icon" href="logo.png" type="image/png" />
	<script type="text/javascript" src="plugins/lib/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="plugins/lib/head.load.min.js"></script>
	<script type="text/javascript" src="plugins/cui/jsloader.js"></script>
	<script type="text/javascript" src="plugins/cui/jsregister.js"></script>
	<script type="text/javascript" src="plugins/lib/jquery.event.drag-2.0.min.js"></script>
	<script type="text/javascript" src="plugins/lib/jquery-ui-1.8.16.custom.min.js"></script>
	<link rel="stylesheet" href="plugins/lib/jquery-ui-1.8.16.custom.css" type="text/css" media="screen" charset="utf-8" />
	<script type="text/javascript" src="resource/contains.js"></script>
	<script type="text/javascript" src="resource/index/op.js"></script>
	<script type="text/javascript" src="resource/index/viewport.js"></script>
	<script type="text/javascript" src="resource/index/index.js"></script>
    <style type="text/css">
	body{
		
	}
	.panel{
		/*background-color: #D7B78A;
		background: url(module/1323855488584.jpg) fixed;*/
	}
	.cui-panel-wrapper{
		border: 1px solid #8B6B47;
	}
	.cui-panel-wrapper .cui-panel-title{
		background: #F6F6F6 url(plugins/cui/images/ui-bg_highlight-hard_55_555555_1x100.png) 50% 50% repeat-x;
		color: #ffffff;
		border: none;
		border-bottom: 1px solid #8B6B47;
	}
	#tree{
		width: 100%;
		height: 100%;
		/*background: url(module/1323855488584.jpg) fixed;*/
	}
	#north{
		background-color: #DAB88A;
		font: 18px 微软雅黑;
	}
	
	</style>
  </head>
  
  <body>
    <div id="north" class="panel">
    ${user.ualias} &nbsp; <a href="userAction!loginOut.action">退出</a>
    </div>
	<div id="west" class="panel">
		<div id="tree"></div>
	</div>
	<div id="east" class="panel">East</div>
	<div id="sourth" class="panel">Sourth</div>
	<div id="client" class="panel">
		<iframe id="mianframe" frameborder="0" width="100%" height="100%" style="border:none;"></iframe>
	</div>
  </body>
</html>
