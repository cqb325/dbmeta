package com.dbmeta.util;

import javax.sql.DataSource;

import com.at21.jdbc.support.DataSourceHelper;
import com.dbmeta.entry.DBServer;

public class DBUtil {
	
	public static  DataSource getDBSourceById(String serviceid){
		DBServer dbServer = DBManager.getServerById(serviceid);
		String driver = dbServer.getRsdriver();
		String ip = dbServer.getRsip();
		String port = dbServer.getRsport();
		String schema = dbServer.getRsschema();
		int dbtype = dbServer.getRsdbtype();
		String url = getURL(dbtype, ip, port, schema);
		String username = dbServer.getRsusername();
		String password = dbServer.getRspassword();
		String dbalias = dbServer.getRsdbalias();
		DataSource ds = (DataSource)DataSourceHelper.getDataSource(driver, url, username, password, dbalias);
		return ds;
	}
	
	/**
	 * 获取url
	 * @param dbtype 数据库类型
	 * 1: mysql
	 * 2: oracle
	 * 3: sqlserver
	 * @param ip
	 * @param port
	 * @param schema
	 * @return
	 */
	private static String getURL(int dbtype, String ip, String port,
			String schema) {
		switch(dbtype){
			case 1:{
				return "jdbc:mysql://"+ip+":"+port+"/"+schema;
			}
			case 2:{
				return "jdbc:oracle:thin:@"+ip+":"+port+":"+schema;
			}
			case 3:{
				return "jdbc:sqlserver://"+ip+":"+port+";databaseName="+schema;
			}
		}
		return null;
	}
}
