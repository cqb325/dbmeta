package com.urp.interceptor;


import org.apache.log4j.Logger;

import com.cqb.action.IActionInvocation;
import com.cqb.core.ApplicationMap;
import com.cqb.core.ContextPvd;
import com.cqb.core.Interceptor;
import com.cqb.core.InterceptorChain;
import com.urp.actions.UserAction;

public class CheckLoginInterceptor implements Interceptor {
	
	private Logger log = Logger.getLogger(CheckLoginInterceptor.class);
	@Override
	public String intercept(IActionInvocation invocation, InterceptorChain chain)
			throws Exception {
		Object action = invocation.getAction();
		String methodname = invocation.getMethodName();
		ContextPvd ctx = ApplicationMap.getContextPvd(invocation.getAction());
		System.out.println("isAjax; "+ctx.getRequest().getHeader("x-requested-with"));
		if(action instanceof UserAction && methodname.equals("login")){
			log.info("当前为登录操作!");
			return chain.intercept(invocation, chain);
		}
		
		Object user = ctx.getSessionAttr("user");
		if(user == null){
			return "logout";
		}
		
		return chain.intercept(invocation, chain);
	}
}
