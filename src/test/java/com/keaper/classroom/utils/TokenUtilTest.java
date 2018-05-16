package com.keaper.classroom.utils;

import com.alibaba.fastjson.JSON;
import com.keaper.SpringBaseTest;
import com.keaper.classroom.modal.User;
import io.jsonwebtoken.Claims;
import org.junit.Test;

public class TokenUtilTest extends SpringBaseTest{

    @Test
    public void test() {
        User user = new User();
        String jws = TokenUtil.generateToken(user);
        System.out.println(jws);
        Claims claims = TokenUtil.parseToken(jws);
        System.out.println(JSON.toJSONString(claims));
    }

    @Test
    public void generateToken() {

    }

    @Test
    public void parseToken() {

    }
}