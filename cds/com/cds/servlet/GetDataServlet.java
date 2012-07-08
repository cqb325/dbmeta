package com.cds.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.cds.constant.DsConstant;
import com.cds.service.DataService;
import com.cds.service.impl.TableDataServiceImpl;

public class GetDataServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		Map paraMap = request.getParameterMap();
		Map myMap = new HashMap();
		Iterator iter = paraMap.entrySet().iterator();
		while (iter.hasNext()) {
			Map.Entry entry = (Map.Entry) iter.next();
			String key = entry.getKey().toString();
			Object obj = entry.getValue();
			String val = "";
			if (obj instanceof String[]) {
				String[] strs = (String[]) obj;
				val = strs[0];
			} else {
				val = obj.toString();
			}
			System.out.println("key=" + key + ",value=" + val);
			myMap.put(key, val);
		}
		if( myMap.get(DsConstant.PROTOCAL) == null ){
			throw new RuntimeException("没有传递protocal参数！");
		}
		String protocal = (myMap.get(DsConstant.PROTOCAL)).toString();
		if(protocal.equals(DsConstant.PROTOCAL_TABLE)){
			DataService ds = new TableDataServiceImpl(myMap);
			//String res = ds.getJsonData();
			String res = ds.getXmlData();
		}
		
		
		
		out
				.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		out.println("<HTML>");
		out.println("  <HEAD><TITLE>A Servlet</TITLE></HEAD>");
		out.println("  <BODY>");
		out.print("    This is ");
		out.print(this.getClass());
		out.println(", using the GET method");
		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out
				.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		out.println("<HTML>");
		out.println("  <HEAD><TITLE>A Servlet</TITLE></HEAD>");
		out.println("  <BODY>");
		out.print("    This is ");
		out.print(this.getClass());
		out.println(", using the POST method");
		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();
	}

}
