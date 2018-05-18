package com.keaper.classroom.web.controller;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONReader;
import com.keaper.classroom.annotation.TokenValidate;
import com.keaper.classroom.common.JsonResult;
import com.keaper.classroom.enums.UserType;
import com.keaper.classroom.modal.ApplyInfo;
import com.keaper.classroom.modal.User;
import com.keaper.classroom.modal.filter.UserFilter;
import com.keaper.classroom.persistence.dao.UserDao;
import com.keaper.classroom.service.ApplyService;
import com.keaper.classroom.service.EmailService;
import com.keaper.classroom.service.UserService;
import com.keaper.classroom.utils.TokenUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/api/user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);


    @Resource
    private UserService userService;


    @Resource
    private ApplyService applyService;

    @Resource
    private EmailService emailService;


    /**
     * 获取当前登录用户信息
     * @param request
     * @return
     */
    @RequestMapping(method = RequestMethod.GET,path = "info")
    @ResponseBody
    @TokenValidate
    public JsonResult getCurrentUserInfo(HttpServletRequest request){
        Claims claims = (Claims) request.getAttribute("claims");
        String account = (String) claims.get("account");
        User user = userService.getUserInfoByAccount(account);
        return JsonResult.getCorrectResult(user);
    }


    @RequestMapping(method = RequestMethod.GET,path = "list")
    @ResponseBody
    @TokenValidate
    public JsonResult getUserList(@RequestParam("pc") int pageCount,
                                  @RequestParam("ps") int pageSize,
                                  @RequestParam(value = "sk",required = false) String searchKey,
                                  @RequestParam(value = "st",required = false) String searchType){
        UserFilter filter = UserFilter.of(
                searchType == null || StringUtils.equals(searchType,"-1") ? null :
                        UserType.codeOf(Integer.valueOf(searchType)),searchKey, pageCount,pageSize);
        JSONObject result = new JSONObject();
        result.put("userList",userService.getUserList(filter));
        result.put("userCount",userService.getUserCount(filter));
        return JsonResult.getCorrectResult(result);
    }

    @RequestMapping(method = RequestMethod.POST,path = "import")
    @ResponseBody
    @TokenValidate
    public JsonResult importUser(@RequestParam(value = "ul")String userList){
        boolean result = userService.batchImportUser(userList);
        if(!result){
            return JsonResult.getErrorResult(JsonResult.Result.ERROR,"导入失败！");
        }
        return JsonResult.getCorrectResult("导入成功！");
    }

    @RequestMapping(method = RequestMethod.POST,path = "update")
    @ResponseBody
    @TokenValidate
    public JsonResult updateUser(HttpServletRequest request,
                                 @RequestParam(value = "a",required = false) String account,
                                 @RequestParam(value = "p",required = false) String phone,
                                 @RequestParam(value = "e",required = false) String email,
                                 @RequestParam(value = "pwd",required = false) String password){
        if(account == null){
            account = (String) ((Claims) request.getAttribute("claims")).get("account");
        }
        if(account == null ||
                (phone == null && email == null && password == null)){
            return JsonResult.getErrorResult(
                    JsonResult.Result.PARAMETER_ERROR,"参数错误！");
        }
        boolean result = userService.updateUser(account,phone,email,password);
        if(!result){
            return JsonResult.getErrorResult(
                    JsonResult.Result.ERROR,"发生错误！");
        }
        return JsonResult.getCorrectResult("更新成功！");
    }

    @RequestMapping(method = RequestMethod.POST,value = "/update/password")
    @ResponseBody
    @TokenValidate
    public JsonResult updateUserPassword(HttpServletRequest request,
                                         @RequestParam("op") String oldPassword,
                                         @RequestParam("np") String newPassword){
        String account = (String) ((Claims) request.getAttribute("claims")).get("account");
        User user = userService.getUserInfoByAccount(account);
        if(!userService.validatePassword(account,oldPassword,user.getPassword())){
            return JsonResult.getErrorResult(JsonResult.Result.ERROR,"旧密码错误");
        }
        boolean result = userService.updateUser(account,null,null, newPassword);
        if(!result){
            return JsonResult.getErrorResult(
                    JsonResult.Result.ERROR,"修改失败！");
        }
        return JsonResult.getCorrectResult("修改成功！");
    }

    /**
     * 获取当前用户的申请记录
     * @return
     */
    @RequestMapping(method = RequestMethod.GET,value = "apply")
    @ResponseBody
    @TokenValidate
    public JsonResult getUserApply(HttpServletRequest request){
        long userId =  Long.valueOf((String) ((Claims)request.getAttribute("claims")).get("id"));
        List<ApplyInfo> applyInfoList = applyService.getApplyListByUser(userId);
        return JsonResult.getCorrectResult(applyInfoList);
    }


    @RequestMapping(method = RequestMethod.GET,value = "password/forget")
    @ResponseBody
    public JsonResult forgetPassword(HttpServletRequest request,
                                     @RequestParam("e") String email){
        User user = userService.selectUserByEmail(email);
        String resetPasswordUrl = userService.buildResetPasswordUrl(request,user);
        if(resetPasswordUrl == null){
            return JsonResult.getErrorResult(
                    JsonResult.Result.ERROR,"邮箱不存在！");
        }
        logger.info("email:{},重置密码链接：{}",email,resetPasswordUrl);
        try{
            emailService.sendResetPasswordEmail(email,resetPasswordUrl);
            userService.setWaitReset(user.getAccount());
            return JsonResult.getCorrectResult("发送成功！");
        }catch (MessagingException e){
            logger.info("发送邮件失败！",e);
            return JsonResult.getErrorResult(
                    JsonResult.Result.ERROR,"发送失败"
            );
        }
    }


    @RequestMapping(method = RequestMethod.POST,value = "password/reset")
    @ResponseBody
    public JsonResult resetPassword(@RequestParam("t") String token,
                                     @RequestParam("p") String password){
        try {
            Claims claims = TokenUtil.parseToken(token);
            logger.info("token : {} 校验成功，Claims:{}",token,claims);
            String account = (String) claims.get("account");
            if(!userService.weatherWaitReset(account)){
                return JsonResult.getErrorResult(
                        JsonResult.Result.ERROR,"链接已失效！");
            }
            boolean result = userService.updateUser(account,null,null,password);
            userService.clearWaitReset(account);
            if(!result){
                return JsonResult.getErrorResult(JsonResult.Result.ERROR,"重置失败！");
            }
            return JsonResult.getCorrectResult("密码重置成功！");
        }catch (ExpiredJwtException e) {
            logger.error("token : {} 已过期！",token,e);
            return JsonResult.getErrorResult(
                    JsonResult.Result.ERROR,"链接已失效!"
            );
        } catch (SignatureException e) {
            logger.error("token : {} 校验失败！",token,e);
            return JsonResult.getErrorResult(
                    JsonResult.Result.ERROR,"无效链接！"
            );
        }
    }

}
