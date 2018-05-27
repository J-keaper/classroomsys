package com.keaper.classroom.common.utils;

import org.apache.commons.codec.digest.DigestUtils;

public class EncryptUtil {

    /**
     * salt = sha512(account+password)
     * sha512(sha512(password)+salt)
     * @param account
     * @param password
     * @return
     */
    public static String EncryptPassword(String account,String password){
        String salt = DigestUtils.sha512Hex(account + password);
        return DigestUtils.sha512Hex(DigestUtils.sha512Hex(password)+salt);
    }
}
