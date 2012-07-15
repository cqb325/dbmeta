package com.urp.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.at21.jdbc.core.JdbcTemplate;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Resposibility;
import com.urp.entry.Log;
import com.urp.service.LogService;

@Resposibility
public class LogServiceImpl implements LogService {
	
	@AutoWired
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public boolean addLog(Log log) {
		String sql = "insert into ro_log(logid,type,name,username,logtime,state,level) values(?,?,?,?,?,?,?)";
		
		List<Object> params = new ArrayList<Object>();
		params.add(UUID.randomUUID().toString());
		params.add(log.getType());
		params.add(log.getName());
		params.add(log.getUsername());
		params.add(new Date());
		params.add(log.getState());
		params.add(log.getLevel());
		
		try {
			jdbcTemplate.execute(sql, params.toArray());
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

}
