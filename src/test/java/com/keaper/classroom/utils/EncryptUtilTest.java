package com.keaper.classroom.utils;

import org.junit.Test;

import static org.junit.Assert.*;

public class EncryptUtilTest {

    @Test
    public void encryptPassword() {
        System.out.println(EncryptUtil.EncryptPassword("1407084101","1407084101"));
    }
}