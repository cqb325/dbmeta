package com.cds.service;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.cds.constant.DsConstant;
import com.cds.service.impl.TableDataServiceImpl;

public abstract class AbstractDataService implements DataService {
	
	private Logger logger = Logger.getLogger(AbstractDataService.class);
	
	protected String tableId ;
	
	protected String where ;
	
	public AbstractDataService(Map arg){
		if( arg.get(DsConstant.TABLEID)==null ){
			logger.error("没有传递tableId参数！");
			throw new RuntimeException("没有传递tableId参数！");
		}
		if( arg.get(DsConstant.WHERE)==null ){
			logger.error("没有传递where参数！");
			throw new RuntimeException("没有传递where参数！");
		}
		this.tableId = arg.get(DsConstant.TABLEID).toString();
		this.where = arg.get(DsConstant.WHERE).toString();
	}
	/**
	 * 取数据
	 */
	public abstract List<Map<String,Object>> getData(String tableId, String where);
	/**
	 * 拼json字符串
	 * @param res
	 * @return
	 */
	public abstract String appendJsonData(List<Map<String,Object>> res);
	/**
	 * 拼Xml字符串
	 * @param res
	 * @return
	 */
	public abstract String appendXmlData(List<Map<String,Object>> res);
	@Override
	public String getJsonData() {
		return null;
	}
	@Override
	public String getXmlData() {
		return null;
	}

}
