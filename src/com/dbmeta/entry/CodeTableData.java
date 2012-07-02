package com.dbmeta.entry;

public class CodeTableData {
	private String codetableid;
	private String code;
	private String chnname;
	private String parentcode;
	private int isgroup;
	public String getCodetableid() {
		return codetableid;
	}
	public void setCodetableid(String codetableid) {
		this.codetableid = codetableid;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getChnname() {
		return chnname;
	}
	public void setChnname(String chnname) {
		this.chnname = chnname;
	}
	public String getParentcode() {
		return parentcode;
	}
	public void setParentcode(String parentcode) {
		this.parentcode = parentcode;
	}
	public int getIsgroup() {
		return isgroup;
	}
	public void setIsgroup(int isgroup) {
		this.isgroup = isgroup;
	}
}
