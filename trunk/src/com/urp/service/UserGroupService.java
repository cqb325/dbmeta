package com.urp.service;

import java.util.List;

import com.urp.entry.UserGroup;



public interface UserGroupService {
	
	/**
	 * 根据父节点获取树
	 * @param parentid
	 * @return
	 */
	public List<UserGroup> getGroupByParentId(String parentid);
	
	/**
	 * 根据父节点id获取孩子节点的xml
	 * @param parentid
	 * @return
	 */
	public String getChildrenXML(String parentid);
	
	/**
	 * 获取用户组
	 * @param ugid
	 * @return
	 */
	public UserGroup getUserGroup(String ugid);
}
