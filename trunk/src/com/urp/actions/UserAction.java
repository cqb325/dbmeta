package com.urp.actions;

import com.cqb.annotation.AutoForm;
import com.cqb.core.ApplicationMap;
import com.cqb.core.ContextPvd;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Server;
import com.urp.entry.User;
import com.urp.service.UserService;

@Server(serverName="userAction")
public class UserAction {
	
	@AutoWired
	private UserService userservice;
	
	@AutoForm
	private User user;
	/**
	 * 登录
	 * @return
	 */
	public String login(){
		try{
			User getUser = userservice.checkUser(user);
			if(getUser != null){
				
				ContextPvd ctx = ApplicationMap.getContextPvd(this);
				ctx.setSessionAttr("user", getUser);
				
				return "success";
			}
		}catch(Exception e){
			e.printStackTrace();
			return "logout";
		}
		return "logout";
	}
	
	public void setUserservice(UserService userservice) {
		this.userservice = userservice;
	}
	public void setUser(User user) {
		this.user = user;
	}
}
