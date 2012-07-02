package com.urp.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.at21.jdbc.core.JdbcTemplate;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Resposibility;
import com.urp.entry.Function;
import com.urp.service.FunctionService;

@Resposibility
public class FunctionServiceImpl implements FunctionService {

	@AutoWired
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public List<Function> getChildren(String parentid, int isgroup) {
		
		String sql = "select * from ta_functions where tparentid=? and tisgroup=? order by forderindex";
		List<Object> params = new ArrayList<Object>();
		params.add(parentid);
		params.add(isgroup);
		
		List<Function> list = null;
		try {
			list = jdbcTemplate.queryForBeans(sql, params, Function.class);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public String getChildrenXML(String parentid, int isgroup) {
		
		List<Function> list = getChildren(parentid, isgroup);
		
		return getChildrenXMLByList(parentid, list);
	}

	@Override
	public List<Function> getChildren(String parentid) {
		String sql = "select * from ta_functions where tparentid=? order by forderindex";
		List<Object> params = new ArrayList<Object>();
		params.add(parentid);
		
		List<Function> list = null;
		try {
			list = jdbcTemplate.queryForBeans(sql, params, Function.class);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public String getChildrenXML(String parentid) {
		List<Function> list = getChildren(parentid);
		
		return getChildrenXMLByList(parentid, list);
	}
	
	public String getChildrenXMLByList(String parentid, List<Function> list) {
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		xml.append("<tree id=\""+parentid+"\">");
		for(Iterator<Function> iter = list.iterator(); iter.hasNext();){
			Function fun = iter.next();
			String alias = fun.getTtitle();
			String id = fun.getTid();
			int level = fun.getTlevel();
			String img = fun.getFimg();
			String code = fun.getTcode();
			String url = fun.getFurl();
			xml.append("<item text=\""+alias+"\" id=\""+id+"\" im0=\""+img+"\" im1=\""+img+"\" im2=\""+img+"\">");
			xml.append("<userdata name=\"code\">"+code+"</userdata>");
			xml.append("<userdata name=\"level\">"+level+"</userdata>");
			xml.append("<userdata name=\"href\">"+url+"</userdata>");
			xml.append("<item text=\"\"/>");
			xml.append("</item>");
		}
		xml.append("</tree>");
		return xml.toString();
	}
}
