<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.dbmeta.util.DBManager"%>
<%
	String tablename = request.getParameter("tablename");
	Boolean hastable = DBManager.hasTableByName("-1", tablename);
	System.out.println(hastable);
	out.print(hastable);
%>