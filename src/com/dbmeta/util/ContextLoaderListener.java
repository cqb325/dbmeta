package com.dbmeta.util;

import java.sql.SQLException;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

public class ContextLoaderListener implements ServletContextListener {
	private Logger logger = Logger.getLogger(ContextLoaderListener.class);
	private DBManager dbManager = null;

	public void contextDestroyed(ServletContextEvent event) {
	}

	public void contextInitialized(ServletContextEvent event) {
		dbManager = new DBManager();
		try {
			dbManager.init();
			logger.info("初始化数据字典完毕");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}