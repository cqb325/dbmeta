(function(cuiPackage){
	/**
	 * @class jQuery.fn.cui.DataReader
	 * 数据读取器
	 * @author cqb
	 * @version 1.0
	 */
	cuiPackage.Class("cui.DataReader",{
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize : function(){},
		
		/**
		 * @description 读取字段元数据信息
		 * @param {Object} obj 元数据源
		 */
		readFieldMeta: function(obj){
			return null;	
		},
		
		/**
		 * @description 读取数据信息
		 * @param {Object} obj 数据源
		 */
		readData: function(obj){
			return null;
		}
	});
})(jQuery.fn);