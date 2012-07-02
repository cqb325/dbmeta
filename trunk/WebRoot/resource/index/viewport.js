JSLoader.load("Panel,LayerOut");
/*
var buttons = [
		{
			id: "addbt",
			title: "添加",
			handler: add,
			skin: "green"
		},
		{
			id: "editbt",
			title: "修改",
			handler: edit,
			skin: "green"
		},
		{
			id: "delbt",
			title: "删除",
			handler: del,
			skin: "green"
		}
	];
	*/
JSLoader.ready(function() {
	var north = $("#north").Panel({
		anchor: "top",
		height: 50
	}).data("Panel");
	var west = $("#west").Panel({
		anchor: "left",
		title: "功能树",
		width: 200
	}).data("Panel");
	var client = $("#client").Panel({
		title: "展示区",
		anchor: "client"
	}).data("Panel");
	
	
	var layerout = new CUI.LayerOut();
	layerout.add(north);
	layerout.add(west);
	layerout.add(client);
});