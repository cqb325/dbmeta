package com.dbmeta.action;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.at21.jdbc.support.PageNation;
import com.cqb.core.ApplicationMap;
import com.cqb.core.ContextPvd;
import com.dbmeta.entry.Field;
import com.dbmeta.entry.Table;
import com.dbmeta.service.DBService;
import com.dbmeta.service.FieldService;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Server;

@Server(serverName="dbAction")
public class DBAction {
	
	@AutoWired
	private DBService dbService;
	
	@AutoWired
	private FieldService fieldService;
	
	private int page = -1;
	private int pageSize = -1;
	
	/**
	 * 获取所有的表格
	 * @return
	 */
	public String getAllTables(){
		try {
			List<String> tables = dbService.getAllTables();
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			ctx.getRequest().setAttribute("tables", tables);
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	
	/**
	 * 获取所有已经管理的的表格
	 * @return
	 */
	public String getAllManageredTables(){
		try {
			page = page == -1 ? 0 : page;
			pageSize = pageSize == -1 ? 10 : pageSize;
			PageNation pageNation = dbService.getAllManageredTables(page, pageSize);
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			ctx.getRequest().setAttribute("pageNation", pageNation);
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	
	/**
	 * 添加表格到管理
	 * @return
	 */
	public String addTableManager(){
		try {
			dbService.addTableManager(serverid, tablename);
			fieldService.addFiledsManager(serverid, tablename);
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	
	/**
	 * 添加表格到管理
	 * @return
	 */
	public String addUMF2Manager(){
		try {
			fieldService.addUMF2Manager(tableid, tablename, serverid);
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	
	/**
	 * 所有已经管理的字段
	 * @return
	 */
	public String getAllManageredFields(){
		try {
			List<Field> fields = dbService.getAllManageredFields(tableid);
			System.out.println(fields.size());
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			ctx.getRequest().setAttribute("json", JSONArray.fromObject(fields).toString());
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	
	/**
	 * 获取字段信息
	 * @return
	 */
	public String getFieldById(){
		try {
			Field field = dbService.getFieldById(fieldid);
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			ctx.getRequest().setAttribute("field", field);
			ctx.getRequest().setAttribute("tableid", tableid);
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	
	/**
	 * 该表是否被管理
	 * @return
	 */
	public String hasTableManagered(){
		try {
			Boolean result = dbService.hasTableManagered(serverid, tablename);
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			JSONObject json = new JSONObject();
			json.put("result", result);
			ctx.getRequest().setAttribute("json", json.toString());
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	
	/**
	 * 删除表格管理
	 * @return
	 */
	public String delTableManager(){
		try {
			dbService.delTableManager(serverid, tablename);
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}
	
	private String tableid;
	private String tablename;
	private String tablechnname;
	private String serverid;
	private String fieldid;
	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public String getServerid() {
		return serverid;
	}

	public void setServerid(String serverid) {
		this.serverid = serverid;
	}

	public String getTablechnname() {
		return tablechnname;
	}

	public void setTablechnname(String tablechnname) {
		this.tablechnname = tablechnname;
	}

	public String getTableid() {
		return tableid;
	}

	public void setTableid(String tableid) {
		this.tableid = tableid;
	}

	public String getFieldid() {
		return fieldid;
	}

	public void setFieldid(String fieldid) {
		this.fieldid = fieldid;
	}
}
