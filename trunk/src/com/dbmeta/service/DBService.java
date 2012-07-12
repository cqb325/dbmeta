package com.dbmeta.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.at21.jdbc.core.JdbcTemplate;
import com.at21.jdbc.support.PageNation;
import com.dbmeta.entry.Field;
import com.dbmeta.entry.Table;
import com.dbmeta.util.GetAllTablesUtil;
import com.dbmeta.util.Util;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Resposibility;

@Resposibility
public class DBService {
	
	@AutoWired
	private JdbcTemplate jdbcTemplate;
	
	/**
	 * 获取所有的表名
	 * @param pageSize 
	 * @param page 
	 * @return
	 * @throws SQLException 
	 */
	public List<String> getAllTables() throws SQLException {
		List<String> tables = GetAllTablesUtil.getAllTableNames();
		System.out.println(tables.toString());
		return tables;
	}
	
	/**
	 * 获取所有已经管理的的表名
	 * @param pageSize 
	 * @param page 
	 * @return
	 * @throws SQLException 
	 */
	public PageNation getAllManageredTables(int page, int pageSize) throws SQLException {
		String sql = "select * from ro_dict_table";
		
		PageNation pageNation = new PageNation();
		pageNation.setPage(page);
		pageNation.setPageSize(pageSize);
		
		pageNation.excuteBeans(sql, jdbcTemplate, Table.class);
		return pageNation;
	}
	
	/**
	 * 添加表格到管理
	 * @param serverid
	 * @param tablename
	 * @throws SQLException 
	 */
	public void addTableManager(String serverid, String tablename) throws SQLException {
		String delsql = "delete from ro_dict_table where tableserverid=? and tablename=?";
		List<Object> delparams = new ArrayList<Object>();
		delparams.add(serverid);
		delparams.add(tablename);
		jdbcTemplate.execute(delsql, delparams.toArray());
		
		String sql = "insert into ro_dict_table(tableid, tablechnname, tablename, tableserverid) values(?,?,?,?)";
		List<Object> params = new ArrayList<Object>();
		params.add(Util.getUUID());
		params.add(tablename);
		params.add(tablename);
		params.add(serverid);
		
		jdbcTemplate.execute(sql, params.toArray());
	}

	public List<Field> getAllManageredFields(String tableid) throws SQLException {
		String sql = "select tablename,tableserverid from ro_dict_table where tableid=?";
		Map<String, Object> tablemap = jdbcTemplate.queryForMap(sql, new Object[]{tableid});
		String tablename = (String)tablemap.get("tablename");
		String serverid = (String)tablemap.get("tableserverid");
		
		String sql1 = "select * from ro_dict_field where tablename=? and tableserverid=?";
		
		List<Object> params = new ArrayList<Object>();
		params.add(tablename);
		params.add(serverid);
		
		List<Field> fields = jdbcTemplate.queryForBeans(sql1, params, Field.class);
		
		return fields;
	}
	
	/**
	 * 获取字段信息
	 * @param fieldid
	 * @return
	 * @throws SQLException
	 */
	public Field getFieldById(String fieldid) throws SQLException {
		String sql = "select * from ro_dict_field where fieldid = ?";
		List<Object> params = new ArrayList<Object>();
		params.add(fieldid);
		
		return jdbcTemplate.queryForBean(sql, params, Field.class);
	}
	
	/**
	 * 该表是否已经管理
	 * @param serverid
	 * @param tablename
	 * @return
	 * @throws SQLException
	 */
	public Boolean hasTableManagered(String serverid, String tablename) throws SQLException {
		String sql = "select count(*) from ro_dict_table where tableserverid=? and tablename=?";
		List<Object> params = new ArrayList<Object>();
		params.add(serverid);
		params.add(tablename);
		
		int count = jdbcTemplate.queryForInt(sql, params);
		if(count>0){
			return true;
		}
		return false;
	}
	
	/**
	 * 删除表格管理以及该表格的字段信息
	 * @param serverid
	 * @param tablename
	 * @throws SQLException 
	 */
	public void delTableManager(String serverid, String tablename) throws SQLException {
		String sql = "delete from ro_dict_table where tableserverid=? and tablename=?";
		String delfields = "delete from ro_dict_field where tableserverid=? and tablename=?";
		
		List<Object> params = new ArrayList<Object>();
		params.add(serverid);
		params.add(tablename);
		
		jdbcTemplate.update(sql, params.toArray());
		jdbcTemplate.update(delfields, params.toArray());
	}
}
