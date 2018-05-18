package com.keaper.classroom.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    private static Logger logger = LoggerFactory.getLogger(EmailService.class);

    private static String CAPTCHA_MAIL_SUBJECT = "验证码";

    private static String RESET_PASSWORD_SUBJECT = "密码重置";


    @Resource
    private JavaMailSenderImpl mailSender;

    @Resource
    private SpringTemplateEngine templateEngine;

    private void sendThymeleafMail(String[] toEmails, String subject, Map<String, Object> model, String templateLocation) throws MessagingException {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage,true,"UTF-8");

            messageHelper.setFrom(mailSender.getUsername());
            messageHelper.setTo(toEmails);
            messageHelper.setSubject(subject);

            if(model != null){
                Context context = new Context();
                for(Map.Entry<String, Object> param : model.entrySet()){
                    context.setVariable(param.getKey(), param.getValue());
                }

                String emailContent = templateEngine.process(templateLocation, context);
                logger.info("发送邮件内容{}",emailContent);
                messageHelper.setText(emailContent,true);
            }
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            logger.error("发送邮件异常！",e);
            throw e;
        }
    }


    private void sendThymeleafMail(String toEmail, String subject, Map<String, Object> model, String templateLocation) throws MessagingException {
        sendThymeleafMail(new String[]{toEmail},subject,model,templateLocation);
    }

    public void sendResetPasswordEmail(String toMails, final String resetPasswordUrl) throws MessagingException {
        sendThymeleafMail(toMails, RESET_PASSWORD_SUBJECT,
                    new HashMap<String, Object>(){{
                    put("url",resetPasswordUrl);
                }},"reset-pwd-email"
        );
    }

}
