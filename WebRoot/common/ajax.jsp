<%@ page import="java.io.PrintWriter" %>
<%
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		response.setHeader("Pragma","No-cache"); 
		response.setHeader("Cache-Control","no-cache"); 
		response.setDateHeader("Expires", 0); 
		
		try {
			Object object = request.getAttribute("json");
			if (object != null){
				PrintWriter pw = response.getWriter();
				pw.print(object);
				pw.flush();
				pw.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
%>