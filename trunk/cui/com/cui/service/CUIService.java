package com.cui.service;

import java.util.Map;

public interface CUIService {
	/**
	 * 执行
	 * @param paramsMap 页面参数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String excecute(Map paramsMap);
}
