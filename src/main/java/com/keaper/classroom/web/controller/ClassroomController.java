package com.keaper.classroom.web.controller;


import com.keaper.classroom.common.JsonResult;
import com.keaper.classroom.modal.Classroom;
import com.keaper.classroom.service.ClassroomService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/api/classroom")
public class ClassroomController {


    @Resource
    private ClassroomService classroomService;


    @ResponseBody
    @RequestMapping(method = RequestMethod.GET,path = "list")
    public JsonResult getClassroomList(@RequestParam("pc") int pageCount,
                                       @RequestParam("ps") int pageSize){
        List<Classroom> classroomList =
                classroomService.getClassroomList(pageCount,pageSize);
        return JsonResult.getCorrectResult(classroomList);
    }



}
