/**
 * 在此注册脚本依赖
 */
(function(atPackage) {
/////////////////////////////Core start////////////////////////////
	JSLoader.register("Util","core/util.js");
	
	JSLoader.register("Class","core/class.js");
	
	JSLoader.register("XML","core/xml.js");
	
	JSLoader.register("Object","core/object.js");
	JSLoader.dependlib("Object","Class");
/////////////////////////////Core end ////////////////////////////

/////////////////////////////plugins start ////////////////////////////
	//特效
	JSLoader.register("Animate","plugins/animate/animate.js");
	
	//拖拽
	JSLoader.register("Draggable","plugins/draggable/draggable.js");
	JSLoader.dependlib("Draggable","Object");
	
	//浮动Div
	JSLoader.register("FloatDiv","plugins/floatdiv/floatdiv.js");
	JSLoader.dependlib("FloatDiv","Object");
	JSLoader.dependlib("FloatDiv","Util");
	JSLoader.dependlib("FloatDiv","Draggable");
	JSLoader.dependlib("FloatDiv","Animate");
	JSLoader.dependcss("FloatDiv","plugins/floatdiv/floatdiv.css");
	
	//滚动条
	JSLoader.register("Scroll","plugins/scroll/scroll.js");
	JSLoader.dependlib("Scroll","Object");
	JSLoader.dependcss("Scroll","plugins/scroll/scroll.css");
	
	//弹出框
	JSLoader.register("Box","plugins/box/box.js");
	JSLoader.dependlib("Box","FloatDiv");
	JSLoader.dependcss("Box","plugins/box/box.css");
	
	//面板
	JSLoader.register("Panel","plugins/panel/panel.js");
	JSLoader.dependlib("Panel","Object");
	JSLoader.dependlib("Panel","MenuItem");
	JSLoader.dependcss("Panel","plugins/panel/panel.css");
	
	//布局管理
	JSLoader.register("LayerOut","plugins/layerout/layerout.js");
	JSLoader.dependlib("LayerOut","Object");
	
	//树
	JSLoader.register("Tree","plugins/tree/tree.js");
	JSLoader.register("dhtmlxcommon","plugins/tree/dhtmlxcommon.js");
	JSLoader.register("dhtmlxtree","plugins/tree/dhtmlxtree.js");
	JSLoader.dependlib("Tree","Object");
	JSLoader.dependlib("Tree","dhtmlxcommon");
	JSLoader.dependlib("Tree","dhtmlxtree");
	JSLoader.dependcss("Tree","plugins/tree/dhtmlxtree.css");
	
	//菜单项
	JSLoader.register("MenuItem","plugins/menu/menuitem.js");
	JSLoader.dependlib("MenuItem","Object");
	JSLoader.dependcss("MenuItem","plugins/menu/menuitem.css");
	
	//列表
	JSLoader.register("List","plugins/list/list.js");
	JSLoader.dependlib("List","Object");
	JSLoader.dependlib("List","Scroll");
	JSLoader.dependcss("List","plugins/list/list.css");
	
	//提示
	JSLoader.register("ToolTip","plugins/tooltip/tooltip.js");
	JSLoader.register("poshytip","plugins/tooltip/jquery.poshytip.js");
	JSLoader.dependlib("ToolTip","Object");
	JSLoader.dependlib("ToolTip","poshytip");
	JSLoader.dependcss("ToolTip","plugins/tooltip/tip-darkgray/tip-darkgray.css");
	JSLoader.dependcss("ToolTip","plugins/tooltip/tip-green/tip-green.css");
	JSLoader.dependcss("ToolTip","plugins/tooltip/tip-skyblue/tip-skyblue.css");
	JSLoader.dependcss("ToolTip","plugins/tooltip/tip-twitter/tip-twitter.css");
	JSLoader.dependcss("ToolTip","plugins/tooltip/tip-violet/tip-violet.css");
	JSLoader.dependcss("ToolTip","plugins/tooltip/tip-yellow/tip-yellow.css");
	JSLoader.dependcss("ToolTip","plugins/tooltip/tip-yellowsimple/tip-yellowsimple.css");
	
	//表格
	JSLoader.register("Grid","plugins/grid/grid.js");
	JSLoader.register("slick.core","plugins/grid/slick/slick.core.js");
	JSLoader.register("slick.editors","plugins/grid/slick/slick.editors.js");
	JSLoader.register("slick.checkboxselectcolumn","plugins/grid/plugins/slick.checkboxselectcolumn.js");
	JSLoader.register("slick.autotooltips","plugins/grid/plugins/slick.autotooltips.js");
	JSLoader.register("slick.cellrangedecorator","plugins/grid/plugins/slick.cellrangedecorator.js");
	JSLoader.register("slick.cellrangeselector","plugins/grid/plugins/slick.cellrangeselector.js");
	JSLoader.register("slick.rowmovemanager","plugins/grid/plugins/slick.rowmovemanager.js");
	JSLoader.register("slick.cellselectionmodel","plugins/grid/plugins/slick.cellselectionmodel.js");
	JSLoader.register("slick.rowselectionmodel","plugins/grid/plugins/slick.rowselectionmodel.js");
	JSLoader.register("slick.dataview","plugins/grid/slick/slick.dataview.js");
	JSLoader.register("slick.grid","plugins/grid/slick/slick.grid.js");
	JSLoader.register("slick.pager","plugins/grid/controls/slick.pager.js");
	JSLoader.register("slick.columnpicker","plugins/grid/controls/slick.columnpicker.js");
	JSLoader.dependlib("Grid","Object");
	JSLoader.dependlib("Grid","slick.core");
	JSLoader.dependlib("Grid","slick.editors");
	JSLoader.dependlib("Grid","slick.checkboxselectcolumn");
	JSLoader.dependlib("Grid","slick.autotooltips");
	JSLoader.dependlib("Grid","slick.cellrangedecorator");
	JSLoader.dependlib("Grid","slick.cellrangeselector");
	JSLoader.dependlib("Grid","slick.rowmovemanager");
	JSLoader.dependlib("Grid","slick.cellselectionmodel");
	JSLoader.dependlib("Grid","slick.rowselectionmodel");
	JSLoader.dependlib("Grid","slick.dataview");
	JSLoader.dependlib("Grid","slick.grid");
	JSLoader.dependlib("Grid","slick.pager");
	JSLoader.dependlib("Grid","slick.columnpicker");
	JSLoader.dependcss("Grid","plugins/grid/slick/slick.grid.css");
	JSLoader.dependcss("Grid","plugins/grid/controls/slick.pager.css");
	JSLoader.dependcss("Grid","plugins/grid/controls/slick.columnpicker.css");
	JSLoader.dependcss("Grid","plugins/grid/grid.css");
/////////////////////////////plugins   end ////////////////////////////

/////////////////////////////cuiConnector   start //////////////////////////
	JSLoader.register("cui.CUIConnectorFactory","cuiConnector/factory.js");
	JSLoader.register("cui.CUIConnector","cuiConnector/CUIConnector.js");
	JSLoader.register("cui.DataReader","cuiConnector/datareader.js");
	JSLoader.register("cui.Field","cuiConnector/field.js");
	JSLoader.register("cui.FieldMeta","cuiConnector/fieldmeta.js");
	JSLoader.register("cui.JSONDataReader","cuiConnector/jsondatareader.js");
	JSLoader.register("cui.Meta","cuiConnector/meta.js");
	JSLoader.register("cui.Record","cuiConnector/record.js");
	JSLoader.register("cui.XMLDataReader","cuiConnector/xmldatareader.js");
	JSLoader.dependlib("cui.CUIConnector","Class");
	JSLoader.dependlib("cui.CUIConnector","XML");
	JSLoader.dependlib("cui.CUIConnector","cui.CUIConnectorFactory");
	JSLoader.dependlib("cui.CUIConnector","cui.DataReader");
	JSLoader.dependlib("cui.CUIConnector","cui.Field");
	JSLoader.dependlib("cui.CUIConnector","cui.FieldMeta");
	JSLoader.dependlib("cui.CUIConnector","cui.JSONDataReader");
	JSLoader.dependlib("cui.CUIConnector","cui.Meta");
	JSLoader.dependlib("cui.CUIConnector","cui.Record");
	JSLoader.dependlib("cui.CUIConnector","cui.XMLDataReader");
/////////////////////////////cuiConnector   end ////////////////////////////

/////////////////////////////form   start //////////////////////////
	JSLoader.register("validate","form/validate/jquery.validationEngine.js");
	JSLoader.register("validatezh_CN","form/validate/languages/jquery.validationEngine-zh_CN.js");
	JSLoader.dependlib("validate","validatezh_CN");
	
	JSLoader.register("InputText","form/core/inputtext.js");
	JSLoader.register("ComBox","form/core/combox.js");
	JSLoader.register("TextArea","form/core/textarea.js");
	JSLoader.register("DateInput","form/core/dateinput.js");
	JSLoader.register("Form","form/form.js");
	JSLoader.register("FormDB","form/formdb.js");
	JSLoader.register("DBLink","form/dblink.js");
	JSLoader.dependlib("Form","Class");
	JSLoader.dependlib("Form","FormDB");
	JSLoader.dependlib("Form","DBLink");
	JSLoader.dependlib("Form","InputText");
	JSLoader.dependlib("Form","ComBox");
	JSLoader.dependlib("Form","TextArea");
	JSLoader.dependlib("Form","DateInput");
	JSLoader.dependlib("Form","validate");
	JSLoader.dependcss("Form","form/form.css");
/////////////////////////////form   end  //////////////////////////
})(jQuery);