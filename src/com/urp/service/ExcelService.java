package com.urp.service;

import java.util.List;
import java.util.Map;

import com.cqb.action.FormFile;

public interface ExcelService {
	
	/**
	 * 保存文件temp
	 * @param file
	 * @param rootpath
	 * @return
	 */
	public boolean savefiletemp(FormFile file, String rootpath);
	
	/**
	 * 加载excel数据
	 * @return
	 */
	public Map<String, List<Map<String,String>>> loadExcelData(String rootpath);
	
	/**
	 * 删除临时文件
	 * @param rootpath
	 */
	public void deleteTemp(String rootpath);
	
	/**
	 * 批量导入数据
	 * @param tableid
	 * @return
	 */
	public boolean insertData(String tableid);
}
