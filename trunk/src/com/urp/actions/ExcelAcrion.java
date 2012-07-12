package com.urp.actions;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.cqb.action.FormFile;
import com.cqb.core.ApplicationMap;
import com.cqb.core.ContextPvd;
import com.dbmeta.entry.Table;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Server;
import com.urp.service.impl.ExcelServiceImpl;

@Server(serverName="excelAction")
public class ExcelAcrion {
	
	private FormFile file;
	private String tableid;
	
	@AutoWired
	private ExcelServiceImpl excelServiceImpl;

	@SuppressWarnings("deprecation")
	public String validateExcel(){
		try{
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			String rootpath = ctx.getRequest().getRealPath("/");
			boolean ret = excelServiceImpl.savefiletemp(file, rootpath);
			JSONObject json = null;
			if(ret){
				Map<String, List<Map<String,String>>> data = excelServiceImpl.loadExcelData(rootpath);
				json = JSONObject.fromObject(data);
			}
			excelServiceImpl.deleteTemp(rootpath);
			
			List<Table> tables = excelServiceImpl.getAllManageredTables();
			
			System.out.println(json.toString());
			ctx.setRequestAttr("json", json.toString());
			ctx.setRequestAttr("tables", tables);
			return "success";
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	/**
	 * 
	 * @return
	 */
	public String insertData(){
		try{
			boolean ret = excelServiceImpl.insertData(tableid);
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			ctx.setRequestAttr("json", "{\"result\":"+ret+"}");
			return "success";
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	public void setFile(FormFile file) {
		this.file = file;
	}

	public void setTableid(String tableid) {
		this.tableid = tableid;
	}
}
