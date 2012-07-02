package com.urp.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.at21.jdbc.core.JdbcTemplate;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Resposibility;
import com.urp.entry.UserGroup;
import com.urp.service.UserGroupService;

@Resposibility
public class UserGroupServiceImpl implements UserGroupService {
	@AutoWired
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public List<UserGroup> getGroupByParentId(String parentid) {
		
		String sql = "select * from ta_usergroup where ugparentid=? and ugisgroup=-1 order by ugorderindex";
		List<Object> params = new ArrayList<Object>();
		params.add(parentid);
		
		
		try {
			return jdbcTemplate.queryForBeans(sql, params, UserGroup.class);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return null;
	}

	@Override
	public String getChildrenXML(String parentid) {
		List<UserGroup> list = getGroupByParentId(parentid);
		
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		xml.append("<tree id=\""+parentid+"\">");
		for(Iterator<UserGroup> iter = list.iterator(); iter.hasNext();){
			UserGroup ug = iter.next();
			String alias = ug.getUgtitle();
			String id = ug.getUgid();
			int level = ug.getUglevel();
			String img = ug.getUgimg();
			String code = ug.getUgcode();
			xml.append("<item text=\""+alias+"\" id=\""+id+"\" im0=\""+img+"\" im1=\""+img+"\" im2=\""+img+"\">");
			xml.append("<userdata name=\"code\">"+code+"</userdata>");
			xml.append("<userdata name=\"level\">"+level+"</userdata>");
			xml.append("<item text=\"\"/>");
			xml.append("</item>");
		}
		xml.append("</tree>");
		return xml.toString();
	}

	@Override
	public UserGroup getUserGroup(String ugid) {
		String sql = "select * from ta_usergroup where ugid=?";
		
		List<Object> params = new ArrayList<Object>();
		params.add(ugid);
		
		UserGroup ug = null;
		try {
			ug = jdbcTemplate.queryForBean(sql, params, UserGroup.class);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return ug;
	}

}
