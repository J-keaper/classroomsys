package com.keaper.classroom.web.controller;


import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Maps;
import com.keaper.classroom.common.JsonResult;
import com.keaper.classroom.enums.UserType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
@RequestMapping("/api/common")
public class CommonController {


    @RequestMapping("type")
    @ResponseBody
    public JsonResult getCommonType(){
        try{
            JSONObject result = new JSONObject();

            JSONObject userType = new JSONObject();
            for(final UserType type : UserType.values()){
                userType.put(type.name(), new JSONObject(
                        new HashMap<String, Object>(){{
                            put("code",type.getCode());
                            put("desc",type.getDesc());
                        }}
                ));
            }
            result.put("userType",userType);

            return JsonResult.getCorrectResult(result);
        }catch (Exception e){
            return JsonResult.getErrorResult(JsonResult.Result.ERROR,null);
        }
    }


}
