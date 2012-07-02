package com.dbmeta.util;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.at21.jdbc.core.JdbcTemplate;
import com.dbmeta.entry.Field;

public class GetFieldMeta {
	
	/**
	 * 获取该表的字段信息
	 * @param jdbcTemplate
	 * @param tablename
	 * @param serverid
	 * @return
	 */
	public static List<Field> getFieldsInfo(JdbcTemplate jdbcTemplate, String tablename, String serverid){
		List<Field> fields = new ArrayList<Field>();
		try {
			//获取字段元数据
			ResultSet rs = jdbcTemplate.getDataSource().getConnection().getMetaData().getColumns(null, null, tablename, "%");
			//获取主键信息
			ResultSet keyrs = jdbcTemplate.getDataSource().getConnection().getMetaData().getPrimaryKeys(null,null,tablename);
			//保存主键信息
			Map<String, Boolean> iskey = new HashMap<String, Boolean>();
			while(keyrs.next()){
				iskey.put(keyrs.getString("COLUMN_NAME"), true);
			}
			while(rs.next()){
				//创建字段对象
				Field field = new Field();
				String fieldname = rs.getString("COLUMN_NAME");
				int fieldiskey = 0;
				if(iskey.get(fieldname) != null && iskey.get(fieldname)){
					fieldiskey = -1;
				}
				field.setFieldiskey(fieldiskey);
				int fieldtype = 1;
				int fieldsize = rs.getInt("COLUMN_SIZE");
				String fieldrequiredstr = rs.getString("IS_NULLABLE");
				int fieldrequired = fieldrequiredstr.equals("NO") ? -1 : 0;
				int fieldposition = rs.getInt("ORDINAL_POSITION");
				String fielddefaultvalue = rs.getString("COLUMN_DEF");
				String fieldtypename = rs.getString("TYPE_NAME");
				if(fieldtypename.equals("INT") || fieldtypename.equals("DOUBLE")|| fieldtypename.equals("BIGINT")|| fieldtypename.equals("FLOAT")|| fieldtypename.equals("DECIMAL")){
						fieldtype = 2;
				}
				if(fieldtypename.equals("TEXT") ||fieldtypename.equals("VARCHAR") ||fieldtypename.equals("CHAR") ||fieldtypename.equals("LONGTEXT")){
						fieldtype = 1;
				}
				if(fieldtypename.equals("DATE")){
						fieldtype = 3;
				}
				if(fieldtypename.equals("DATETIME")){
					fieldtype = 4;
				}
				if(fieldtypename.equals("BIT")){
					fieldtype = 5;
				}
				if(fieldtypename.equals("LONGBLOB") || fieldtypename.equals("BLOB")){
						fieldtype = 7;
				}
				int fieldscale = rs.getInt("DECIMAL_DIGITS");
				field.setFieldtype(fieldtype);
				field.setFieldname(fieldname);
				field.setFieldsize(fieldsize);
				field.setFieldrequired(fieldrequired);
				field.setFieldposition(fieldposition);
				field.setFielddefaultvalue(fielddefaultvalue);
				field.setFieldscale(fieldscale);
				fields.add(field);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return fields;
	}
	
	public static void main(String[] args) {
		JdbcTemplate jdbct = new JdbcTemplate();
		List<Field> list = GetFieldMeta.getFieldsInfo(jdbct, "test","-1");
	}
}
