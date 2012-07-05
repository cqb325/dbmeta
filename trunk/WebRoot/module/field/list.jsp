<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

String tableid = request.getParameter("tableid");
%>
<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title></title>
    <link href="<%=path %>/plugins/cui/themes/theme.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path %>/resource/theme/nomal/style.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/lib/head.load.min.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/cui/jsloader.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/cui/jsregister.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/lib/jquery.event.drag-2.0.min.js"></script>
	<script type="text/javascript" src="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.min.js"></script>
	<link rel="stylesheet" href="<%=path %>/plugins/lib/jquery-ui-1.8.16.custom.css" type="text/css" media="screen" charset="utf-8" />
	<style type="text/css">
	#grid{
		position: absolute;
		left: 1px;
		top: 1px;
		bottom: 2px;
		right: 1px;
		border: 1px solid #ccc;
	}
	#oprang{
		position: absolute;
		left: 0px;
		top: 32px;
		bottom: 0px;
		right: 0px;
	}
	body{
		font-size: 12px;
	}
	.cui-button{
		padding: 3px 10px 4px; 
	}
	</style>
	<script type="text/javascript">
		JSLoader.load("Grid,Panel,Box,cui.CUIConnector");
		
		var fieldtype = {
			1: "字符串",
			2: "数字",
			3: "日期",
			4: "日期时间",
			5: "布尔值",
			6: "百分比",
			7: "大字段"
		}
		var fieldrule = {
			0: "无规则",
			1: "email",		
			2: "url",
			3: "phone",
			4: "邮编",
			5: "IP",
			6: "身份证号码",
			7: "整数",
			8: "负整数",
			9: "实数",
			10: "日期型",
			11: "时间型",
			12: "日期时间型",
			13: "年代格式",
			14: "月份格式",
			15: "日子格式",
			16: "数字字母",
			17: "汉字",
			18: "数字",
			19: "字母大小写",
			20: "不包含特殊字符"
		}
		var keycode = {
			"0": "否",
			"-1": "是"
		}
		var columns = [];
		//表格对象
		var grid = null;
		//CUIConnector对象
		var connector = null;
		//该行数据是否被修改
		var rowhasedit = {};
		JSLoader.ready(function() {
			connector = new CUI.cui.CUIConnector({
				tableId: "3",
				pageSize: 1,
				url: "<%=path %>/cuiConnector.cui",
				dataType: "xml"
			});
			
			$("#client").Panel({
				anchor: "client"
			});
			$(".toolbar_bt.edit").click(function(){
				edit();
				return false;
			});
			
			$.ajax({
				type: "POST",
				dataType: "json",
				async: true,
				url: "dbAction!getAllManageredFields.action",
				data: {tableid: "<%=tableid%>"},
				success: function(msg){
					for(var i in msg){
						msg[i].id = "id_"+i;
						rowhasedit["id_"+i] = false;
					}
					msg.sort(function(a,b){
						return a.fieldposition - b.fieldposition;
					});
					columns = [
						{id:"fieldid", name:"字段标识", width:95, minWidth:95, field:"fieldid", fieldtype: 1, editable:false},
						{id:"fieldname", name:"字段名称", width:160, minWidth:150, field:"fieldname", fieldtype: 1, editable:false},
						{id:"fieldchnname", name:"中文名", width:95, minWidth:90, field:"fieldchnname", fieldtype: 1},
						{id:"tablename", name:"所属表", width:160, minWidth:150, field:"tablename", fieldtype: 1},
						{id:"fieldsize", name:"字段长度", width:80, minWidth:80, field:"fieldsize", fieldtype: 2},
						{id:"fieldtype", name:"字段类型", width:70, minWidth:59, field:"fieldtype", fieldtype: 2, formatcode:fieldtype},
						{id:"codetableid", name:"代码表", width:95, minWidth:95, field:"codetableid", fieldtype: 1},
						{id:"fieldrequired", name:"是否必须", width:95, minWidth:95, field:"fieldrequired", fieldtype: 5},
						{id:"fieldiskey", name:"主键", width:95, minWidth:95, field:"fieldiskey", fieldtype: 2, formatcode: keycode},
						{id:"fieldseqid", name:"序列类型", width:95, minWidth:95, field:"fieldseqid", fieldtype: 1},
						{id:"fieldrule", name:"字段规则", width:95, minWidth:95, field:"fieldrule", fieldtype: 2, formatcode: fieldrule},
						{id:"fieldposition", name:"排序", width:95, minWidth:95, field:"fieldposition", fieldtype: 2},
						{id:"fielddefaultvalue", name:"默认值", width:95, minWidth:95, field:"fielddefaultvalue", fieldtype: 1},
						{id:"fieldeditable", name:"编辑", width:95, minWidth:95, field:"fieldeditable", fieldtype: 2, formatcode: keycode},
						{id:"showable", name:"显示", width:95, minWidth:95, field:"showable", fieldtype: 2, formatcode: keycode}
					];
					grid = $("#grid").Grid({
						columns: columns,
						data: msg,
						title: "字段信息",
						checkcolumn: true,
						pageable: true,
						sortable: true,
						editable: true,
						asyncEditorLoading: true,
						forceFitColumns: false
					}).data("Grid");
					grid.grid.onCellChange.subscribe(function(e,args){
						rowhasedit[args.item.id] = true;
					});
				}
			});
		});
		
		function edit(){
			if(!grid.selectedRowIds.length){
				jQuery.Box.warning("警告","请选择一条记录提交修改");
				return;
			}else{
				var xml = [];
				xml.push('<records optype="update">');
				for(var i in grid.selectedRowIds){
					xml.push('<record>');
					var rowid = grid.selectedRowIds[i];
					if(!rowhasedit[rowid]){
						continue;
					}
					rowhasedit[rowid] = false;
					
					var row = grid.dataView.getItemById(rowid);
					for(var j in row){
						var column = grid.getColumnById(j);
						if(column && column.editable){
							xml.push('<field ');
							xml.push('id="'+j+'" ');
							xml.push('type="'+column.fieldtype+'" ');
							xml.push('iskey="0" ');
							xml.push('>');
							xml.push(row[j]);
							xml.push('</field>');
						}
					}
					xml.push('<where>');
					xml.push('<field id="fieldid" type="1">'+row["fieldid"]+'</field>');
					xml.push('</where>');
					xml.push('</record>');
				}
				xml.push('</records>');
				
				connector.execute(xml.join(""), null, function(result){
					if(result){
						jQuery.Box.message("提示","数据修改成功！");
					}else{
						jQuery.Box.error("错误","数据修改失败！");
					}
				});
			}
		}
	</script>
  </head>
  
  <body>
  	<div id="client">
  		<div class="toolbar ui-state-default">
  			<a href="#" class="toolbar_bt edit">更新修改</a>
  		</div>
  		<div id="oprang">
  			<div id="grid"></div>
  		</div>
  	</div>
  </body>
</html>
