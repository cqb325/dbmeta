package com.dbmeta.util;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.at21.jdbc.core.JdbcTemplate;

public class GetAllTablesUtil {
	
	public static List<String> getAllTableNames(){
		JdbcTemplate jdbcTemplate = new JdbcTemplate();
		Connection con = null;
		
		List<String> tables = new ArrayList<String>();  
		try {
			con = jdbcTemplate.getDataSource().getConnection();
			DatabaseMetaData dm = con.getMetaData();
			String []para=new String[1];
			para[0] = "TABLE";
			ResultSet resultset = dm.getTables(null, null, null, para);
			while( resultset.next() ){
				String tablename = resultset.getString(3);
				tables.add(tablename);
			}
			resultset.close();
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return tables;
	}
}
