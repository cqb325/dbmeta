package com.urp.actions;

import com.cqb.core.ApplicationMap;
import com.cqb.core.ContextPvd;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Server;
import com.urp.service.FunctionService;

@Server(serverName="functionAction")
public class FunctionAction {
	
	@AutoWired
	private FunctionService functionService;
	
	private String parentid;
	
	private int isgroup;
	
	public String getChildrenXMLByParentId(){
		try{
			parentid = parentid == null ? "-1" : parentid;
			String xml = functionService.getChildrenXML(parentid, isgroup);
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			ctx.setRequestAttr("xml", xml);
			
			return "success";
		}catch(Exception e){
			e.printStackTrace();
			return "error";
		}
	}

	public void setFunctionService(FunctionService functionService) {
		this.functionService = functionService;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public void setIsgroup(int isgroup) {
		this.isgroup = isgroup;
	}
}
