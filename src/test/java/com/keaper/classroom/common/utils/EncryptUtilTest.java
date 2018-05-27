package com.keaper.classroom.common.utils;

import org.junit.Test;

public class EncryptUtilTest {

    @Test
    public void encryptPassword() {
        System.out.println(EncryptUtil.EncryptPassword("admin","admin"));
    }
}