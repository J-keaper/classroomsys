package com.keaper.classroom.web.controller;


import com.alibaba.fastjson.JSONObject;
import com.keaper.classroom.common.JsonResult;
import com.keaper.classroom.enums.ApplyStatus;
import com.keaper.classroom.modal.ApplyInfo;
import com.keaper.classroom.modal.filter.ApplyFilter;
import com.keaper.classroom.service.ApplyService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.text.ParseException;

@Controller
@RequestMapping("api/apply")
public class ApplyController {

    @Resource
    private ApplyService applyService;

    @ResponseBody
    @RequestMapping(method = RequestMethod.GET,path = "list")
    public JsonResult getApplyList(@RequestParam("pc") int pageCount,
                                   @RequestParam("ps") int pageSize,
                                   @RequestParam(value = "sa",required = false) String searchApplicant,
                                   @RequestParam(value = "ss",required = false) String searchStatus){
        ApplyFilter filter = ApplyFilter.of(
                pageCount,pageSize,
                StringUtils.isBlank(searchApplicant) ? null : searchApplicant,
                searchStatus == null || StringUtils.equals(searchStatus,"-1") ?
                        null : ApplyStatus.codeOf(Integer.valueOf(searchStatus))
        );
        JSONObject result = new JSONObject();
        result.put("applyList",applyService.getApplyList(filter));
        result.put("applyCount",applyService.getApplyCount(filter));
        return JsonResult.getCorrectResult(result);
    }


    @ResponseBody
    @RequestMapping(path = "{id}")
    public JsonResult getApply(@PathVariable(name = "id") String id){
        long applyId = Long.valueOf(id);
        ApplyInfo applyInfo = applyService.getApplyById(applyId);
        return JsonResult.getCorrectResult(applyInfo);
    }


    @ResponseBody
    @RequestMapping(method = RequestMethod.POST,path = "add")
    public JsonResult addApply(@RequestParam("aid") String applicantId,
                               @RequestParam("ap") String applyPurpose,
                               @RequestParam("ar") String applyReason,
                               @RequestParam("ac") String applyCapacity,
                               @RequestParam("st") String startTime,
                               @RequestParam("et")String endTime) throws ParseException {
        boolean result = applyService.addApply(Long.valueOf(applicantId),
                Integer.valueOf(applyPurpose), applyReason,
                Integer.valueOf(applyCapacity), startTime,endTime);
        if(!result){
            JsonResult.getErrorResult(JsonResult.Result.ERROR,"发生错误！");
        }
        return JsonResult.getCorrectResult("提交成功！");
    }


    @ResponseBody
    @RequestMapping("audit")
    public JsonResult audit(@RequestParam("id") String id,
                            @RequestParam("aid") String auditorId,
                            @RequestParam("pass") boolean pass,
                            @RequestParam("opi") String opinion,
                            @RequestParam(value = "cla",required = false)String classroom){
        boolean result = applyService.auditApply(Long.valueOf(id),Long.valueOf(auditorId),
                pass,opinion,classroom);
        if(!result){
            JsonResult.getErrorResult(JsonResult.Result.ERROR,"发生错误！");
        }
        return JsonResult.getCorrectResult("提交成功！");
    }




}
