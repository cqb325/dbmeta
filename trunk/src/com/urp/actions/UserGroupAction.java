package com.urp.actions;

import com.cqb.core.ApplicationMap;
import com.cqb.core.ContextPvd;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Server;
import com.urp.service.UserGroupService;

@Server(serverName="userGroupAction")
public class UserGroupAction {
	
	@AutoWired
	private UserGroupService usergroupservice;
	
	private String parentid;
	/**
	 * 登录
	 * @return
	 */
	public String getChildrenXMLByParentId(){
		try{
			parentid = parentid == null ? "-1" : parentid;
			
			String xml = usergroupservice.getChildrenXML(parentid);
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			ctx.setRequestAttr("xml", xml);
				
			return "success";
		}catch(Exception e){
			e.printStackTrace();
			return "error";
		}
	}
	
	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public void setUsergroupservice(UserGroupService usergroupservice) {
		this.usergroupservice = usergroupservice;
	}
}
