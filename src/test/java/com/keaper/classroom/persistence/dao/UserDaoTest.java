package com.keaper.classroom.persistence.dao;

import com.keaper.SpringBaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class UserDaoTest extends SpringBaseTest{


    @Autowired
    UserDao userDao;

    @Test
    public void selectUserNameById() throws Exception {
        System.out.println(userDao.selectUserNameById(1));
    }

}