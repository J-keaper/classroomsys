package com.keaper.classroom.web.controller;


import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Maps;
import com.keaper.classroom.common.JsonResult;
import com.keaper.classroom.enums.ApplyPurpose;
import com.keaper.classroom.enums.ApplyStatus;
import com.keaper.classroom.enums.ClassroomStatus;
import com.keaper.classroom.enums.UserType;
import com.keaper.classroom.persistence.dao.ClassroomDao;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;

@Controller
@RequestMapping("/api/common")
public class CommonController {


    @Resource
    private ClassroomDao classroomDao;


    @RequestMapping("constant")
    @ResponseBody
    public JsonResult getCommonConstant() {
        JSONObject result = new JSONObject();

        JSONObject userType = new JSONObject();
        for (final UserType type : UserType.values()) {
            userType.put(type.name(), new JSONObject(
                    new HashMap<String, Object>() {{
                        put("code", type.getCode());
                        put("desc", type.getDesc());
                    }}
            ));
        }
        result.put("userType", userType);

        JSONObject applyStatus = new JSONObject();
        for (final ApplyStatus status : ApplyStatus.values()) {
            applyStatus.put(status.name(), new JSONObject(
                    new HashMap<String, Object>() {{
                        put("code", status.getCode());
                        put("desc", status.getDesc());
                    }}
            ));
        }
        result.put("applyStatus", applyStatus);

        JSONObject classroomStatus = new JSONObject();
        for (final ClassroomStatus status : ClassroomStatus.values()) {
            classroomStatus.put(status.name(), new JSONObject(
                    new HashMap<String, Object>() {{
                        put("code", status.getCode());
                        put("desc", status .getDesc());
                    }}
            ));
        }
        result.put("classroomStatus", classroomStatus);

        JSONObject applyPurpose = new JSONObject();
        for (final ApplyPurpose purpose : ApplyPurpose.values()) {
            applyPurpose.put(purpose.name(), new JSONObject(
                    new HashMap<String, Object>() {{
                        put("code", purpose.getCode());
                        put("desc", purpose .getDesc());
                    }}
            ));
        }
        result.put("applyPurpose", applyPurpose);

        result.put("campusList", classroomDao.getCampusList());
        result.put("buildingList", classroomDao.getBuildingList());
        return JsonResult.getCorrectResult(result);
    }


}
