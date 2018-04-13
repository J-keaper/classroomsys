package com.keaper.classroom.web.controller;

import com.keaper.classroom.common.JsonResult;
import com.keaper.classroom.modal.User;
import com.keaper.classroom.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/api/user")
public class UserController {


    @Resource
    private UserService userService;


    @RequestMapping(method = RequestMethod.GET,path = "list")
    @ResponseBody
    public JsonResult getUserList(@RequestParam("pc") int pageCount,
                                  @RequestParam("ps") int pageSize){
        List<User> userList = userService.getUserList(pageCount,pageSize);
        return JsonResult.getCorrectResult(userList);
    }

    @RequestMapping(method = RequestMethod.POST,path = "update")
    @ResponseBody
    public JsonResult updateUser(@RequestParam(value = "a") String account,
                                 @RequestParam(value = "p",required = false) String phone,
                                 @RequestParam(value = "e",required = false) String email,
                                 @RequestParam(value = "pwd",required = false) String password){
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

}
