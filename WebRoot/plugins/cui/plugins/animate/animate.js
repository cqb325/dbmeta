(function(cuiPackage){
	/**
	 * @class jQuery.Animate
	 * 特效管理
	 * @singleton
	 * @author cqb
	 * @version 1.0
	 */
	cuiPackage.Animate = {
		/**
		 * @description 添加特效
		 * param {Object} module 组件模块
		 * param {String} animatetype 特效类型
		 * param {Object} set 特效集合
		 */
		add: function(module, animatetype, set) {
			var proto = module.prototype;
			for(var i in set) {
				proto.animations[i] = proto.animations[i] || [];
				proto.animations[i].push([animatetype, set[i]]);
			}
		},
		/**
		 * @description 执行特效
		 * param {Object} instance 执行特效的对象
		 * param {String} name 特效名称
		 * param {Object} args 参数
		 */
		call: function(instance, name, args) {
			var set = instance.animations[name];
			if(!set) { return; }
		
			for (var i = 0; i < set.length; i++) {
				if (instance[set[i][0]]) {
					set[i][1].apply(instance, args);
				}
			}
		},
	   /**
        * 类名
        * @type {String}
        */
        CLASS_NAME: "jQuery.fn.Animate"	
	};
})(jQuery.fn);