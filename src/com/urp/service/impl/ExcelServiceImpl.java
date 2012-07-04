package com.urp.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.at21.jdbc.core.JdbcTemplate;
import com.cqb.action.FormFile;
import com.cqb.excel.xlDatabase;
import com.cqb.excel.util.AReader;
import com.dbmeta.entry.Field;
import com.dbmeta.entry.Table;
import com.dbmeta.util.DBManager;
import com.ioc.annotation.AutoWired;
import com.ioc.annotation.Resposibility;
import com.urp.service.ExcelService;

import cqb.config.PropertyManager;

@Resposibility
public class ExcelServiceImpl implements ExcelService {
	
	private static String[] columnnames;
	private static String[][] values;
	private static final String EXCELNAME = "TEMP";
	private static final String EXCELFILENAME = "temp.xls";
	private static String SHEET;
	
	@AutoWired
	private JdbcTemplate jdbcTemplate;
	@Override
	public boolean savefiletemp(FormFile file, String rootpath) {
		try {
			byte[] buffer = new byte[1024];
			String temppath = PropertyManager.getOtherPeroperty("fileupload", "FILETEMP");
			File tempfile = new File(rootpath+temppath+"/"+EXCELFILENAME);
			if(!tempfile.exists()){
					tempfile.createNewFile();
			}
			FileOutputStream os = new FileOutputStream(tempfile);
			InputStream is = file.getInputStream();
			while((is.read(buffer)) > 0){
				os.write(buffer);
			}
			
			os.close();
			
			return true;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public Map<String, List<Map<String,String>>> loadExcelData(String rootpath) {
		String temppath = PropertyManager.getOtherPeroperty("fileupload", "FILETEMP");
		File tempfile = new File(rootpath+temppath);
		AReader ret = new xlDatabase(tempfile);
		String[] sheets = ret.getTables(EXCELNAME);
		if(sheets != null && sheets.length > 0){
			SHEET = sheets[0];
		}
		List<Map<String, String>> columns = new ArrayList<Map<String,String>>();
		columnnames = ret.getColumnNames(EXCELNAME, SHEET);
		for(String column : columnnames){
			Map<String, String> columnmap = new HashMap<String, String>();
			columnmap.put("id", column);
			columnmap.put("name", column);
			columnmap.put("field", column);
			columnmap.put("fieldtype", "1");
			columns.add(columnmap);
		}
		
		values = ret.getValues(EXCELNAME, SHEET);
		List<Map<String, String>> data = new ArrayList<Map<String,String>>();
		int index = 0;
		for(String[] row : values){
			Map<String, String> rowdata = new HashMap<String, String>();
			rowdata.put("id", "id_"+index);
			for(int j=0; j<row.length; j++){
				rowdata.put(columnnames[j], row[j]);
			}
			data.add(rowdata);
			index ++;
		}
		
		Map<String, List<Map<String,String>>> result = new HashMap<String, List<Map<String,String>>>();
		result.put("columns", columns);
		result.put("data", data);
		return result;
	}

	@Override
	public void deleteTemp(String rootpath) {
		
		String temppath = PropertyManager.getOtherPeroperty("fileupload", "FILETEMP");
		File tempfile = new File(rootpath+temppath+"/"+EXCELFILENAME);
		
		if(tempfile.exists()){
			tempfile.delete();
		}
	}
	
	@Override
	public boolean insertData(String tableid) {
		Table table = DBManager.getTableById(tableid);
		String tablename = table.getTablename();
		List<Field> fields = table.getFields();
		
		String[] columnnames = ExcelServiceImpl.columnnames;
		StringBuffer fieldnameb = new StringBuffer();
		StringBuffer indexesb= new StringBuffer();
		StringBuffer valuexb= new StringBuffer();
		for(Field field : fields){
			for(int i = 0; i<columnnames.length; i++){
				if(field.getFieldname().equalsIgnoreCase(columnnames[i])){
					fieldnameb.append(field.getFieldname());
					fieldnameb.append(",");
					indexesb.append(i+",");
					valuexb.append("?,");
					break;
				}
			}
		}
		String fieldnames = fieldnameb.toString();
		
		String valuex = valuexb.toString();
		if(valuex.length() > 0){
			valuex = valuex.substring(0, valuex.length() -1);
		}
		String[] indexes = indexesb.toString().split(",");
		String[][]  values = ExcelServiceImpl.values;
		List<Object[]> params = new ArrayList<Object[]>();
		
		for(String[] row : values){
			if(indexes.length < values[0].length){
				String[] rowdata = new String[indexes.length];
				for(int j=0; j<indexes.length; j++){
					int index = Integer.valueOf(indexes[j]);
					rowdata[j] = row[index];
				}
				params.add(rowdata);
			}else{
				params.add(row);
			}
		}
		
		String sql = "insert into "+tablename+" ( "+ fieldnames.substring(0, fieldnames.length()-1) +" ) values ("+valuex+")";
		
		System.out.println(sql);
		try{
			jdbcTemplate.batchUpdate(sql, params);
			
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			try {
				jdbcTemplate.getDataSource().getConnection().rollback();
			} catch (SQLException e1) {
				e1.printStackTrace();
			}
		}
		return false;
	}
	
	@Override
	public List<Table> getAllManageredTables() {
		String sql = "select * from ro_dict_table";
		List<Table> tables = new ArrayList<Table>();
		
		try {
			List<Table> gettables = jdbcTemplate.queryForBeans(sql, Table.class);
			for(int i=0; i< gettables.size(); i++){
				Table table = gettables.get(i);
				String tablename = table.getTablename();
				
				if(!issystable(tablename)){
					tables.add(table);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return tables;
	}
	
	/**
	 * 是否为系统内置表格（非业务表格）
	 * @param tablename
	 * @return
	 */
	private boolean issystable(String tablename){
		String excelexceptesuffix = PropertyManager.getOtherPeroperty("urp", "excelexceptesuffix");
		String[] esuffixes = excelexceptesuffix.split(",");
		
		boolean flag = false;
		for(String suffix : esuffixes){
			if(tablename.startsWith(suffix)){
				flag = true;
				break;
			}
		}
		
		return flag;
	}
}
