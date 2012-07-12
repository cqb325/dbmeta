<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>表单设计</title>
<link href="<%=path%>/plugins/lib/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css"/>
<link href="<%=path%>/resource/theme/nomal/style.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=path%>/resource/contains.js"></script>
<script type="text/javascript" src="<%=path%>/plugins/lib/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="<%=path%>/plugins/lib/head.load.min.js"></script>
<script type="text/javascript" src="<%=path%>/plugins/cui/jsloader.js"></script>
<script type="text/javascript" src="<%=path%>/plugins/cui/jsregister.js"></script>
<script type="text/javascript" src="<%=path%>/plugins/lib/jquery-ui-1.8.16.custom.min.js"></script>
<link rel="stylesheet" type="text/css" href="<%=path%>/module/formdesiner/style.css">
<script type="text/javascript" src="<%=path%>/module/formdesiner/desiner.js"></script>
</head>
<body>
	<div id="section">
		<div id="main">
			<div id="canvas">
				<div></div>
			</div>
		</div>
		<div id="right_section">
			<div id="properties">
				<div>
					<div>选择表格</div>
					<select id="tables">
						<option value="">选择表格</option>
					</select>
				</div>
				<div id="desiner_prop">
					<div>表单大小</div>
					<select name="desiner_w" id="desiner_w">
						<option value="container_6">6</option>
						<option value="container_12" selected="selected">12</option>
						<option value="container_16">16</option>
					</select>
				</div>
				<div id="field_prop">
					<div>字段大小</div>
					<select name="field_w" id="field_w">
						<option value="grid_1">1</option>
						<option value="grid_2">2</option>
						<option value="grid_3">3</option>
						<option value="grid_4">4</option>
						<option value="grid_5">5</option>
						<option value="grid_6">6</option>
						<option value="grid_7">7</option>
						<option value="grid_8">8</option>
						<option value="grid_9">9</option>
						<option value="grid_10">10</option>
						<option value="grid_11">11</option>
						<option value="grid_12">12</option>
						<option value="grid_13">13</option>
						<option value="grid_14">14</option>
						<option value="grid_15">15</option>
						<option value="grid_16">16</option>
					</select>
					<div>类型</div>
					<select id="field_type" name="field_type">
						<option value="text">text</option>
						<option value="select">select</option>
						<option value="password">password</option>
						<option value="date">date</option>
						<option value="multiselect">multi_select</option>
						<option value="edit">edit</option>
						<option value="image">image</option>
					</select>
				</div>
			</div>
			<div class="control ui-state-default cleardesiner"><span>清除</span></div>
			<div class="control ui-state-default delete"><span>删除</span></div>
			<div class="control ui-state-default save"><span>保存</span></div>
		</div>
    </div>
	
	<div style="display: none;">
		<form id="dataform"></form>
	</div>
</body>
</html>