package com.urp.service;

import java.util.List;

import com.urp.entry.Function;

public interface RightService {
	
	/**
	 * 获取功能权限设计XML
	 * @param ugid
	 * @return
	 */
	public String getAllFunRightDesinerByUserGroup(String ugid);
	
	/**
	 * 获取功能树
	 * @param ugid
	 * @return
	 */
	public String getAllFunRightTreeByUserGroup(String ugid);
	
	/**
	 * 获取资源树
	 * @param restype
	 * @param ugid
	 * @return
	 */
	public String getAllResRightTreeByUserGroup(int restype, String ugid);
	
	/**
	 * 获取子功能xml
	 * @param ugid
	 * @param parentid
	 * @return
	 */
	public String getChildrenFunRightsXML(String ugid, String parentid);
	/**
	 * 获取子资源xml
	 * @param restype
	 * @param ugid
	 * @param parentid
	 * @return
	 */
	public String getChildrenResRightsXML(int restype, String ugid, String parentid);
	
	/**
	 * 获取所有的子功能
	 * @param restype
	 * @param ugid
	 * @param parentid
	 * @return
	 */
	public List<Function> getChildrenFunRights(int restype, String ugid, String parentid);
	
	/**
	 * 获取权限设计XML
	 * @param restype
	 * @param ugid
	 * @return
	 */
	public String getAllResRightDesinerByUserGroup(int restype, String ugid);
}
