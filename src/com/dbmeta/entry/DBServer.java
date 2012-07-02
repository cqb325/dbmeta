package com.dbmeta.entry;

public class DBServer {
	private String rsid;
	private String rstitle;
	private String rsdriver;
	private int rsdbtype;
	private String rsip;
	private String rsport;
	private String rsusername;
	private String rspassword;
	private String rsdbalias;
	private String rsschema;
	
	private int rsminconnection;
	private int rsmaxconnection;
	public String getRsid() {
		return rsid;
	}
	public void setRsid(String rsid) {
		this.rsid = rsid;
	}
	public String getRstitle() {
		return rstitle;
	}
	public void setRstitle(String rstitle) {
		this.rstitle = rstitle;
	}
	public String getRsdriver() {
		return rsdriver;
	}
	public void setRsdriver(String rsdriver) {
		this.rsdriver = rsdriver;
	}
	public int getRsdbtype() {
		return rsdbtype;
	}
	public void setRsdbtype(int rsdbtype) {
		this.rsdbtype = rsdbtype;
	}
	public String getRsip() {
		return rsip;
	}
	public void setRsip(String rsip) {
		this.rsip = rsip;
	}
	public String getRsport() {
		return rsport;
	}
	public void setRsport(String rsport) {
		this.rsport = rsport;
	}
	public String getRsusername() {
		return rsusername;
	}
	public void setRsusername(String rsusername) {
		this.rsusername = rsusername;
	}
	public String getRspassword() {
		return rspassword;
	}
	public void setRspassword(String rspassword) {
		this.rspassword = rspassword;
	}
	public String getRsdbalias() {
		return rsdbalias;
	}
	public void setRsdbalias(String rsdbalias) {
		this.rsdbalias = rsdbalias;
	}
	public String getRsschema() {
		return rsschema;
	}
	public void setRsschema(String rsschema) {
		this.rsschema = rsschema;
	}
	public int getRsminconnection() {
		return rsminconnection;
	}
	public void setRsminconnection(int rsminconnection) {
		this.rsminconnection = rsminconnection;
	}
	public int getRsmaxconnection() {
		return rsmaxconnection;
	}
	public void setRsmaxconnection(int rsmaxconnection) {
		this.rsmaxconnection = rsmaxconnection;
	}
}
