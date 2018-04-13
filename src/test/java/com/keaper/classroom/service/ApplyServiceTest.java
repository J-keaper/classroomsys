package com.keaper.classroom.service;

import com.keaper.SpringBaseTest;
import org.junit.Test;

import javax.annotation.Resource;

import static org.junit.Assert.*;

public class ApplyServiceTest extends SpringBaseTest {


    @Resource
    private ApplyService applyService;

    @Test
    public void getApplyList() {
        applyService.getApplyList(1,10);
    }

    @Test
    public void auditApply() {
        applyService.auditApply(1,1,true,"同意","11101");
    }
}