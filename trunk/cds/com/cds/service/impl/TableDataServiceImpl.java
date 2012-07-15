package com.cds.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.at21.jdbc.core.JdbcTemplate;
import com.cds.service.AbstractDataService;
import com.dbmeta.entry.CodeTable;
import com.dbmeta.entry.CodeTableData;
import com.dbmeta.entry.Field;
import com.dbmeta.entry.Table;
import com.dbmeta.util.DBManager;
/**
 * 二维表的数据服务实现
 * @author Administrator
 *
 */
public class TableDataServiceImpl extends AbstractDataService{
	
	@SuppressWarnings("unchecked")
	public TableDataServiceImpl(Map arg){
		super(arg);
	}

	private Logger logger = Logger.getLogger(TableDataServiceImpl.class);
	
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public List<Map<String,Object>> getData(String tableId, String where) {
		String tablename = DBManager.getTableNameById(this.tableId);
		if(tablename == null){
			logger.info("不存在该表格:"+tablename);
			throw new RuntimeException("不存在该表格:"+tablename);
		}
		String sql = appendSqlByConds(tablename, where);
		List<Map<String, Object>> res = null;
		try{
			jdbcTemplate = new JdbcTemplate();
			res = jdbcTemplate.queryForList(sql);
		}catch(Exception e){
			e.printStackTrace();
		}
		return res;
	}

	@Override
	public String getJsonData() {
		List<Map<String,Object>> res = getData(this.tableId,this.where);
		return this.appendJsonData(res);
	}

	@Override
	public String getXmlData() {
		List<Map<String,Object>> res = getData(this.tableId,this.where);
		return this.appendXmlData(res);
	}

	@Override
	public String appendJsonData(List<Map<String,Object>> res) {
		Table table = DBManager.getTableById(this.tableId);
//		String tablename = DBManager.getTableNameById(tableId);
		List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
		List<Field> fields = table.getFields();
		for(Iterator<Field> iter = fields.iterator(); iter.hasNext();){
			Field field = iter.next();
			Map<String, Object> map = new HashMap<String, Object>();
			java.lang.reflect.Field[] fieldfields = Field.class.getDeclaredFields();
			for(int j =0; j < fieldfields.length; j++){
				java.lang.reflect.Field fieldfield =  fieldfields[j];
				String fieldname = fieldfield.getName();
				fieldfield.setAccessible(true);
//				Class<?> fieldtype = fieldfield.getType();
				String value = null;
				try {
					Object cellvalue = fieldfield.get(field);
					value = cellvalue == null ? null : fieldfield.get(field).toString();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
				if(value != null){
					map.put(fieldname, value);
				}
			}
			
			String codetableid = field.getCodetableid();
			if(codetableid != null && !codetableid.trim().equals("")){
				CodeTable codetable = DBManager.getCodeTableById(codetableid);
				String codetabletitle = codetable.getCodetabletitle();
				Map<String,CodeTableData> codemap = codetable.getCodetabledatamap();
				Map<String,String> codemap1 = new HashMap<String, String>();
				Map<String, Object> aaa = new HashMap<String, Object>();
				if(codemap.keySet().size() > 0){
					for(Iterator<String> iter1 = codemap.keySet().iterator(); iter1.hasNext();){
						String key = iter1.next();
						String codename = codemap.get(key).getChnname();
						codemap1.put(key, codename);
					}
					
				}
				aaa.put("name", codetabletitle);
				aaa.put("codes", codemap1);
				map.put("codetable", aaa);
			}
			result.add(map);
		}
		
		JSONObject json = new JSONObject();
		json.put("records", JSONArray.fromObject(res).toString());
		json.put("metas", JSONArray.fromObject(result).toString());
		System.out.println(json.toString());
		return json.toString();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public String appendXmlData(List<Map<String, Object>> res) {
//		String tablename = DBManager.getTableNameById(tableId);
		Table table = DBManager.getTableById(tableId);
		
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		xml.append("<data><metas>");
		List<Field> fields = table.getFields();
		for(int i = 0; i< fields.size(); i++){
			Field field = fields.get(i);
			xml.append("<field ");
			java.lang.reflect.Field[] fieldfields = Field.class.getDeclaredFields();
			for(int j =0; j < fieldfields.length; j++){
				java.lang.reflect.Field fieldfield =  fieldfields[j];
				String fieldname = fieldfield.getName();
				fieldfield.setAccessible(true);
				String value = null;
				try {
					Object cellvalue = fieldfield.get(field);
					value = cellvalue == null ? null : fieldfield.get(field).toString();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
				if(value != null){
					xml.append(fieldname+"=\""+value+"\" ");
				}
			}
			xml.append(">");
			String codetableid = field.getCodetableid();
			//存在代码表
			if(codetableid != null && !codetableid.trim().equals("")){
				CodeTable codetable = DBManager.getCodeTableById(codetableid);
				String codetabletitle = codetable.getCodetabletitle();
				Map<String,CodeTableData> map = codetable.getCodetabledatamap();
				if(map.keySet().size() > 0){
					xml.append("<codetable name=\""+codetabletitle+"\">");
					for(Iterator<String> iter = map.keySet().iterator(); iter.hasNext();){
						String key = iter.next();
						String codename = map.get(key).getChnname();
						xml.append("<code name=\""+codename+"\" value=\""+key+"\" />");
					}
					xml.append("</codetable>");
				}
			}
			xml.append("</field>");
		}
		xml.append("</metas>");
		xml.append("<records>");
		for(Iterator<?> iter = res.iterator(); iter.hasNext();){
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
		xml.append("</records></data>");
		System.out.println(xml);
		return xml.toString();
	}

	/**
	 * 拼sql语句
	 * @param tablename
	 * @param where
	 * @return
	 */
	public String appendSqlByConds(String tablename, String where){
		StringBuffer sql = new StringBuffer("select *")
			.append(" from ").append(tablename).append(" where ");
		
		String[] conds = where.split(",");
		for(String cond : conds){
			String[] condInfo = cond.split("\\|");
			sql.append(condInfo[0]);
			switch(Integer.parseInt(condInfo[1])){
				case 1:
					condInfo[1] = "=";
					sql.append("=").append(condInfo[2]);
					break;
				case 2:
					condInfo[1] = "<>";
					sql.append("<>").append(condInfo[2]);
					break;
				case 3:
					condInfo[1] = ">";
					sql.append(">").append(condInfo[2]);
					break;
				case 4:
					condInfo[1] = "<";
					sql.append("<").append(condInfo[2]);
					break;
				case 5:
					condInfo[1] = ">=";
					sql.append(">=").append(condInfo[2]);
					break;
				case 6:
					condInfo[1] = "<=";
					sql.append("<=").append(condInfo[2]);
					break;
				case 7:
					condInfo[1] = "between";
					String[] p = condInfo[2].split("$");
					sql.append("between ").append(p[0]).append(" and ").append(p[1]);
					break;
				case 8:
					condInfo[1] = "like";
					sql.append("like").append("%"+condInfo[2]+"%");
					break;
				case 20:
					condInfo[1] = "order by ";
					sql.append("order by ").append(condInfo[2]).append(" asc");
					break;
				case 21:
					condInfo[1] = "order by";
					sql.append("order by ").append(condInfo[2]).append(" desc");
					break;
			}
			sql.append(" and ");
		}
		sql.delete(sql.length()-4,sql.length()-1);
		int orderIndex = sql.indexOf("order by");
		if(orderIndex>0){
			sql.delete(orderIndex-4, orderIndex);
		}
		return sql.toString();
	}

}
