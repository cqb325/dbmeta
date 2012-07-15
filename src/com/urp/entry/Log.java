package com.urp.entry;

import java.util.Date;

public class Log {
	private String logid;
	private String type;
	private String name;
	private String username;
	private Date logtime;
	private String state;
	private int level;
	public String getLogid() {
		return logid;
	}
	public void setLogid(String logid) {
		this.logid = logid;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Date getLogtime() {
		return logtime;
	}
	public void setLogtime(Date logtime) {
		this.logtime = logtime;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
}
