JSLoader.load("Panel,Box,cui.CUIConnector,ToolTip,Form");
JSLoader.ready(function() {
	//页面布局
	initLayerout();
	
	initformupload();
});

/**
 * 页面布局
 */
function initLayerout(){
	var main = $("#main").Panel({
		anchor: "client",
		title: "操作区"
	}).data("Panel");
}

/**
 * 表单上传
 */
function initformupload(){
	$("#validate_bt").click(function(){
		var form = $("#dataform");
		
		$("fieldset").append(form.clone(true));
		$(window.grid.document.body).find("#hideform").append(form);
		var form = $(window.grid.document.body).find("#hideform").children("form")[0];
		
		form.submit();
		return false;
	});
}
