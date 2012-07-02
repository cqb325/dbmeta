package com.dbmeta.util;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.at21.jdbc.core.JdbcTemplate;
import com.dbmeta.entry.Sequence;

public class SeqUtil {
	//
	private JdbcTemplate jdbcTemplate;
	
	/**
	 * ���캯��
	 */
	public SeqUtil(){
		jdbcTemplate = new JdbcTemplate();
	}
	
	/**
	 * ��ȡ��һ������
	 * @param gsid
	 * @return
	 * @throws SQLException
	 */
	public synchronized Object getNextSeq(String gsid) throws SQLException{
		Sequence old = getSquence(gsid);
		int seqtype = old.getGsseqdatatype();
		switch(seqtype){
			case 1:{// GUID
				return UUID.randomUUID().toString();
			}
			case 2:{// ����
				int position = old.getGsposition() + 1;
				old.setGsposition(position);
				updateSquence(old);
				return position;
			}
		}
		
		return null;
	}
	
	/**
	 * ��ȡ��ǰ���ж���
	 * @param gsid ����id
	 * @return
	 * @throws SQLException
	 */
	private Sequence getSquence(String gsid) throws SQLException{
		String sql = "select * from ro_dict_sequence where gsid=?";
		List<Object> params = new ArrayList<Object>();
		params.add(gsid);
		Sequence seq = jdbcTemplate.queryForBean(sql, params, Sequence.class);
		return seq;
	}
	
	/**
	 * ��������
	 * @param seq
	 * @throws SQLException
	 */
	private void updateSquence(Sequence seq) throws SQLException{
		String sql = "update ro_dict_sequence set gsposition=?,gstitle=?,gsseqdatatype=? where gsid=?";
		List<Object> params = new ArrayList<Object>();
		params.add(seq.getGsposition());
		params.add(seq.getGstitle());
		params.add(seq.getGsseqdatatype());
		params.add(seq.getGsid());
		jdbcTemplate.execute(sql, params.toArray());
	}
}
