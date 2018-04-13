package com.keaper.classroom.web.controller;

import com.keaper.classroom.service.UserService;
import com.keaper.classroom.common.JsonResult;
import com.keaper.classroom.modal.User;
import com.keaper.classroom.utils.CaptchaUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/api/user")
public class LoginController {

    @Resource
    private UserService userService;

    /**
     *
     * @param account
     * @param password
     * @return
     */
    @RequestMapping(method = RequestMethod.POST,path = "login")
    @ResponseBody
    public JsonResult login(HttpServletRequest request,
                            @RequestParam("a") String account,
                            @RequestParam("p") String password){
        boolean captchaResult = CaptchaUtil.validate(request);
        if(!captchaResult){
            return JsonResult.getErrorResult(
                    JsonResult.Result.LOGIN_CAPTCHA_DENIED,
                    JsonResult.Result.LOGIN_CAPTCHA_DENIED.getText());
        }
        User user = userService.getUserInfoByAccount(account);
        if(user == null){
            return JsonResult.getErrorResult(
                    JsonResult.Result.LOGIN_NO_USER,
                    JsonResult.Result.LOGIN_NO_USER.getText());
        }
        boolean passwordResult = userService.validatePassword(account,password,user.getPassword());
        if(!passwordResult){
            return JsonResult.getErrorResult(
                    JsonResult.Result.LOGIN_PASSWORD_WRONG,
                    JsonResult.Result.LOGIN_PASSWORD_WRONG.getText());
        }
        return JsonResult.getCorrectResult(user);
    }
}
