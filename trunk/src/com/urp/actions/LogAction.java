package com.urp.actions;

import com.cqb.annotation.AutoForm;
import com.cqb.core.ApplicationMap;
import com.cqb.core.ContextPvd;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Server;
import com.urp.entry.Log;
import com.urp.entry.User;
import com.urp.service.LogService;

@Server(serverName="logAction")
public class LogAction {
	
	@AutoForm
	private Log log;
	
	@AutoWired
	private LogService logService;
	
	/**
	 * 添加日志
	 * @return
	 */
	public String addLog(){
		try{
			ContextPvd ctx = ApplicationMap.getContextPvd(this);
			User user = (User)ctx.getSessionAttr("user");
			
			log.setUsername(user.getUalias());
			
			logService.addLog(log);
			ctx.setRequestAttr("json", "{ret:true}");
			return "success";
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	/**
	 * 删除日志
	 * @return
	 */
	public String deleteLog(){
		try{
			
			return "success";
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	/**
	 * 修改日志
	 * @return
	 */
	public String getLogById(){
		try{
			
			return "success";
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	/**
	 * 修改日志
	 * @return
	 */
	public String getAllLogs(){
		try{
			
			return "success";
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	/**
	 * 修改日志
	 * @return
	 */
	public String queryLogs(){
		try{
			
			return "success";
		}catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}

	public void setLog(Log log) {
		this.log = log;
	}

	public void setLogService(LogService logService) {
		this.logService = logService;
	}
}
