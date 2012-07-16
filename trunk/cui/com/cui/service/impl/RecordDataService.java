package com.cui.service.impl;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.log4j.Logger;

import com.at21.jdbc.core.JdbcTemplate;
import com.at21.jdbc.support.PageNation;
import com.cui.service.CUIService;
import com.cui.util.Constaint;
import com.cui.util.Date2JsonProcessor;
import com.dbmeta.entry.Field;
import com.dbmeta.entry.Table;
import com.dbmeta.util.DBManager;

public class RecordDataService implements CUIService{
	private Logger logger = Logger.getLogger(RecordDataService.class);
	
	private JdbcTemplate jdbcTemplate;
	@SuppressWarnings("unchecked")
	@Override
	public String excecute(Map paramsMap) {
		String datatype = paramsMap.get(Constaint.PARAM_DATATYPE).toString();
		if(datatype.equalsIgnoreCase(Constaint.CUI_DATATYPE_XML)){
			return getXMLData(paramsMap);
		}
		if(datatype.equalsIgnoreCase(Constaint.CUI_DATATYPE_JSON)){
			return getJSONData(paramsMap);
		}
		return null;
	}
	
	private String getJSONData(Map<String,String> paramsMap) {
		String tableId = (String)paramsMap.get(Constaint.PARAM_TABLEID);
		String tablename = DBManager.getTableNameById(tableId);
		if(tablename == null){
			logger.info("不存在该表格:"+tablename);
			throw new RuntimeException("不存在该表格:"+tablename);
		}
		String c_pageSize = paramsMap.get(Constaint.PARAM_PAGESIZE);
		if(c_pageSize == null){
			logger.info("不存在参数:"+Constaint.PARAM_PAGESIZE);
			throw new RuntimeException("不存在参数:"+Constaint.PARAM_PAGESIZE);
		}
		int pageSize = Integer.parseInt(c_pageSize);
		
		String c_pagenum = paramsMap.get(Constaint.PARAM_PAGENUM);
		if(c_pagenum == null){
			logger.info("不存在参数:"+Constaint.PARAM_PAGENUM);
			throw new RuntimeException("不存在参数:"+Constaint.PARAM_PAGENUM);
		}
		int pagenum = Integer.parseInt(c_pagenum);
		
		String sql = "select * from " + tablename;
		String where = "";
		where = getWhereSql(tableId, paramsMap);
		sql += " where "+where;
		logger.info(sql);
		
		jdbcTemplate = new JdbcTemplate();
		
		PageNation pageNation = new PageNation();
		pageNation.setPage(pagenum);
		pageNation.setPageSize(pageSize);
		
		JSONObject json = new JSONObject();
		try {
			pageNation.excute(sql, jdbcTemplate);
			long totalcounts = pageNation.getTotleCounts();
			int pagecount = pageNation.getPageCount();
			json.put("total", totalcounts);
			json.put("pagecount", pagecount);
			List<?> results = pageNation.getList();
			JsonConfig jsonConfig = new JsonConfig();
			Date2JsonProcessor beanProcessor = new Date2JsonProcessor();
			jsonConfig.registerJsonValueProcessor(Date.class, beanProcessor);
			jsonConfig.registerJsonValueProcessor(Timestamp.class, beanProcessor);
			json.put("records", JSONArray.fromObject(results,jsonConfig));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return json.toString();
	}

	@SuppressWarnings("unchecked")
	private String getXMLData(Map<String,String> paramsMap) {
		String tableId = (String)paramsMap.get(Constaint.PARAM_TABLEID);
		String tablename = DBManager.getTableNameById(tableId);
		if(tablename == null){
			logger.info("不存在该表格:"+tablename);
			throw new RuntimeException("不存在该表格:"+tablename);
		}
		String c_pageSize = paramsMap.get(Constaint.PARAM_PAGESIZE);
		if(c_pageSize == null){
			logger.info("不存在参数:"+Constaint.PARAM_PAGESIZE);
			throw new RuntimeException("不存在参数:"+Constaint.PARAM_PAGESIZE);
		}
		int pageSize = Integer.parseInt(c_pageSize);
		
		String c_pagenum = paramsMap.get(Constaint.PARAM_PAGENUM);
		if(c_pagenum == null){
			logger.info("不存在参数:"+Constaint.PARAM_PAGENUM);
			throw new RuntimeException("不存在参数:"+Constaint.PARAM_PAGENUM);
		}
		int pagenum = Integer.parseInt(c_pagenum);
		
		String sql = "select * from " + tablename;
		String where = "";
		where = getWhereSql(tableId, paramsMap);
		sql += " where "+where;
		logger.info(sql);
		
		jdbcTemplate = new JdbcTemplate();
		
		PageNation pageNation = new PageNation();
		pageNation.setPage(pagenum);
		pageNation.setPageSize(pageSize);
		
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		try {
			pageNation.excute(sql, jdbcTemplate);
			long totalcounts = pageNation.getTotleCounts();
			int pagecount = pageNation.getPageCount();
			xml.append("<records total=\""+totalcounts+"\" pagecount=\""+pagecount+"\">");
			List<?> results = pageNation.getList();
			logger.info(results.size());
			for(Iterator<?> iter = results.iterator(); iter.hasNext();){
				xml.append("<record>");
				Map record = (Map)iter.next();
				for(Iterator<?> rowiter = record.keySet().iterator(); rowiter.hasNext();){
					String fieldname = ((String)rowiter.next()).toLowerCase();
					Object value = record.get(fieldname);
					value = value == null ? "" : value;
					xml.append("<field name=\""+ fieldname + "\" value=\"" + value +"\" codevalue=\"\"/>");
				}
				xml.append("</record>");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		xml.append("</records>");
		logger.info(xml.toString());
		return xml.toString();
	}

	private String getWhereSql(String tableId, Map<String, String> paramsMap) {
		String where = " 1=1 ";
		Table table = DBManager.getTableById(tableId);
		List<Field> list = table.getFields();
		for(Iterator<String> iter = paramsMap.keySet().iterator(); iter.hasNext();){
			String paramkey = iter.next();
			String value = paramsMap.get(paramkey);
			for(Field field : list){
				String fieldname = field.getFieldname();
				if(fieldname.equalsIgnoreCase(paramkey)){
					where += " and "+fieldname + "='" + value +"' ";
//					int fieldtype = field.getFieldtype();
//					if(fieldtype == Constaint.CUI_DATATYPE_NUMBER || fieldtype == Constaint.CUI_DATATYPE_BOOLEAN){
//					}else if(fieldtype == Constaint.CUI_DATATYPE_DATE){
//						where += fieldname + "=" + value +" ";
//					}
				}
			}
			
			if(paramkey.equalsIgnoreCase("where")){
				String[] conds = value.split(",");
				for(String cond : conds){
					String[] letters = cond.split("\\|");
					String fieldname = letters[0];
					String op = letters[1];
					String fv = letters[2];
					
					String wherepart = getWherePart(fieldname, op, fv);
					where += " " + wherepart;
				}
			}
		}
		
		return where;
	}
	
	/**
	 * 获取字段where
	 * @param fieldname
	 * @param op
	 * @param fv
	 * @return
	 */
	private String getWherePart(String fieldname, String op, String fv) {
		String where = " and "+fieldname;
		int opvalue = Integer.valueOf(op);
		if(6 == opvalue){
			String[] args = fv.split("\\$");
			String betweenop = Constaint.OPERATER[opvalue];
			betweenop = betweenop.replace("arg1", "'"+args[0] + "'");
			betweenop = betweenop.replace("arg2", "'"+args[1] + "'");
			where += " "+betweenop;
		}else if(7 == opvalue){
			where += " "+Constaint.OPERATER[opvalue];
			where += " '%"+fv+"%'";
		}else if(20 == opvalue){
			where = " order by ";
			where += " "+fieldname+" asc";
		}else if(21 == opvalue){
			where = " order by ";
			where += " "+fieldname+" desc";
		}else {
			where += Constaint.OPERATER[opvalue];
			where += "'"+fv+"'";
		}
			
		return where;
	}
}
