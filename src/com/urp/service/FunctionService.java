package com.urp.service;

import java.util.List;

import com.urp.entry.Function;


public interface FunctionService {
	
	/**
	 * 根据父节点id获取所有的孩子
	 * @param parentid
	 * @return
	 */
	public List<Function> getChildren(String parentid, int isgroup);
	/**
	 * 根据父节点id获取xml
	 * @param parentid
	 * @return
	 */
	public String getChildrenXML(String parentid, int isgroup);
	
	/**
	 * 根据父节点id获取所有的孩子
	 * @param parentid
	 * @return
	 */
	public List<Function> getChildren(String parentid);
	/**
	 * 根据父节点id获取xml
	 * @param parentid
	 * @return
	 */
	public String getChildrenXML(String parentid);
	
	/**
	 * 根据功能列表和父节点id创建xml
	 * @param parentid
	 * @param list
	 * @return
	 */
	public String getChildrenXMLByList(String parentid, List<Function> list);
}
