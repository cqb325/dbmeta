package com.urp.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.at21.jdbc.core.JdbcTemplate;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Resposibility;
import com.urp.entry.User;
import com.urp.service.UserService;
import com.urp.utils.Md5;

@Resposibility
public class UserServiceImpl implements UserService{
	@AutoWired
	private JdbcTemplate jdbcTemplate;
	
	/**
	 * 用户验证
	 * @param user
	 * @return
	 */
	@Override
	public User checkUser(User user) {
		String sql = "select * from ta_user where username=? and password=?";
		
		List<Object> list = new ArrayList<Object>();
		list.add(user.getUsername());
		String psw = Md5.encode(user.getPassword());
		list.add(psw);
		
		try {
			User getUser = jdbcTemplate.queryForBean(sql, list, User.class);
			if(getUser != null){
				return getUser;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return null;
	}
}
