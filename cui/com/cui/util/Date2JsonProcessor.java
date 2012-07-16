package com.cui.util;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class Date2JsonProcessor implements JsonValueProcessor {
	private DateFormat df;
	private DateFormat timedf;
	
	public Date2JsonProcessor(){
		timedf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		df = new SimpleDateFormat("yyyy-MM-dd");
	}
	
	public Date2JsonProcessor(String format){
		df = new SimpleDateFormat(format);
	}
	
	@Override
	public Object processArrayValue(Object value, JsonConfig jsonConfig) {
		return process(value);
	}

	@Override
	public Object processObjectValue(String key, Object value,
			JsonConfig jsonConfig) {
		return process(value);
	}

	private Object process(Object value) {
		if (value == null) {
			return "";
		}
		if(value instanceof Timestamp)
            return timedf.format((Timestamp) value);
        else if(value instanceof Date)  
            return df.format((Date) value);
        else  
            return value.toString(); 
	}
}
