package com.keaper.classroom.web.controller;

import com.alibaba.fastjson.JSONObject;
import com.keaper.classroom.common.JsonResult;
import com.keaper.classroom.enums.UserType;
import com.keaper.classroom.modal.filter.UserFilter;
import com.keaper.classroom.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);


    @Resource
    private UserService userService;


    @RequestMapping(method = RequestMethod.GET,path = "list")
    @ResponseBody
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
    public JsonResult importUser(@RequestParam(value = "ul")String userList){
        boolean result = userService.batchImportUser(userList);
        if(!result){
            return JsonResult.getErrorResult(JsonResult.Result.ERROR,"导入失败！");
        }
        return JsonResult.getCorrectResult("导入成功！");
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
