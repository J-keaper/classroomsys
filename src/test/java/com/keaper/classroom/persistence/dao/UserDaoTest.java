package com.keaper.classroom.persistence.dao;

import com.keaper.SpringBaseTest;
import com.keaper.classroom.modal.User;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
public class UserDaoTest extends SpringBaseTest{


    @Autowired
    UserDao userDao;

    @Test
    public void selectUserByAccount() {
        User user = userDao.selectUserByAccount("1407084125");
        System.out.println(user);
    }

    @Test
    public void countUserList() {
        System.out.println(userDao.countUserList(11,"25"));
    }
}