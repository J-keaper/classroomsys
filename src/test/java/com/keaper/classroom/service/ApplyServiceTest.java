package com.keaper.classroom.service;

import com.keaper.SpringBaseTest;
import org.apache.commons.lang3.time.DateUtils;
import org.junit.Test;

import javax.annotation.Resource;

import java.text.ParseException;
import java.util.Date;

import static org.junit.Assert.*;

public class ApplyServiceTest extends SpringBaseTest {


    @Resource
    private ApplyService applyService;

    @Test
    public void getApplyList() {
        applyService.getApplyList(1,10);
    }

    @Test
    public void auditApply() throws ParseException {
        Date date = DateUtils.parseDate("2018-05-16 16:19","yyyy-MM-dd HH:mm");

        applyService.auditApply(1,1,true,"同意","11101");
    }
}