package com.keaper.classroom.persistence.dao;

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
}
