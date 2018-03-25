package com.keaper.classroom.web.controller;


import com.keaper.classroom.persistence.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping("/test")
@Controller
public class TestController {


    @Autowired
    UserDao userDao;

    @RequestMapping("/hello")
    @ResponseBody
    public String hello(){
        return "hello";
    }


    @ResponseBody
    @RequestMapping("/selectUserNameById")
    public String selectUserNameById(@RequestParam("id") int id){
        return userDao.selectUserNameById(1);
    }
}
