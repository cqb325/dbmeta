package com.cui.action;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;

import com.cui.service.CUIService;
import com.cui.util.CUIServiceFactory;
import com.cui.util.Constaint;

@SuppressWarnings("serial")
public class CUIConnectorAction extends HttpServlet{
	private CUIService cuiService;
	private Logger logger = Logger.getLogger(CUIConnectorAction.class);
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		Map<String, String> paramsMap = getParamMap(req);
		c_action = req.getParameter(Constaint.PARAM_ACTION);
		cuiService = CUIServiceFactory.getInstance(c_action);
		
		String result = cuiService.excecute(paramsMap);
		
		logger.info(result);
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().write(result);
	}
	
	private String c_action;
	
	private Map<String, String> getParamMap(HttpServletRequest req){
		try {
			req.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		Map<String, String> result = new HashMap<String, String>();
		Map paramsMap = req.getParameterMap();
	    Set keSet= paramsMap.entrySet();
	    for(Iterator itr=keSet.iterator();itr.hasNext();){
	        Map.Entry me=(Map.Entry)itr.next();
	        Object key=me.getKey();
	        Object ov=me.getValue();
	        String[] value=new String[1];
	        if(ov instanceof String[]){
	            value=(String[])ov;
	        }else{
	            value[0]=ov.toString();
	        }
	        for(int k=0;k<value.length;k++){
	        	String v=null;
				try {
					v = URLDecoder.decode(value[k], "UTF-8");
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
	            result.put(key.toString(), v);
	        }
	    }
	    return result;
	}
}
