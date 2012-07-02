JSLoader.load("Tree");
var tree = null;
JSLoader.ready(function() {
	tree = $("#tree").Tree({
		treeid: "tree",
		treewidth: "100%",
		treeheight: "100%"
	}).data("Tree");
	
	tree.setSkin("dhx_skyblue");
	tree.setImagePath("plugins/cui/images/tree/csh_dhx_skyblue/");
	tree.loadXML("tree1.xml?v="+Math.random());
	
	tree.clicked = function(id, item, event){
		if(id != "-1"){
			var href = tree.getUserData(id, "href");
			if (href && href != "") {
				$("#mianframe").attr("src", href);
			}
		}
	}
	
	tree.opened = function(id, item, state){
		loadChildrenItems(id, item, state);
	}
});

function loadChildrenItems(id, item, state){
	if (state == -1) {
		//加载子节点
		tree.deleteChildItems(id);
		var url = ctx+"rightAction!getChildrenFunRightsXML.action?parentid="+id+"&v="+Math.random();
		tree._loadDynXML(id, url);
	}
}
