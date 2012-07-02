package com.cui.util;

import com.cui.service.CUIService;
import com.cui.service.impl.ExecuteDataService;
import com.cui.service.impl.MetaDataService;
import com.cui.service.impl.RecordDataService;

public class CUIServiceFactory {
	
	public static CUIService getInstance(String caction){
		if(caction.equals(Constaint.CUI_ACTION_META)){
			return new MetaDataService();
		}else if(caction.equals(Constaint.CUI_ACTION_RECORD)){
			return new RecordDataService();
		}else if(caction.equals(Constaint.CUI_ACTION_EXECUTE)){
			return new ExecuteDataService();
		}else{
			return null;
		}
	}
}
