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
        System.out.println(userService.validatePassword("1407084101","1407084102","a707705ae50dfbd912f0ad2378c7da2344370c99e9e0436c40398f12d87726594b851130d5b1088e96eceadc78df9a8c5f358a584fd45fb2081759f3f156e297"));
    }

    @Test
    public void getUserList() {
        List<User> userList = userService.getUserList(1,10);

    }

    @Test
    public void batchImportUser() {
        String json = "[{\"no\":\"0\",\"account\":\"1407084101 \",\"phone\":\"18434361009\",\"email\":\"1273570695@qq.com\",\"type\":{\"code\":11,\"desc\":\"学生\"}},{\"no\":\"1\",\"account\":\"1407084102 \",\"phone\":\"18434361010\",\"email\":\"1273570696@qq.com\",\"type\":{\"code\":11,\"desc\":\"学生\"}},{\"no\":\"2\",\"account\":\"1407084103 \",\"phone\":\"18434361011\",\"email\":\"1273570697@qq.com\",\"type\":{\"code\":11,\"desc\":\"学生\"}}]";
        boolean result = userService.batchImportUser(json);
        System.out.println(result);
    }
}