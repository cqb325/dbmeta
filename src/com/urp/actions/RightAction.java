package com.urp.actions;

import com.cqb.core.ApplicationMap;
import com.cqb.core.ContextPvd;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Server;
import com.urp.entry.User;
import com.urp.service.RightService;

@Server(serverName="rightAction")
public class RightAction {
	
	@AutoWired
	private RightService rightService;
	//用户组id
	private String ugid;
	
	//资源父节点
	private String parentid;
	
	public String getAllFunRightDesinerXML(){
		try{
			
			String xml = rightService.getAllFunRightDesinerByUserGroup(ugid);
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			ctx.setRequestAttr("xml", xml);
			
			return "success";
		}catch(Exception e){
			e.printStackTrace();
			return "error";
		}
	}
	
	public String getChildrenFunRightsXML(){
		try{
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			User user = (User)ctx.getSessionAttr("user");
			if(user == null){
				return "logout";
			}
			String ugid = user.getUgroupid();
			String xml = rightService.getChildrenFunRightsXML(ugid, parentid);
			ctx.setRequestAttr("xml", xml);

			return "success";
		}catch(Exception e){
			e.printStackTrace();
			return "error";
		}
	}

	public void setUgid(String ugid) {
		this.ugid = ugid;
	}

	public void setRightService(RightService rightService) {
		this.rightService = rightService;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}
}
