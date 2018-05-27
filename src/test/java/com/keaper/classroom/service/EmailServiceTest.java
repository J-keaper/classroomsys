package com.keaper.classroom.service;

import com.keaper.SpringBaseTest;
import org.junit.Test;

import javax.annotation.Resource;
import javax.mail.MessagingException;

import static org.junit.Assert.*;

public class EmailServiceTest extends SpringBaseTest{

    @Resource
    private EmailService emailService;

    @Test
    public void sendResetPasswordEmail() throws MessagingException {
        emailService.sendResetPasswordEmail("1042137827@qq.com","www.baidu.com");
    }

}