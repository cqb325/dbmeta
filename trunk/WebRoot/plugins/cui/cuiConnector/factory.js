(function(cuiPackage){
	/**
	 * @class jQuery.fn.cui.CUIConnectorFactory
	 * 客户端数据集工厂类
	 * 用来创建数据实例，并保存所有数据集的句柄
	 * @author cqb
	 * @version 1.0
	 */
	cuiPackage.Class("cui.CUIConnectorFactory",{
		/**
         * 数据集句柄
         * @type {Array}
         */
		dataSets: null,
		/**
		 * @private
		 * @description 初始化
		 * @param {Object} options 参数
		 */
		_initialize : function(options){
			$.extend(this, options);
		},
		
		/**
		 * @description 获得数据集实例
		 * @param {Object} options 参数
		 */
		getInstance: function(options){
			if(typeof options != 'object'){
				alert("getInstance方法的参数必须为js对象");
				return null;
			}else{
				var dataSet = new $.fn.ClientDataSet(options);
				if(this.dataSets == null){
					this.dataSets = [];
					this.dataSets.push(dataSet);
				}else{
					this.dataSets.push(dataSet);
				}
				return dataSet;
			}	
		}
	});
})(jQuery.fn);