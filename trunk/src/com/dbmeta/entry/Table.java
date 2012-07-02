package com.dbmeta.entry;

import java.util.List;
import java.util.Map;

public class Table {
	private String tableid;
	private String tablechnname;
	private String tablename;
	private String tablesql;
	private int tabletype;
	private String tablememo;
	private int tableclass;
	private int tablecreateverid;
	private String tableserverid;
	
	private List<Field> fields;
	private Map<String, Field> fieldsmap;
	
	public String getTableid() {
		return tableid;
	}
	public void setTableid(String tableid) {
		this.tableid = tableid;
	}
	public String getTablechnname() {
		return tablechnname;
	}
	public void setTablechnname(String tablechnname) {
		this.tablechnname = tablechnname;
	}
	public String getTablename() {
		return tablename;
	}
	public void setTablename(String tablename) {
		this.tablename = tablename;
	}
	public String getTablesql() {
		return tablesql;
	}
	public void setTablesql(String tablesql) {
		this.tablesql = tablesql;
	}
	public int getTabletype() {
		return tabletype;
	}
	public void setTabletype(int tabletype) {
		this.tabletype = tabletype;
	}
	public String getTablememo() {
		return tablememo;
	}
	public void setTablememo(String tablememo) {
		this.tablememo = tablememo;
	}
	public int getTableclass() {
		return tableclass;
	}
	public void setTableclass(int tableclass) {
		this.tableclass = tableclass;
	}
	public int getTablecreateverid() {
		return tablecreateverid;
	}
	public void setTablecreateverid(int tablecreateverid) {
		this.tablecreateverid = tablecreateverid;
	}
	public String getTableserverid() {
		return tableserverid;
	}
	public void setTableserverid(String tableserverid) {
		this.tableserverid = tableserverid;
	}
	public List<Field> getFields() {
		return fields;
	}
	public void setFields(List<Field> fields) {
		this.fields = fields;
	}
	public Map<String, Field> getFieldsmap() {
		return fieldsmap;
	}
	public void setFieldsmap(Map<String, Field> fieldsmap) {
		this.fieldsmap = fieldsmap;
	}
}
