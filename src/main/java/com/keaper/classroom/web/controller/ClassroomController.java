package com.keaper.classroom.web.controller;


import com.alibaba.fastjson.JSONObject;
import com.keaper.classroom.common.JsonResult;
import com.keaper.classroom.enums.ClassroomStatus;
import com.keaper.classroom.modal.filter.ClassroomFilter;
import com.keaper.classroom.service.ClassroomService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.text.ParseException;

@Controller
@RequestMapping("/api/classroom")
public class ClassroomController {


    @Resource
    private ClassroomService classroomService;


    @ResponseBody
    @RequestMapping(method = RequestMethod.GET,path = "list")
    public JsonResult getClassroomList(@RequestParam("pc") int pageCount,
                                       @RequestParam("ps") int pageSize,
                                       @RequestParam(value = "sb",required = false) String searchBuilding,
                                       @RequestParam(value = "sc",required = false) String searchCampus,
                                       @RequestParam(value = "ss",required = false) String searchStatus,
                                       @RequestParam(value = "sn",required = false) String searchNumber){
        ClassroomFilter filter = ClassroomFilter.of(
                StringUtils.defaultIfBlank(searchCampus,null),
                StringUtils.defaultIfBlank(searchBuilding,null),
                searchStatus == null || StringUtils.equals(searchStatus,"-1") ?
                        null : ClassroomStatus.codeOf(Integer.valueOf(searchStatus)),
                searchNumber,pageCount,pageSize);
        JSONObject result = new JSONObject();
        result.put("classroomList",classroomService.getClassroomList(filter));
        result.put("classroomCount",classroomService.getClassroomCount(filter));
        return JsonResult.getCorrectResult(result);
    }


    @RequestMapping(method = RequestMethod.POST,path = "import")
    @ResponseBody
    public JsonResult importUser(@RequestParam(value = "cl")String classroomList){
        boolean result = classroomService.batchImportUser(classroomList);
        if(!result){
            return JsonResult.getErrorResult(JsonResult.Result.ERROR,"导入失败！");
        }
        return JsonResult.getCorrectResult("导入成功！");
    }

    @RequestMapping(method = RequestMethod.POST,path = "schedule/add")
    @ResponseBody
    public JsonResult addSchedule(@RequestParam(value = "cl")String classroomList,
                                  @RequestParam(value = "st")String startTime,
                                  @RequestParam(value = "et")String endTime,
                                  @RequestParam(value = "s")String status) {
        boolean result = classroomService.addSchedule(classroomList,startTime,endTime,status);
        if(!result){
            return JsonResult.getErrorResult(JsonResult.Result.ERROR,"添加失败！");
        }
        return JsonResult.getCorrectResult("添加成功！");
    }
}
