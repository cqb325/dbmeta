(function(cuiPackage){
	/**
	 * @class jQuery.fn.Grid
	 * @extends jQuery.fn.Object
	 * 表格
	 * @author cqb
	 * @version 2.0
	 * @demo ../example/grid/index.html
	 */
	cuiPackage.Class("Grid",cuiPackage.Object, {
		columns: null,
		data: null,
		editable: false,
		enableAddRow: false,
		enableCellNavigation: true,
		asyncEditorLoading: false,
		forceFitColumns: true,
		topPanelHeight: 25,
		dataView: null,
		pageable: null,
		checkcolumn: false,
		datasource: null,
		pageSize: 25,
		grid: null,
		options: null,
		title: null,
		gridcontainer: null,
		checkboxSelector: null,
		selectedRowIds: null,
		sortable: false,
		letterwidth: 9,
		/**
		 * 操作按钮
		 * @type {Array}
		 */
		op_bts: null,
		
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
        	this.selectedRowIds = [];
        	//加载数据
        	this._loadData();
        	this._initOptions();
        	//创建
        	this._create();
        	//初始化选择框列
        	this._initCheckBoxColumn();
        	
        	this._setSize();
        	
        	this._initGrid();
        	
        	this._listeners();
        	
        	this._run();
        	
        },
        
        _loadData: function(){
        	if(!this.datasource){
        		return false;
        	}
        	//
        	if(typeof(this.datasource) != "object"){
        		return false;
        	}
        	this.data = [];
        	if(!this.columns){
	        	this.columns = [];
	        	//每列的元数据信息
	        	var metas = this.datasource.meta.fieldMetas;
	        	for(var i in metas){
	        		var fieldmeta = metas[i];
					if(fieldmeta.getshowable() == 0){
						continue;
					}
	        		var column = {};
	        		column.id = fieldmeta.getfieldid();
	        		column.name = fieldmeta.getfieldchnname();
	        		column.field = fieldmeta.getfieldname();
	        		column.fieldtype = fieldmeta.getfieldtype();
					column.editable = fieldmeta.getfieldeditable() == 0 ? false : true;
	        		if(fieldmeta.getcodetable()){
	        			//判断是否存在代码表
	        			var flag = false;
	        			for(var k in fieldmeta.getcodetable().codes){
	        				flag = true;
	        				break;
	        			}
	        			if(flag){
	        				column.formatcode = fieldmeta.getcodetable().codes;
	        			}
	        		}
	        		column.width = this.getcolumnwidth(column.name);
	        		column.minWidth = column.width - 1;
	
	        		this.columns.push(column);
	        	}
	        }
        	//data
        	var records = this.datasource.records;
        	for(var i in records){
        		var record = records[i];
        		var data = {};
        		data.id = "id_"+i;
        		for(var j in record.fields){
        			var field = record.fields[j];
	        		data[field.getFieldName()] = field.getFieldValue();
        		}
        		//如果有操作按钮添加按钮列
        		if(this.op_bts){
        			for(var i in this.op_bts){
        				var op_bt = this.op_bts[i];
        				data[op_bt.id] = op_bt.data;
        			}
        		}
        		this.data.push(data);
        	}
        },
        
        getcolumnwidth: function(name){
        	var array = name.split(/[^\u4e00-\u9fa5]/g);
        	var length = name.length;
        	var width = 0;
        	for(var i in array){
        		width += array[i].length * this.letterwidth * 2;
        		length -= array[i].length;
        	}
        	width += length *  this.letterwidth;
        	return width;
        },
        
        _create: function(){
        	$(this.target).addClass("cui-grid-wrapper");
        	this.gridcontainer = $("<div>").addClass("cui-grid");
        	var header = $("<div>").addClass("cui-grid-header");
        	header.append("<label>"+this.title+"</label>");
        	var searchicon = $('<span style="float:right" class="ui-icon ui-icon-search cui-grid-icon" title="Toggle search panel"></span>');
        	header.append(searchicon);
        	
        	var pageobj = $('<div>').addClass("cui-grid-page");
        	
        	$(this.target).append(header);
        	$(this.target).append(this.gridcontainer);
        	$(this.target).append(pageobj);
        },
        
        _initOptions: function(){
        	//参数
        	this.options = {
        		editable: this.editable,
				enableAddRow: this.enableAddRow,
				enableCellNavigation: this.enableCellNavigation,
				asyncEditorLoading: this.asyncEditorLoading,
				forceFitColumns: this.forceFitColumns,
	            topPanelHeight: this.topPanelHeight
        	};
        	
        	for(var i in this.columns){
       			this.columns[i].sortable = this.sortable;
       			var columneditable = this.columns[i].editable == undefined ? true : this.columns[i].editable;
       			this.columns[i].editable = columneditable;
       			if(this.editable && columneditable){
	        		switch(this.columns[i].fieldtype){
	        			case 1:
	        			case 2:{
	        				this.columns[i].editor = TextCellEditor;
	        				break;
	        			}
	        			case 3:
	        			case 4:{
	        				this.columns[i].editor = DateCellEditor;
	        				break;
	        			}
	        			case 5:{
	        				this.columns[i].cssClass = "cell-effort-driven";
	        				this.columns[i].formatter = BoolCellFormatter;
	        				this.columns[i].editor = YesNoCheckboxCellEditor;
	        				break;
	        			}
	        			case 6:{
	        				this.columns[i].formatter = GraphicalPercentCompleteCellFormatter;
	        				this.columns[i].editor = PercentCompleteCellEditor;
	        				break;
	        			}
	        			case 7:{
	        				this.columns[i].editor = LongTextCellEditor;
	        				break;
	        			}
	        			default:{
	        				this.columns[i].editor = TextCellEditor;
	        			}
	        		}//end switch
	        		//代码表
	        		if(this.columns[i].formatcode){
	        			this.columns[i].formatter = codeFormatter;
	        			this.columns[i].editor = codeEditor;
	        			this.columns[i].cssClass = "cell-code-effort";
	        		}
	        	}//end if
        	}// end for
        	//如果有操作按钮添加按钮列
       		if(this.op_bts){
       			for(var i in this.op_bts){
       				var op_bt = this.op_bts[i];
       				var column = {
       					id: op_bt.id,
       					name: op_bt.name,
       					field: op_bt.id,
       					editable: false,
       					showable: true
       				};
       				this.columns.push(column);
       			}
       		}
        },
        
        _initCheckBoxColumn: function(){
        	//如果需要选择框列添加选择框列
        	this.checkboxSelector = null;
        	if(this.checkcolumn){
        		var columns = [];
        		this.checkboxSelector = new Slick.CheckboxSelectColumn({
		            cssClass: "slick-cell-checkboxsel"
		        });
		        columns.push(this.checkboxSelector.getColumnDefinition());
		        this.columns = columns.concat(this.columns);
        	}
        },
        
        _initGrid: function(){
        	//数据视图并设置每页的记录数
        	this.dataView = new Slick.Data.DataView();
        	//如果需要分页
        	if(this.pageable){
				this.dataView.setPagingOptions({pageSize: this.pageSize});
			}
			
			//初始化表格并设置选择模式
			this.grid = new Slick.Grid(this.gridcontainer, this.dataView, this.columns, this.options);
			this.grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
			
			//如果需要选择框列注册选择框列
			if(this.checkcolumn && this.checkboxSelector){
        		this.grid.registerPlugin(this.checkboxSelector);
        	}
        	
        	//如果需要分页
        	if(this.pageable){
	        	var pager = new Slick.Controls.Pager(this.dataView, this.grid, $(".cui-grid-page", this.target));
				var columnpicker = new Slick.Controls.ColumnPicker(this.columns, this.grid, this.options);
			}
        },
        
        _listeners: function(){
        	// wire up model events to drive the grid
        	var self = this;
			this.dataView.onRowCountChanged.subscribe(function(e,args) {
				self.grid.updateRowCount();
                self.grid.render();
			});

			this.dataView.onRowsChanged.subscribe(function(e,args) {
				self.grid.invalidateRows(args.rows);
				self.grid.render();
			});
			
			this.grid.onSort.subscribe(function(e, args) {
				sortcol = args.sortCol.field;
                self.dataView.sort(function(a,b){
                	var x = a[sortcol], y = b[sortcol];
                	if(isNaN(x)){
                		return x.localeCompare(y);
                	}else{
						return (x == y ? 0 : (x > y ? 1 : -1));
					}
                }, args.sortAsc);
            });
            
            this.grid.onSelectedRowsChanged.subscribe(function(e) {
                self.selectedRowIds = [];
                var rows = self.grid.getSelectedRows();
                for (var i = 0, l = rows.length; i < l; i++) {
                    var item = self.dataView.getItem(rows[i]);
                    if (item){
                    	self.selectedRowIds.push(item.id);
                    }
                }
            });
            
        },
        
        _run: function(){
        	this.dataView.beginUpdate();
			this.dataView.setItems(this.data);
			this.dataView.endUpdate();
        },
        
        _setSize: function(){
        	var allh = $(this.target).height();
        	var titleh = $(".cui-grid-header", this.target).outerHeight();
        	var pageh = $(".cui-grid-page", this.target).outerHeight();
        	var borderh = this._getBorderH(this.gridcontainer);
        	this.gridcontainer.height(allh - titleh - pageh - borderh);
        },
        
        /**
         * @private
         * @description 获取边高度
         */
        _getBorderH: function(obj){
        	return parseFloat(obj.css("border-top-width")) + parseFloat(obj.css("border-bottom-width"));
        },
        
        getColumnById: function(id){
        	var index = this.grid.getColumnIndex(id);
        	return this.columns[index];
        }
	});
})(jQuery.fn);