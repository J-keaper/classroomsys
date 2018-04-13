package com.keaper.classroom.web.controller;


import com.keaper.classroom.persistence.dao.UserDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping("/test")
@Controller
public class TestController {
    private static final Logger logger = LoggerFactory.getLogger(TestController.class);

    @Autowired
    UserDao userDao;

    @RequestMapping("/hello")
    @ResponseBody
    public String hello(){
        logger.info("hello");
        return "hello";
    }
}
