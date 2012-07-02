package com.urp.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.at21.jdbc.core.JdbcTemplate;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Resposibility;
import com.urp.entry.Desiner;
import com.urp.service.DesinerService;

@Resposibility
public class DesinerServiceImpl implements DesinerService {
	
	@AutoWired
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public Desiner getDesiner(String resid, int restype) {
		String sql = "select * from ta_desiner where resid=? and restype=?";
		List<Object> params = new ArrayList<Object>();
		params.add(resid);
		params.add(restype);
		
		Desiner desiner = null;
		try {
			desiner = jdbcTemplate.queryForBean(sql, params, Desiner.class);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return desiner;
	}

}
