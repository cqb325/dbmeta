package com.cui.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.cui.service.CUIService;
import com.cui.util.Constaint;
import com.dbmeta.entry.CodeTable;
import com.dbmeta.entry.CodeTableData;
import com.dbmeta.entry.Field;
import com.dbmeta.entry.Table;
import com.dbmeta.util.DBManager;

public class MetaDataService implements CUIService {

	@Override
	public String excecute(Map paramsMap) {
		String datatype = paramsMap.get(Constaint.PARAM_DATATYPE).toString();
		if(datatype.equalsIgnoreCase(Constaint.CUI_DATATYPE_XML)){
			return getXMLMeta(paramsMap);
		}
		if(datatype.equalsIgnoreCase(Constaint.CUI_DATATYPE_JSON)){
			return getJSONMeta(paramsMap);
		}
		return null;
	}

	private String getJSONMeta(Map paramsMap) {
		String tableId = (String)paramsMap.get(Constaint.PARAM_TABLEID);
		String tablename = DBManager.getTableNameById(tableId);
		Table table = DBManager.getTableById(tableId);
		
		JSONObject fieldjson = new JSONObject();
		List<Field> fields = table.getFields();
		List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
		for(Iterator<Field> iter = fields.iterator(); iter.hasNext();){
			Field field = iter.next();
			Map<String, Object> map = new HashMap<String, Object>();
			java.lang.reflect.Field[] fieldfields = Field.class.getDeclaredFields();
			for(int j =0; j < fieldfields.length; j++){
				java.lang.reflect.Field fieldfield =  fieldfields[j];
				String fieldname = fieldfield.getName();
				fieldfield.setAccessible(true);
				Class<?> fieldtype = fieldfield.getType();
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
		json.put("fields", JSONArray.fromObject(result).toString());
		json.put("tablename", tablename);
		json.put("tableid", tableId);
		return json.toString();
	}

	private String getXMLMeta(Map paramsMap) {
		String tableId = (String)paramsMap.get(Constaint.PARAM_TABLEID);
		String tablename = DBManager.getTableNameById(tableId);
		Table table = DBManager.getTableById(tableId);
		
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		xml.append("<metas tablename=\""+tablename+"\" tableid=\""+tableId+"\">");
		List<Field> fields = table.getFields();
		for(int i = 0; i< fields.size(); i++){
			Field field = fields.get(i);
			xml.append("<field ");
			java.lang.reflect.Field[] fieldfields = Field.class.getDeclaredFields();
			for(int j =0; j < fieldfields.length; j++){
				java.lang.reflect.Field fieldfield =  fieldfields[j];
				String fieldname = fieldfield.getName();
				fieldfield.setAccessible(true);
				Class<?> fieldtype = fieldfield.getType();
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
			//´æÔÚ´úÂë±í
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
		return xml.toString();
	}

	private String toStringValue(Class<?> fieldtype, Object object) {
		String value = null;
		if(fieldtype.equals(int.class) || fieldtype.equals(double.class)
				|| fieldtype.equals(float.class) || fieldtype.equals(boolean.class)){
			value = object + "";
		}
		return value;
	}
}
