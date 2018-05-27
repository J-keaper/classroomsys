package com.keaper.classroom.persistence.dao;

import com.alibaba.fastjson.JSON;
import com.keaper.SpringBaseTest;
import com.keaper.classroom.enums.ClassroomStatus;
import com.keaper.classroom.enums.ScheduleStatus;
import com.keaper.classroom.modal.Schedule;
import org.apache.commons.lang3.time.DateUtils;
import org.junit.Test;

import javax.annotation.Resource;

import java.util.Date;
import java.util.List;

public class ScheduleDaoTest extends SpringBaseTest{

    @Resource
    private ScheduleDao scheduleDao;

    @Test
    public void insertSchedule() {
        boolean result = scheduleDao.addSchedule("11010H", DateUtils.addHours(new Date(),1),
                DateUtils.addHours(new Date(),3),ScheduleStatus.PENDING.getCode(), ClassroomStatus.ACTIVITY) > 0;
        System.out.println(result);
    }

    @Test
    public void getComeList() {
        List<Schedule> scheduleList = scheduleDao.getNeedExecuteList();
        System.out.println(JSON.toJSONString(scheduleList));
    }
}