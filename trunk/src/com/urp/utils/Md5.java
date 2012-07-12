package com.urp.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.commons.codec.binary.Hex;

public class Md5 {
	public static String encode(String str){
		byte[] digest = null;
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
			digest = messageDigest.digest(str.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			throw new IllegalStateException("UTF-8 not supported!");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		
		return new String(Hex.encodeHex(digest)).toUpperCase();
	}
}
