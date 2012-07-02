(function(cuiPackage){
	/**
	 * @class jQuery.fn.Tree
	 * @extends jQuery.fn.Object
	 * 树
	 * @author cqb
	 * @version 2.0
	 * @demo ../example/tree/index.html
	 */
	cuiPackage.Class("Tree",cuiPackage.Object, {
		/**
         * 树根的id
         * @type {String}
         */
    	treeid: null,
		/**
         * 树的宽度
         * @type {Number}
         */
    	treewidth: null,
		/**
         * 树的高度
         * @type {Number}
         */
    	treeheight: null,
    	
    	rightclicked: function(id, item, event){},
    	clicked: function(id, item, event){},
    	checked: function(id, item, event){},
    	opened: function(id, item, event){},
    	dbclicked: function(id, item, event){},
		/**
         * @private
         * @description 设置参数信息
         * @param {options} 参数
         */
        _initialize : function(options){
        	cuiPackage.Object.prototype._initialize.apply(this,arguments);
        	
        	//渲染
        	this._render();
        },
        
        _render: function(){
        	var tree = new dhtmlXTreeObject(this.target, this.treewidth, this.treeheight, this.treeid);
        	$.extend(this, tree);
        	
        	var self = this;
        	if(this.rightclicked){
        		this.setOnRightClickHandler(function(id, event){
        			self.rightclicked(id, self.getNodeById(id), event);
        		});
        	}
        	if(this.clicked){
        		this.setOnClickHandler(function(id, event){
        			self.clicked(id, self.getNodeById(id), event);
        		});
        	}
        	if(this.checked){
        		this.setOnCheckHandler(function(id, state){
        			self.checked(id, self.getNodeById(id), state);
        		});
        	}
        	if(this.opened){
        		this.setOnOpenHandler(function(id, state){
        			self.opened(id, self.getNodeById(id), state);
        			return true;
        		});
        	}
        	if(this.dbclicked){
        		tree.setOnDblClickHandler(function(id, that){
        			self.dbclicked(id, self.getNodeById(id), that);
        		});
        	}
        },
        
        /**
         * @description 根据id获取树节点
         * @param {String} id 节点id
         * @return {Object} 节点对象
         */
        getNodeById: function(id){
        	return this._globalIdStorageFind(id);
        },
        
        /**
         * @description 显示树
         */
        show: function(){
        	$(this.target).show();
        },
        
        /**
         * @description 隐藏树
         */
        hide: function(){
        	$(this.target).hide();
        },
        
        /**
         * @description销毁树
         */
        destroy: function(){
        	//先调用树的销毁函数
        	this.destructor();
        	cuiPackage.Object.prototype.destroy.apply(this,arguments);
        }
	});
})(jQuery.fn);