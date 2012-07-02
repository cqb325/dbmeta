<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFWorkbook"%>
<%
	response.setContentType("application/octet-stream");
	String filename = System.currentTimeMillis()+".xls";
	response.addHeader("Content-Disposition", "attachment;filename="+filename);
	
	HSSFWorkbook wb = (HSSFWorkbook)request.getAttribute("workbook");
	
	if(wb != null){
		ServletOutputStream outp = response.getOutputStream();
		
		wb.write(outp);
		outp.flush();
		outp.close();
		
		out.clear();
		out = pageContext.pushBody();
	}
%>
