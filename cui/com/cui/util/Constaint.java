package com.cui.util;

public class Constaint {
	
	public final static String PARAM_TABLEID = "c_tableid";
	public final static String PARAM_ACTION = "c_action";
	public final static String PARAM_DATATYPE = "c_datatype";
	public final static String PARAM_PAGESIZE = "c_pageSize";
	public final static String PARAM_PAGENUM = "c_pagenum";
	public final static String PARAM_XML = "c_xml";
	
	public final static String CUI_ACTION_META = "meta";
	public final static String CUI_ACTION_RECORD = "record";
	public final static String CUI_ACTION_EXECUTE = "execute";
	
	public final static String CUI_DATATYPE_XML = "xml";
	public final static String CUI_DATATYPE_JSON = "json";
	
	public final static String CUI_EXECUTE_XMLATTRIBUTE_OPTYPE = "optype";
	public final static String CUI_EXECUTE_OPTYPE_INSERT = "insert";
	public final static String CUI_EXECUTE_OPTYPE_UPDATE = "update";
	public final static String CUI_EXECUTE_OPTYPE_DELETE = "delete";
	
	//�ַ���
	public final static int CUI_DATATYPE_STRING = 1;
	//����
	public final static int CUI_DATATYPE_NUMBER = 2;
	//����
	public final static int CUI_DATATYPE_DATE = 3;
	//����ʱ��
	public final static int CUI_DATATYPE_DATETIME = 4;
	//����ֵ
	public final static int CUI_DATATYPE_BOOLEAN = 5;
	//�ٷֱ�
	public final static int CUI_DATATYPE_Percent = 6;
	//���ֶ�
	public final static int CUI_DATATYPE_Text = 7;
	
	public enum OPERATER{
		EQUIRE("="),NOTEQUIRE("<>"),GT(">"),LT("<"),GTEQUIRE(">="),LTEQUIRE("<="),BETWEEN("between arg1 and arg2"),LIKE("like");
		
		private String op;
		private OPERATER(String op){
			this.op = op;
		}
		
		public String getOp(){
			return this.op;
		}
	}
}
