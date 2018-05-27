package com.keaper.classroom.persistence.dao;

import com.alibaba.fastjson.JSON;
import com.keaper.SpringBaseTest;
import com.keaper.classroom.modal.Apply;
import org.junit.Test;

import javax.annotation.Resource;

import java.util.List;

import static org.junit.Assert.*;

public class ApplyDaoTest extends SpringBaseTest{


    @Resource
    private ApplyDao applyDao;

    @Test
    public void getApplyList() {
        List<Apply> applyList = applyDao.getApplyList(null,null,0,10);
    }

    @Test
    public void getApplyByClassroom() {
        Apply apply = applyDao.getApplyByClassroom("15107H");
        System.out.println(JSON.toJSONString(apply));
    }
}
