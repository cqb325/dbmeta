package com.dbmeta.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.at21.jdbc.core.JdbcTemplate;
import com.dbmeta.entry.Field;
import com.dbmeta.util.GetFieldMeta;
import com.dbmeta.util.Util;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Resposibility;

@Resposibility
public class FieldService {
	
	@AutoWired
	private JdbcTemplate jdbcTemplate;
	
	public void editField(Field field) throws SQLException {
		String sql = "update ro_dict_field set fieldchnname=?,codetableid=?,fieldiskey=?,fieldrule=?,fieldposition=?,fielddefaultvalue=?,fieldseqid=? where fieldid=?";
		
		List<Object> params = new ArrayList<Object>();
		params.add(field.getFieldchnname());
		params.add(field.getCodetableid());
		params.add(field.getFieldiskey());
		params.add(field.getFieldrule());
		params.add(field.getFieldposition());
		params.add(field.getFielddefaultvalue());
		params.add(field.getFieldseqid());
		params.add(field.getFieldid());
		
		jdbcTemplate.execute(sql, params.toArray());
	}
	
	/**
	 * 添加字段元数据管理
	 * @param serverid
	 * @param tablename
	 * @throws SQLException
	 */
	public void addFiledsManager(String serverid, String tablename) throws SQLException {
		//先删除
		String delsql = "delete from ro_dict_field where tableserverid=? and tablename=?";
		List<Object> delparams = new ArrayList<Object>();
		delparams.add(serverid);
		delparams.add(tablename);
		jdbcTemplate.execute(delsql, delparams.toArray());
		
		//后添加删除
		List<Field> fields = GetFieldMeta.getFieldsInfo(jdbcTemplate, tablename, serverid);
		List<Object[]> params = new ArrayList<Object[]>();
		for(int i=0; i< fields.size(); i++){
			List<Object> param = new ArrayList<Object>();
			Field field = fields.get(i);
			param.add(Util.getUUID());
			param.add(serverid);
			param.add(tablename);
			param.add(field.getFieldname());
			param.add(field.getFieldname());
			param.add(field.getFieldsize());
			param.add(field.getFieldtype());
			param.add(field.getFieldscale());
			param.add(field.getFieldrequired());
			param.add(field.getFieldiskey());
			param.add(field.getFieldposition());
			param.add(field.getFielddefaultvalue());
			params.add(param.toArray());
		}
		String sql = "insert into ro_dict_field (fieldid,tableserverid,tablename,fieldname,fieldchnname,fieldsize,fieldtype,fieldscale,fieldrequired,fieldiskey,fieldposition,fielddefaultvalue) values(?,?,?,?,?,?,?,?,?,?,?,?)";
		jdbcTemplate.batchUpdate(sql, params);
	}

}
