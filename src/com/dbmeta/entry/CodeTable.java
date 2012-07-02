package com.dbmeta.entry;

import java.util.Map;

public class CodeTable {
	private String codetableid;
	private String codetabletitle;
	private String codetablememo;
	private int codetableistree;
	private Map<String, CodeTableData> codetabledatamap;
	public String getCodetableid() {
		return codetableid;
	}
	public void setCodetableid(String codetableid) {
		this.codetableid = codetableid;
	}
	public String getCodetabletitle() {
		return codetabletitle;
	}
	public void setCodetabletitle(String codetabletitle) {
		this.codetabletitle = codetabletitle;
	}
	public String getCodetablememo() {
		return codetablememo;
	}
	public void setCodetablememo(String codetablememo) {
		this.codetablememo = codetablememo;
	}
	public int getCodetableistree() {
		return codetableistree;
	}
	public void setCodetableistree(int codetableistree) {
		this.codetableistree = codetableistree;
	}
	public Map<String, CodeTableData> getCodetabledatamap() {
		return codetabledatamap;
	}
	public void setCodetabledatamap(Map<String, CodeTableData> codetabledatamap) {
		this.codetabledatamap = codetabledatamap;
	}
}
