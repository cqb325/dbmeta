(function(cuiPackage){
	/**
	 * @class jQuery.fn.FieldMeta
	 * 字段元数据类
	 * 用来存储某个字段的元数据信息
	 * @author cqb
	 * @version 1.0
	 */
	cuiPackage.Class("cui.FieldMeta",{
		/**
         * 字段ID
         * @type {String}
         */
		fieldid: null,
		/**
         * 字段名称
         * @type {String}
         */
		fieldname: null,
		/**
         * 字段中文名
         * @type {String}
         */
		fieldchnname: null,
		/**
         * 字段类型
         * @type {Number}
         */
		fieldtype: null,
		/**
         * 字段长度
         * @type {Number}
         */
		fieldsize: null,
		/**
         * 字段精度
         * @type {Number}
         */
		fieldscale: null,
		/**
         * 字段是否必须的
         * @type {Boolean}
         */
		fieldrequired: null,
		/**
         * 字段是否为主键
         * @type {Boolean}
         */
		fieldiskey: null,
		/**
         * 字段代码表值
         * @type {String}
         */
		codetableid: null,
		/**
         * 字段序列id
         * @type {String}
         */
		fieldseqid: null,
		/**
         * 字段排序序号
         * @type {Number}
         */
		fieldposition: null,
		/**
         * 字段类型（email等）
         * @type {String}
         */		
		fieldrule: null,
		/**
         * 字段所在表格名称
         * @type {String}
         */
		tablename: null,
		/**
         * 字段字段所在的服务id
         * @type {String}
         */
		tableserverid: null,
		/**
         * 字段创建版本id
         * @type {String}
         */
		fieldcreateverid: null,
		/**
         * 字段原数据数据类型
         * @type {String}
         */
		fielddbtype: null,
		/**
         * 字段默认值
         * @type {String}
         */
		fielddefaultvalue: null,
		/**
         * 字段格式化
         * @type {String}
         */
		fieldformat: null,
		/**
         * 
         * @type {String}
         */
		fieldmemo: null,
		/**
         * 
         * @type {String}
         */
		multicodetable: null,
		/**
         * 代码表对象
         * @type {Object}
         */
		codetable: null,
		/**
         * 是否可编辑
         * @type {Boolean}
         */
		fieldeditable: null,
		/**
         * 是否可以显示
         * @type {Boolean}
         */
		showable: null,
		
		_initialize : function(){},
		
		
		getfieldid: function() {
			return this.fieldid;
		},
		setfieldid: function(fieldId) {
			this.fieldid = fieldId;
		},
		getfieldname: function() {
			return this.fieldname;
		},
		setfieldname: function(fieldName) {
			this.fieldname = fieldName;
		},
		getfieldchnname: function() {
			return this.fieldchnname;
		},
		setfieldchnname: function(fieldChnname) {
			this.fieldchnname = fieldChnname;
		},
		getfieldtype: function() {
			return this.fieldtype;
		},
		setfieldtype: function(fieldType) {
			this.fieldtype = fieldType;
		},
		getfieldsize: function() {
			return this.fieldsize;
		},
		setfieldsize: function(fieldSize) {
			this.fieldsize = fieldSize;
		},
		getfieldscale: function() {
			return this.fieldscale;
		},
		setfieldscale: function(fieldScale) {
			this.fieldscale = fieldScale;
		},
		getfieldrequired: function() {
			return this.fieldrequired;
		},
		setfieldrequired: function(fieldReqired) {
			this.fieldrequired = fieldReqired;
		},
		getfieldiskey: function() {
			return this.fieldiskey;
		},
		setfieldiskey: function(fieldIskey) {
			this.fieldiskey = fieldIskey;
		},
		getcodetableid: function() {
			return this.codetableid;
		},
		setcodetableid: function(codeTableId) {
			this.codetableid = codeTableId;
		},
		getfieldseqid: function() {
			return this.fieldseqid;
		},
		setfieldseqid: function(fieldSeqId) {
			this.fieldseqid = fieldSeqId;
		},
		getfieldposition: function() {
			return this.fieldposition;
		},
		setfieldposition: function(fieldPosition) {
			this.fieldposition = fieldPosition;
		},
		getfieldrule: function() {
			return this.fieldrule;
		},
		setfieldrule: function(fieldRule) {
			this.fieldrule = fieldRule;
		},
		gettablename: function() {
			return this.tablename;
		},
		settablename: function(tableName) {
			this.tablename = tableName;
		},
		gettableserverid: function() {
			return this.tableserverid;
		},
		settableserverid: function(tableServerId) {
			this.tableserverid = tableServerId;
		},
		getfieldcreateverid: function() {
			return this.fieldcreateverid;
		},
		setfieldcreateverid: function(fieldCreateVerId) {
			this.fieldcreateverid = fieldCreateVerId;
		},
		getfielddbtype: function() {
			return this.fielddbtype;
		},
		setfielddbtype: function(fieldDBType) {
			this.fielddbtype = fieldDBType;
		},
		getfielddefaultvalue: function() {
			return this.fielddefaultvalue;
		},
		setfielddefaultvalue: function(fieldDefaultValue) {
			this.fielddefaultvalue = fieldDefaultValue;
		},
		getfieldformat: function() {
			return this.fieldformat;
		},
		setfieldformat: function(fieldformat) {
			this.fieldformat = fieldformat;
		},
		getmulticodetable: function(){
			return this.multicodetable;
		},
		setmulticodetable: function(multicodetable){
			this.multicodetable = multicodetable;
		},
		getfieldmemo: function(){
			return this.fieldmemo;
		},
		setfieldmemo: function(fieldmemo){
			this.fieldmemo = fieldmemo;
		},
		getcodetable: function(){
			return this.codetable;
		},
		setcodetable: function(codetable){
			this.codetable = codetable;
		},
		getfieldeditable: function(){
			return this.fieldeditable;
		},
		setfieldeditable: function(fieldeditable){
			this.fieldeditable = fieldeditable;
		},
		getshowable: function(){
			return this.showable;
		},
		setshowable: function(showable){
			this.showable = showable;
		}
	});
})(jQuery.fn);