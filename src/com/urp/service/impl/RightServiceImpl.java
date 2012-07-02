package com.urp.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.at21.jdbc.core.JdbcTemplate;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Resposibility;
import com.urp.entry.Desiner;
import com.urp.entry.Function;
import com.urp.entry.UGFunRight;
import com.urp.entry.UserGroup;
import com.urp.service.DesinerService;
import com.urp.service.FunctionService;
import com.urp.service.RightService;
import com.urp.service.UserGroupService;

@Resposibility
public class RightServiceImpl implements RightService{
	
	@AutoWired
	private JdbcTemplate jdbcTemplate;
	
	@AutoWired
	private FunctionService functionService;
	
	@AutoWired
	private UserGroupService userGroupService;
	
	@AutoWired
	private DesinerService desinerService;
	
	private static final int RESTYPE_FUN = 1;
	
	private Map<String,Boolean> rightsmap;
	@Override
	public String getAllFunRightDesinerByUserGroup(String ugid) {
		rightsmap = new HashMap<String, Boolean>();
		return getAllResRightDesinerByUserGroup(RESTYPE_FUN, ugid);
	}

	@Override
	public String getAllFunRightTreeByUserGroup(String ugid) {
		return getAllResRightTreeByUserGroup(RESTYPE_FUN, ugid);
	}

	@Override
	public String getAllResRightDesinerByUserGroup(int restype, String ugid) {
		List<Function> funlist = functionService.getChildren("-1");
		
		getChildren(restype, ugid, "-1");
		Desiner desiner = desinerService.getDesiner("-1", restype);
		
		StringBuffer xml = new StringBuffer();
		StringBuffer table = new StringBuffer();
		List<String> tables = new ArrayList<String>();
		
		xml.append(getDesinerHeaderXML());
		table.append("<table x=\""+desiner.getX()+"\" y=\""+desiner.getY()+"\" name=\"功能\" id=\"-1\" restype=\""+restype+"\">");
		for(Function fun : funlist){
			String name = fun.getTtitle();
			String id = fun.getTid();
			Boolean hasright = rightsmap.get(id);
			String subtable = createTableXML(restype, id, name, tables, ugid);
			String relation = "";
			if(!subtable.equals("")){
				relation = "<relation table=\""+name+"\" row=\""+id+"\" />";
			}
			table.append("<row name=\""+name+"\" id=\""+id+"\" restype=\""+restype+"\"><default>"+hasright+"</default>"+relation+"</row>");
		}
		table.append("</table>");
		xml.append(table.toString());
		for(int i=0; i<tables.size(); i++){
			xml.append(tables.get(i).toString());
		}
		
		xml.append("</sql>");
		//System.out.println(xml.toString());
		return xml.toString();
	}

	@Override
	public String getAllResRightTreeByUserGroup(int restype, String ugid) {
		return null;
	}
	
	public String getChildrenResRightsXML(int restype, String ugid, String parentid) {
		List<Function> list = getChildrenFunRights(restype, ugid, parentid);
		return functionService.getChildrenXMLByList(parentid, list);
	}
	
	public String getChildrenFunRightsXML(String ugid, String parentid){
		return getChildrenResRightsXML(RESTYPE_FUN, ugid, parentid);
	}
	
	public List<Function> getChildrenFunRights(int restype, String ugid, String parentid){
		String sql = "select * from ta_ugright r left join ta_functions f on r.resid=f.tid";
		sql = "select * from (" + sql +") " + " fr where fr.restype=? and fr.ugid=? and fr.tparentid=? group by resid order by fr.forderindex";
		
		List<Object> params = new ArrayList<Object>();
		params.add(restype);
		params.add(ugid);
		params.add(parentid);
		
		List<Function> list = null;
		try {
			list = jdbcTemplate.queryForBeans(sql, params, Function.class);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	private String createTableXML(int restype, String parentid, String parentname, List<String> allxml, String ugid){
		List<Function> list = functionService.getChildren(parentid);
		getChildren(restype, ugid, parentid);
		Desiner desiner = desinerService.getDesiner(parentid, restype);
		
		StringBuffer xml = new StringBuffer();
		if(list != null && list.size() > 0){
			xml.append("<table x=\""+desiner.getX()+"\" y=\""+desiner.getY()+"\" name=\""+parentname+"\" id=\""+parentid+"\" restype=\""+restype+"\">");
			xml.append("<row name=\""+parentid+"\"></row>");
			for(Function fun : list){
				String name = fun.getTtitle();
				String id = fun.getTid();
				Boolean hasright = rightsmap.get(id);
				String subtable = createTableXML(restype, id, name, allxml, ugid);
				String relation = "";
				if(!subtable.equals("")){
					relation = "<relation table=\""+name+"\" row=\""+id+"\" />";
				}
				xml.append("<row name=\""+name+"\" id=\""+id+"\" restype=\""+restype+"\"><default>"+hasright+"</default>"+relation+"</row>");
			}
			xml.append("</table>");
			allxml.add(xml.toString());
		}
		return xml.toString();
	}
	
	/**
	 * 
	 * @param restype
	 * @param ugid
	 * @param parentid
	 * @return
	 */
	private List<UGFunRight> getChildren(int restype, String ugid, String parentid){
		String sql = "select * from ta_ugright r left join ta_functions f on r.resid=f.tid";
		sql = "select * from (" + sql +") " + " fr where fr.restype=? and fr.ugid=? and fr.tparentid=? order by fr.forderindex";
		
		List<Object> params = new ArrayList<Object>();
		params.add(restype);
		params.add(ugid);
		params.add(parentid);
		
		List<UGFunRight> list = null;
		try {
			list = jdbcTemplate.queryForBeans(sql, params, UGFunRight.class);
			if(list != null && list.size() > 0){
				for(int i=0; i<list.size(); i++){
					rightsmap.put(list.get(i).getResid(), true);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		UserGroup ug = userGroupService.getUserGroup(ugid);
		if(!ug.getUgparentid().equals("-1")){
			getChildren(restype, ug.getUgparentid(), parentid);
		}
		return list;
	}
	
	private String getDesinerHeaderXML(){
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version=\"1.0\" encoding=\"utf-8\" ?>");
		xml.append("<sql><datatypes db=\"mysql\"><group label=\"Numeric\" color=\"rgb(238,238,170)\"><type label=\"Integer\" length=\"0\" sql=\"INTEGER\" re=\"INT\" quote=\"\"/><type label=\"Decimal\" length=\"1\" sql=\"DECIMAL\" re=\"DEC\" quote=\"\"/><type label=\"Single precision\" length=\"0\" sql=\"FLOAT\" quote=\"\"/><type label=\"Double precision\" length=\"0\" sql=\"DOUBLE\" re=\"DOUBLE\" quote=\"\"/></group>");
		xml.append("<group label=\"Character\" color=\"rgb(255,200,200)\"><type label=\"Char\" length=\"1\" sql=\"CHAR\" quote=\"'\"/><type label=\"Varchar\" length=\"1\" sql=\"VARCHAR\" quote=\"'\"/><type label=\"Text\" length=\"0\" sql=\"MEDIUMTEXT\" re=\"TEXT\" quote=\"'\"/><type label=\"Binary\" length=\"1\" sql=\"BINARY\" quote=\"'\"/><type label=\"Varbinary\" length=\"1\" sql=\"VARBINARY\" quote=\"'\"/><type label=\"BLOB\" length=\"0\" sql=\"BLOB\" re=\"BLOB\" quote=\"'\"/></group>");
		xml.append("<group label=\"Date &amp; Time\" color=\"rgb(200,255,200)\"><type label=\"Date\" length=\"0\" sql=\"DATE\" quote=\"'\"/><type label=\"Time\" length=\"0\" sql=\"TIME\" quote=\"'\"/><type label=\"Datetime\" length=\"0\" sql=\"DATETIME\" quote=\"'\"/><type label=\"Year\" length=\"0\" sql=\"YEAR\" quote=\"\"/><type label=\"Timestamp\" length=\"0\" sql=\"TIMESTAMP\" quote=\"'\"/></group>");
		xml.append("<group label=\"Miscellaneous\" color=\"rgb(200,200,255)\"><type label=\"ENUM\" length=\"1\" sql=\"ENUM\" quote=\"\"/><type label=\"SET\" length=\"1\" sql=\"SET\" quote=\"\"/><type label=\"Bit\" length=\"0\" sql=\"bit\" quote=\"\"/></group>");
		xml.append("</datatypes>");
		return xml.toString();
	}
}
