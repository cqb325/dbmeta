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
			logger.error("û�д���tableId������");
			throw new RuntimeException("û�д���tableId������");
		}
		if( arg.get(DsConstant.WHERE)==null ){
			logger.error("û�д���where������");
			throw new RuntimeException("û�д���where������");
		}
		this.tableId = arg.get(DsConstant.TABLEID).toString();
		this.where = arg.get(DsConstant.WHERE).toString();
	}
	/**
	 * ȡ����
	 */
	public abstract List<Map<String,Object>> getData(String tableId, String where);
	/**
	 * ƴjson�ַ���
	 * @param res
	 * @return
	 */
	public abstract String appendJsonData(List<Map<String,Object>> res);
	/**
	 * ƴXml�ַ���
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
