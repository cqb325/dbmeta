package com.dbmeta.util;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;

import com.at21.jdbc.core.JdbcTemplate;
import com.dbmeta.entry.CodeTable;
import com.dbmeta.entry.CodeTableData;
import com.dbmeta.entry.DBServer;
import com.dbmeta.entry.Field;
import com.dbmeta.entry.Sequence;
import com.dbmeta.entry.Table;

public class DBManager {
	
	private JdbcTemplate jdbcTemplate;
	
	private static List<Table> tables;
	
	private static List<Field> fields;
	
	private static HashMap<String,DBServer> dbservermapid = new HashMap<String, DBServer>();
	
	private static HashMap<String,Table> tablemapid = new HashMap<String, Table>();
	
	private static HashMap<String, Map<String,Table>> servermapname = new HashMap<String, Map<String,Table>>();
	
	private static HashMap<String, CodeTable> codetablemap = new HashMap<String, CodeTable>();
	
	private static HashMap<String, Sequence> seqencemap = new HashMap<String, Sequence>();
	
	private Logger logger = Logger.getLogger(DBManager.class);
	
	/**
	 * 初始化
	 * @throws SQLException 
	 */
	public void init() throws SQLException{
		logger.info("正在初始化元数据...");
		jdbcTemplate = new JdbcTemplate();
		
		getServerInfo(jdbcTemplate);
		
		getTableInfo(jdbcTemplate);
		
		getFiledInfo(jdbcTemplate);
		
		getSequenceInfo(jdbcTemplate);
		
		getCodeTableInfo(jdbcTemplate);
	}
	
	/**
	 * 获取服务信息
	 * @param jdbcTemplate
	 * @throws SQLException
	 */
	private void getServerInfo(JdbcTemplate jdbcTemplate) throws SQLException {
		logger.info("正在初始化服务信息...");
		
		String sql = "select * from ro_dict_dbserver";
		List<DBServer> dbserver = jdbcTemplate.queryForBeans(sql, DBServer.class);
		for(Iterator<DBServer> iter = dbserver.iterator(); iter.hasNext();){
			DBServer server = iter.next();
			dbservermapid.put(server.getRsid(), server);
		}
	}

	/**
	 * 获取主键信息
	 * @param jdbcTemplate2
	 * @throws SQLException 
	 */
	private void getSequenceInfo(JdbcTemplate jdbcTemplate2) throws SQLException {
		logger.info("正在初始序列信息...");
		
		String sql = "select * from ro_dict_sequence";
		List<Sequence> sequences = jdbcTemplate.queryForBeans(sql, Sequence.class);
		for(Iterator<Sequence> iter = sequences.iterator(); iter.hasNext();){
			Sequence sequence = iter.next();
			String gsid = sequence.getGsid();
			seqencemap.put(gsid, sequence);
		}
	}

	/**
	 * 获取代码表信息
	 * @param jdbcTemplate
	 * @throws SQLException 
	 */
	private void getCodeTableInfo(JdbcTemplate jdbcTemplate) throws SQLException {
		logger.info("正在初始化代码表...");
		
		String sql = "select * from ro_dict_codetable";
		List<CodeTable> codeTables = jdbcTemplate.queryForBeans(sql, CodeTable.class);
		String sql1 = "select * from ro_dict_codetabledata";
		List<CodeTableData> codeTableDatas = jdbcTemplate.queryForBeans(sql1, CodeTableData.class);
		for(Iterator<CodeTable> iter = codeTables.iterator(); iter.hasNext();){
			CodeTable codetable = iter.next();
			codetablemap.put(codetable.getCodetableid(), codetable);
			Map<String, CodeTableData> codetabledatamap = new HashMap<String, CodeTableData>();
			
			for(Iterator<CodeTableData> dataiter = codeTableDatas.iterator(); dataiter.hasNext();){
				CodeTableData codetabledata = dataiter.next();
				if(codetabledata.getCodetableid().equals(codetable.getCodetableid())){
					codetabledatamap.put(codetabledata.getCode(), codetabledata);
				}
			}
			codetable.setCodetabledatamap(codetabledatamap);
		}
	}
	
	/**
	 * 字段信息
	 * @param jdbcTemplate2
	 * @throws SQLException 
	 */
	private void getFiledInfo(JdbcTemplate jdbcTemplate2) throws SQLException {
		logger.info("正在初始化字段元数据...");
		
		String sql = "select * from ro_dict_field";
		fields = jdbcTemplate2.queryForBeans(sql, Field.class);
		String sql1 = "select tableserverid from ro_dict_field";
		List<Map<String, Object>> serverids = jdbcTemplate.queryForList(sql1);
		for(Iterator<Map<String, Object>> iter = serverids.iterator(); iter.hasNext(); ){
			Map<String, Object> map = iter.next();
			String tableserverid = (String)map.get("tableserverid");
			for(Iterator<Table> tableiter = tables.iterator(); tableiter.hasNext(); ){
				Table table = tableiter.next();
				//某一个server的表
				if(table.getTableserverid().equals(tableserverid)){
					List<Field> list4table = new ArrayList<Field>();
					Map<String, Field> fieldname_fieldmap = new HashMap<String, Field>();
					for(Iterator<Field> fielditer = fields.iterator(); fielditer.hasNext(); ){
						Field field = fielditer.next();
						//某一个server的字段
						if(table.getTablename().equals(field.getTablename())){
							list4table.add(field);
							fieldname_fieldmap.put(field.getFieldname(), field);
						}
					}
					sortFields(list4table);
					table.setFields(list4table);
					table.setFieldsmap(fieldname_fieldmap);
				}
			}
		}
	}

	/**
	 * 获取表格信息
	 * @param jdbcTemplate2
	 * @throws SQLException
	 */
	public void getTableInfo(JdbcTemplate jdbcTemplate2) throws SQLException {
		logger.info("正在初始化表格元数据...");
		
		String sql = "select tableserverid from ro_dict_table";
		String sql1 = "select * from ro_dict_table";
		
		List<Map<String, Object>> serverids = jdbcTemplate.queryForList(sql);
		tables = jdbcTemplate.queryForBeans(sql1, Table.class);
		
		for(Iterator<Map<String, Object>> iter = serverids.iterator(); iter.hasNext(); ){
			Map<String, Object> map = iter.next();
			String tableserverid = (String)map.get("tableserverid");
			
			HashMap<String, Table> namemap = new HashMap<String, Table>();
			for(Iterator<Table> tableiter = tables.iterator(); tableiter.hasNext(); ){
				Table table = tableiter.next();
				if(table.getTableserverid().equals(tableserverid)){
					tablemapid.put(table.getTableid(), table);
					namemap.put(table.getTablename(), table);
				}
			}
			servermapname.put(tableserverid, namemap);
		}
	}
	
	/**
	 * 获取表格信息
	 * @param jdbcTemplate2
	 * @throws SQLException
	 */
	public Table getTableInfoById(String tableid) throws SQLException {
		logger.info("正在获取新表格元数据...");
		
		String sql1 = "select * from ro_dict_table where tableid='"+tableid+"'";
		
		Table table = jdbcTemplate.queryForBean(sql1, Table.class);
		saveTableInfo(table);
		saveFiledInfoByTable(table);
		return table;
	}
	/**
	 * 获取字段信息
	 * @param jdbcTemplate2
	 * @throws SQLException 
	 */
	public void saveFiledInfoByTable(Table table) throws SQLException {
		if(table != null){
			String tableserverid = table.getTableserverid();
			String tablename = table.getTablename();
			String sql = "select * from ro_dict_field where tableserverid='"+tableserverid+"' and tablename='"+tablename+"'";
			
			List<Field> fields = jdbcTemplate.queryForBeans(sql, Field.class);
			
			table.setFields(fields);
			
			Map<String, Field> fieldname_fieldmap = new HashMap<String, Field>();
			for(Iterator<Field> iter = fields.iterator(); iter.hasNext();){
				Field field = iter.next();
				fieldname_fieldmap.put(field.getFieldname(), field);
			}
			table.setFieldsmap(fieldname_fieldmap);
		}
	}
	
	/**
	 * 获取表格信息
	 * @param jdbcTemplate2
	 * @throws SQLException
	 */
	public Table getTableInfoByName(String serverid, String tablename) throws SQLException {
		logger.info("正在获取新表格元数据...");
		
		String sql = "select * from ro_dict_table where tablename='"+tablename+"' and tableserverid='"+serverid+"'";
		
		Table table = jdbcTemplate.queryForBean(sql, Table.class);
		
		saveTableInfo(table);
		saveFiledInfoByTable(table);
		return table;
	}
	
	/**
	 * 保存表格信息
	 * @param table
	 */
	public void saveTableInfo(Table table){
		if(table != null){
			tablemapid.put(table.getTableid(), table);
			Map<String, Table> namemap = servermapname.get(table.getTableserverid());
			if(namemap == null){
				HashMap<String, Table> namemap1 = new HashMap<String, Table>();
				namemap1.put(table.getTablename(), table);
				servermapname.put(table.getTableserverid(), namemap1);
			}else{
				namemap.put(table.getTablename(), table);
			}
		}
	}
	
	/**
	 * 根据表id获取表名称
	 * @param serverid
	 * @param tableid
	 * @return
	 */
	public static String getTableNameById(String tableid){
		return getTableById(tableid).getTablename();
	}
	
	/**
	 * 根据表名获取表对象
	 * @param serverid
	 * @param tableid
	 * @return
	 */
	public static Table getTableByName(String serverid, String tablename){
		Table table = servermapname.get(serverid).get(tablename);
		if(table == null){
			DBManager bdm = new DBManager();
			try {
				table = bdm.getTableInfoByName(serverid, tablename);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return table;
	}
	
	/**
	 * 根据表名称获取表Id
	 * @param serverid
	 * @param tablename
	 * @return
	 */
	public static String getTableIdByName(String serverid, String tablename){
		return getTableByName(serverid, tablename).getTableid();
	}
	
	/**
	 * 根据表Id获取表对象
	 * @param serverid
	 * @param tablename
	 * @return
	 */
	public static Table getTableById(String tableid){
		Table table = tablemapid.get(tableid);
		
		if(table == null){
			DBManager bdm = new DBManager();
			try {
				table = bdm.getTableInfoById(tableid);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return table;
	}
	
	/**
	 * 根据表id获取字段列表
	 * @param serverid
	 * @param tableid
	 * @return
	 */
	public static List<Field> getFieldsByTableId(String tableid){
		return getTableById(tableid).getFields();
	}
	
	/**
	 * 根据表名称获取字段列表
	 * @param serverid
	 * @param tablename
	 * @return
	 */
	public static List<Field> getFieldsByTableName(String serverid, String tablename){
		return getTableByName(serverid, tablename).getFields();
	}
	
	/**
	 * 根据表id和字段名称获取字段
	 * @param serverid
	 * @param tableid
	 * @param fieldname
	 * @return
	 */
	public static Field getFieldByTableIdFieldName(String tableid, String fieldname){
		return getTableById(tableid).getFieldsmap().get(fieldname);
	}
	
	/**
	 * 根据表名称和字段名称获取字段
	 * @param serverid
	 * @param tablename
	 * @param fieldname
	 * @return
	 */
	public static Field getFieldByTableNameFieldName(String serverid, String tablename, String fieldname){
		return getTableByName(serverid, tablename).getFieldsmap().get(fieldname);
	}
	
	/**
	 * 根据代码表id获取代码表对象
	 * @param codetableid
	 * @return
	 */
	public static CodeTable getCodeTableById(String codetableid){
		return codetablemap.get(codetableid);
	}
	
	/**
	 * 根据代码表id获取代码表名称
	 * @param codetableid
	 * @return
	 */
	public static String getCodeTableNameById(String codetableid){
		return getCodeTableById(codetableid).getCodetabletitle();
	}
	
	/**
	 * 获取代码表列表
	 * @param codetableid
	 * @return
	 */
	public static String[] getCodeTableDatas(String codetableid){
		Map<String, CodeTableData> codetabledata = getCodeTableById(codetableid).getCodetabledatamap();
		Set<String> codes = codetabledata.keySet();
		String[] codenames = new String[codes.size()];
		Object[] arraycodes = codes.toArray();
		for(int i = 0; i< codes.size(); i++){
			codenames[i] = codetabledata.get(arraycodes[i]).getChnname();
		}
		
		return codenames;
	}
	
	/**
	 * 根据代码表id和代码值获取代码值对象
	 * @param codetableid
	 * @param code
	 * @return
	 */
	public static CodeTableData getCodeTableDataByCode(String codetableid, String code){
		return getCodeTableById(codetableid).getCodetabledatamap().get(code);
	}
	
	/**
	 * 根据代码表id和代码值获取中文值
	 * @param codetableid
	 * @param code
	 * @return
	 */
	public static String getCodeNameByCode(String codetableid, String code){
		return getCodeTableDataByCode(codetableid, code).getChnname();
	}
	
	/**
	 * 是否存在该表
	 * @param serverid
	 * @param tablename
	 * @return
	 */
	public static boolean hasTableByName(String serverid, String tablename){
		return getTableByName(serverid, tablename) != null;
	}
	
	/**
	 * 是否存在该表
	 * @param tableid
	 * @return
	 */
	public static boolean hasTableById(String tableid){
		return getTableById(tableid) != null;
	}
	
	/**
	 * 字段按照position排序
	 * @param fields 进行排序的字段
	 */
	private void sortFields(List<Field> fields){
		Collections.sort(fields, new Comparator<Field>(){
			@Override
			public int compare(Field f1, Field f2) {
				return ((Integer)f1.getFieldposition()).compareTo((Integer)f2.getFieldposition());
			}
		});
	}
	
	/**
	 * 根据序列id获取序列对象
	 * @param gsid
	 * @return
	 */
	public static Sequence getSeqById(String gsid){
		return seqencemap.get(gsid);
	}
	
	/**
	 * 获取下一个序列
	 * @param gsid
	 * @return
	 * @throws SQLException
	 */
	public static Object getNextSeq(String gsid) throws SQLException{
		SeqUtil seqUtil = new SeqUtil();
		return seqUtil.getNextSeq(gsid);
	}
	
	/**
	 * 根据服务id获取服务
	 * @param rsid
	 * @return
	 */
	public static DBServer getServerById(String rsid){
		return dbservermapid.get(rsid);
	}
	
	public static void main(String[] args) throws SQLException {
		DBManager dbManager = new DBManager();
		dbManager.init();
		
		System.out.println(DBManager.getTableNameById("1"));
		System.out.println(DBManager.getFieldsByTableId("1").size());
		System.out.println(DBManager.getCodeTableDatas("18").length);
		System.out.println(DBManager.getCodeNameByCode("18", "1"));
		System.out.println(DBManager.hasTableByName("-1", "ro_dict_codetable"));
		System.out.println(DBManager.hasTableByName("-1", "test"));
		Table table = DBManager.getTableById("1");
		List<Field> fileds = table.getFields();
		for(Field field : fileds){
			System.out.println(field.getFieldname() + " : "+field.getFieldposition());
		}
		
		CodeTable codetable = DBManager.getCodeTableById("44");
		String codetabletitle = codetable.getCodetabletitle();
		System.out.println(codetabletitle);
		Map<String,CodeTableData> map = codetable.getCodetabledatamap();
		System.out.println(map.keySet().size());
		for(Iterator<String> iter = map.keySet().iterator(); iter.hasNext();){
			String key = iter.next();
			String codename = map.get(key).getChnname();
			System.out.println(codename +" : "+ key);
		}
	}

	public static List<Table> getTables() {
		return tables;
	}

	public static List<Field> getFields() {
		return fields;
	}
}
