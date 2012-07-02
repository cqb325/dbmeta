package com.urp.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.cqb.action.FormFile;
import com.cqb.excel.xlDatabase;
import com.cqb.excel.util.AReader;
import com.ioc.annotation.Resposibility;
import com.urp.service.ExcelService;

import cqb.config.PropertyManager;

@Resposibility
public class ExcelServiceImpl implements ExcelService {
	
	private static AReader ret;
	@Override
	public boolean savefiletemp(FormFile file, String rootpath) {
		try {
			byte[] buffer = new byte[1024];
			String temppath = PropertyManager.getOtherPeroperty("fileupload", "FILETEMP");
			File tempfile = new File(rootpath+temppath+"/temp.xls");
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
		ret = new xlDatabase(tempfile);
		
		List<Map<String, String>> columns = new ArrayList<Map<String,String>>();
		String[] columnnames = ret.getColumnNames("TEMP", "SHEET1");
		for(String column : columnnames){
			Map<String, String> columnmap = new HashMap<String, String>();
			columnmap.put("id", column);
			columnmap.put("name", column);
			columnmap.put("field", column);
			columnmap.put("fieldtype", "1");
			columns.add(columnmap);
		}
		
		String[][] values = ret.getValues("TEMP", "SHEET1");
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
		File tempfile = new File(rootpath+temppath+"/temp.xls");
		
		if(tempfile.exists()){
			tempfile.delete();
		}
	}
}
