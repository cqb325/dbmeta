package com.dbmeta.action;

import com.cqb.core.ApplicationMap;
import com.cqb.core.ContextPvd;
import com.dbmeta.entry.Field;
import com.dbmeta.service.FieldService;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Server;

@Server(serverName="fieldAction")
public class FieldAction {
	
	@AutoWired
	private FieldService fieldService;
	
	public String editField(){
		try{
			Field field = new Field();
			field.setFieldid(fieldid);
			field.setFieldchnname(fieldchnname);
			field.setCodetableid(codetableid);
			field.setFieldiskey(fieldiskey);
			field.setFieldrule(fieldrule);
			field.setFieldposition(fieldposition);
			field.setFielddefaultvalue(fielddefaultvalue);
			field.setFieldseqid(fieldseqid);
			
			fieldService.editField(field);
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			ctx.getRequest().setAttribute("tableid", tableid);
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	private String tableid;
	private String fieldid;
	private String tableserverid;
	private String tablename;
	private String fieldname;
	private String fieldchnname;
	private int fieldsize;
	private int fieldtype;
	private String codetableid;
	private String fieldmemo;
	private int fieldscale;
	private String fieldformat;
	private int fieldcreateverid;
	private int fieldrequired;
	private int fieldiskey;
	private int multicodetable;
	private String fieldseqid;
	private int fieldrule;
	private int fieldposition;
	private String fielddefaultvalue;
	private String fielddbtype;
	public String getFieldid() {
		return fieldid;
	}
	public void setFieldid(String fieldid) {
		this.fieldid = fieldid;
	}
	public String getTableserverid() {
		return tableserverid;
	}
	public void setTableserverid(String tableserverid) {
		this.tableserverid = tableserverid;
	}
	public String getTablename() {
		return tablename;
	}
	public void setTablename(String tablename) {
		this.tablename = tablename;
	}
	public String getFieldname() {
		return fieldname;
	}
	public void setFieldname(String fieldname) {
		this.fieldname = fieldname;
	}
	public String getFieldchnname() {
		return fieldchnname;
	}
	public void setFieldchnname(String fieldchnname) {
		this.fieldchnname = fieldchnname;
	}
	public int getFieldsize() {
		return fieldsize;
	}
	public void setFieldsize(int fieldsize) {
		this.fieldsize = fieldsize;
	}
	public int getFieldtype() {
		return fieldtype;
	}
	public void setFieldtype(int fieldtype) {
		this.fieldtype = fieldtype;
	}
	public String getCodetableid() {
		return codetableid;
	}
	public void setCodetableid(String codetableid) {
		this.codetableid = codetableid;
	}
	public String getFieldmemo() {
		return fieldmemo;
	}
	public void setFieldmemo(String fieldmemo) {
		this.fieldmemo = fieldmemo;
	}
	public int getFieldscale() {
		return fieldscale;
	}
	public void setFieldscale(int fieldscale) {
		this.fieldscale = fieldscale;
	}
	public String getFieldformat() {
		return fieldformat;
	}
	public void setFieldformat(String fieldformat) {
		this.fieldformat = fieldformat;
	}
	public int getFieldcreateverid() {
		return fieldcreateverid;
	}
	public void setFieldcreateverid(int fieldcreateverid) {
		this.fieldcreateverid = fieldcreateverid;
	}
	public int getFieldrequired() {
		return fieldrequired;
	}
	public void setFieldrequired(int fieldrequired) {
		this.fieldrequired = fieldrequired;
	}
	public int getFieldiskey() {
		return fieldiskey;
	}
	public void setFieldiskey(int fieldiskey) {
		this.fieldiskey = fieldiskey;
	}
	public int getMulticodetable() {
		return multicodetable;
	}
	public void setMulticodetable(int multicodetable) {
		this.multicodetable = multicodetable;
	}
	public String getFieldseqid() {
		return fieldseqid;
	}
	public void setFieldseqid(String fieldseqid) {
		this.fieldseqid = fieldseqid;
	}
	public int getFieldrule() {
		return fieldrule;
	}
	public void setFieldrule(int fieldrule) {
		this.fieldrule = fieldrule;
	}
	public int getFieldposition() {
		return fieldposition;
	}
	public void setFieldposition(int fieldposition) {
		this.fieldposition = fieldposition;
	}
	public String getFielddefaultvalue() {
		return fielddefaultvalue;
	}
	public void setFielddefaultvalue(String fielddefaultvalue) {
		this.fielddefaultvalue = fielddefaultvalue;
	}
	public String getFielddbtype() {
		return fielddbtype;
	}
	public void setFielddbtype(String fielddbtype) {
		this.fielddbtype = fielddbtype;
	}
	public String getTableid() {
		return tableid;
	}
	public void setTableid(String tableid) {
		this.tableid = tableid;
	}
}
