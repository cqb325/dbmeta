package com.cui.service.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.at21.jdbc.core.JdbcTemplate;
import com.cui.service.CUIService;
import com.cui.util.Constaint;
import com.dbmeta.util.DBManager;

public class ExecuteDataService implements CUIService {
	
	private String tablename;
	
	private Logger logger = Logger.getLogger(ExecuteDataService.class);
	
	@Override
	public String excecute(Map paramsMap) {
		try{
			String tableid = paramsMap.get(Constaint.PARAM_TABLEID).toString();
			String xml = paramsMap.get(Constaint.PARAM_XML).toString();
			Document doc = DocumentHelper.parseText(xml);
			
			tablename = DBManager.getTableNameById(tableid);
			Element root = doc.getRootElement();
			String optype = root.attributeValue(Constaint.CUI_EXECUTE_XMLATTRIBUTE_OPTYPE);
			if(optype.equals(Constaint.CUI_EXECUTE_OPTYPE_INSERT)){
				JSONObject json = new JSONObject();
				Boolean result = insert(optype, root);
				json.put("result", result);
				return json.toString();
			}else if(optype.equals(Constaint.CUI_EXECUTE_OPTYPE_UPDATE)){
				JSONObject json = new JSONObject();
				Boolean result = update(optype, root);
				json.put("result", result);
				return json.toString();
			}
			else if(optype.equals(Constaint.CUI_EXECUTE_OPTYPE_DELETE)){
				JSONObject json = new JSONObject();
				Boolean result = delete(optype, root);
				json.put("result", result);
				return json.toString();
			}
			}catch (Exception e) {
				e.printStackTrace();
			}
			return null;
	}
	
	private Boolean delete(String optype, Element root) throws SQLException {
		//多条记录
		List<?> records = root.selectNodes("record");
		JdbcTemplate jdbcTemplate = new JdbcTemplate();
		for(int i=0; i< records.size(); i++){
			Element record = (Element)records.get(i);
			Element wherenode = (Element)record.selectSingleNode("where");
			List<?> wherenodes = wherenode.selectNodes("field");
			
			List<Object> params = new ArrayList<Object>();
			StringBuffer where = new StringBuffer();
			where.append(" where ");
			for(Iterator<?> whereiter = wherenodes.iterator(); whereiter.hasNext();){
				Element field = (Element)whereiter.next();
				String fieldname = field.attributeValue("id");
				String fieldtype = field.attributeValue("type");
				Object fieldvalue = field.getTextTrim();
				where.append(fieldname+"=? ");
				if(whereiter.hasNext()){
					where.append(" and ");
				}
				params.add(fieldvalue);
			}
			String realsql = optype+ " from " +tablename+ where.toString();
			logger.info(realsql);
			jdbcTemplate.execute(realsql, params.toArray());
		}
		return true;
	}

	private Boolean update(String optype, Element root) throws SQLException {
		//多条记录
		List records = root.selectNodes("record");
		JdbcTemplate jdbcTemplate = new JdbcTemplate();
		for(int i=0; i< records.size(); i++){
			Element record = (Element)records.get(i);
			List fieldnodes = record.selectNodes("field");
			
			StringBuffer sql = new StringBuffer();
			List<Object> params = new ArrayList<Object>();
			sql.append(optype+" "+tablename+" set ");
			for(Iterator<?> iter = fieldnodes.iterator(); iter.hasNext();){
				Element field = (Element)iter.next();
				String fieldname = field.attributeValue("id");
				String fieldtype = field.attributeValue("type");
				String fieldiskey = field.attributeValue("iskey");
				if(!fieldiskey.equals("-1")){
					sql.append(" "+fieldname+"=?");
					if(iter.hasNext()){
						sql.append(",");
					}
					Object fieldvalue = field.getTextTrim();
					params.add(fieldvalue);
				}
			}
			Element wherenode = (Element)record.selectSingleNode("where");
			List wherenodes = wherenode.selectNodes("field");
			StringBuffer where = new StringBuffer();
			where.append(" where ");
			for(Iterator<?> whereiter = wherenodes.iterator(); whereiter.hasNext();){
				Element field = (Element)whereiter.next();
				String fieldname = field.attributeValue("id");
				String fieldtype = field.attributeValue("type");
				Object fieldvalue = field.getTextTrim();
				where.append(fieldname+"=? ");
				if(whereiter.hasNext()){
					where.append(" and ");
				}
				params.add(fieldvalue);
			}
			String realsql = sql.toString() + where.toString();
			logger.info(realsql);
			jdbcTemplate.execute(realsql, params.toArray());
		}
		
		return true;
	}

	/**
	 * 新增数据
	 * @param optype
	 * @param root
	 * @return
	 * @throws SQLException
	 */
	@SuppressWarnings("unchecked")
	private Boolean insert(String optype, Element root) throws SQLException {
		//多条记录
		List records = root.selectNodes("record");
		JdbcTemplate jdbcTemplate = new JdbcTemplate();
		for(int i=0; i< records.size(); i++){
			Element record = (Element)records.get(i);
			List fieldnodes = record.selectNodes("field");
			
			StringBuffer sql = new StringBuffer();
			StringBuffer valuesql = new StringBuffer();
			List<Object> params = new ArrayList<Object>();
			sql.append(optype+" into "+tablename+"(");
			valuesql.append("(");
			for(Iterator<?> iter = fieldnodes.iterator(); iter.hasNext();){
				Element field = (Element)iter.next();
				String fieldname = field.attributeValue("id");
				String fieldtype = field.attributeValue("type");
				String fieldiskey = field.attributeValue("iskey");
				Object fieldvalue = null;
				if(fieldiskey.equals("-1")){
					String seqid = field.attributeValue("seqid");
					try {
						Object newid = DBManager.getNextSeq(seqid);
						fieldvalue = newid;
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}else{
					fieldvalue = field.getTextTrim();
				}
				sql.append(fieldname);
				valuesql.append("?");
				if(iter.hasNext()){
					sql.append(",");
					valuesql.append(",");
				}else{
					sql.append(")");
					valuesql.append(")");
				}
				params.add(fieldvalue);
			}
			
			//
			String realsql = sql.toString() +" values" + valuesql.toString();
			logger.info(realsql);
			jdbcTemplate.execute(realsql, params.toArray());
		}
		return true;
	}

}
