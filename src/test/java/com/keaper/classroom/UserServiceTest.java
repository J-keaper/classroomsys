package com.keaper.classroom;

import com.keaper.SpringBaseTest;
import com.keaper.classroom.modal.User;
import com.keaper.classroom.service.UserService;
import org.junit.Test;

import javax.annotation.Resource;
import java.util.List;

public class UserServiceTest extends SpringBaseTest{


    @Resource
    private UserService userService;

    @Test
    public void getUserInfoByAccount() {


    }

    @Test
    public void validatePassword() {
        userService.validatePassword("1407084125","1407084125","");
    }

    @Test
    public void getUserList() {
        List<User> userList = userService.getUserList(1,10);

    }
}