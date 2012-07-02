package com.urp.service;

import com.urp.entry.Desiner;

public interface DesinerService {
	
	/**
	 * 获取设计对象
	 * @param resid
	 * @param restype
	 * @return
	 */
	public Desiner getDesiner(String resid, int restype);
}
