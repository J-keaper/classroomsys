package com.keaper.classroom.service;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.keaper.classroom.enums.ClassroomStatus;
import com.keaper.classroom.enums.ScheduleStatus;
import com.keaper.classroom.modal.Classroom;
import com.keaper.classroom.modal.ClassroomInfo;
import com.keaper.classroom.modal.Schedule;
import com.keaper.classroom.modal.filter.ClassroomFilter;
import com.keaper.classroom.persistence.dao.ApplyDao;
import com.keaper.classroom.persistence.dao.ClassroomDao;
import com.keaper.classroom.persistence.dao.ScheduleDao;
import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Service
public class ClassroomService {
    private static final Logger logger = LoggerFactory.getLogger(ClassroomService.class);

    @Resource
    private ClassroomDao classroomDao;

    @Resource
    private ScheduleDao scheduleDao;

    @Resource
    private ApplyDao applyDao;


    public List<ClassroomInfo> getClassroomList(ClassroomFilter filter){
        int offset = (filter.getPageCount()-1)*filter.getPageSize();
        if(offset < 0){
            offset = 0;
        }
        List<Classroom> classroomList = classroomDao.getClassroomList(filter.getCampus(),filter.getBuilding(),
                filter.getStatus() == null ?  null :filter.getStatus().getCode(),
                filter.getNumber(), offset, filter.getPageSize());
        return Lists.transform(classroomList,
                new Function<Classroom, ClassroomInfo>() {
                    public ClassroomInfo apply(Classroom classroom) {
                        ClassroomInfo classroomInfo = new ClassroomInfo(classroom);
                        if(classroom.getStatus() == ClassroomStatus.ACTIVITY){
                            classroomInfo.setApply(applyDao.getApplyByClassroom(classroom.getNumber()));
                        }
                        return classroomInfo;
                    }
        });
    }

    public int getClassroomCount(ClassroomFilter filter){
        return classroomDao.countClassroomList(filter.getCampus(),filter.getBuilding(),
                filter.getStatus() == null ?  null :filter.getStatus().getCode(),
                filter.getNumber());

    }


    public boolean batchImportUser (String classroomListJson){
        List<Classroom> classroomList = parseClassroomList(classroomListJson);
        return classroomDao.batchAddClassroom(classroomList) > 0;
    }

    public List<Classroom> parseClassroomList(String classroomListJson){
        List<Classroom> classroomList = Lists.newArrayList();
        JSONArray ja = JSON.parseArray(classroomListJson);
        for(Object o : ja){
            JSONObject jo = (JSONObject) o;
            Classroom classroom = new Classroom();
            classroom.setCampus(jo.getString("campus"));
            classroom.setBuilding(jo.getString("building"));
            classroom.setNumber(jo.getString("number"));
            classroom.setSeating(jo.getInteger("seating"));
            classroom.setStatus(ClassroomStatus.CLOSE);
            classroomList.add(classroom);
        }
        return classroomList;
    }

    @Transactional
    public boolean addSchedule(String classroomListJson, final String startTimeStr,
                               final String endTimeStr, final String status) {
        List<String> classroomList = parseIdList(classroomListJson);
        Date startTime = null;
        Date endTime = null;
        try {
            startTime = DateUtils.parseDate(startTimeStr,"yyyy-MM-dd HH:mm");
            endTime = DateUtils.parseDate(endTimeStr,"yyyy-MM-dd HH:mm");
        } catch (ParseException e) {
            logger.error("解析日期异常",e);
        }

        if(startTime == null || endTime == null){
            return false;
        }

        final Date finalStartTime = startTime;
        final Date finalEndTime = endTime;
        List<Schedule> scheduleList = Lists.transform(classroomList, new Function<String, Schedule>() {
            public Schedule apply(String s) {
                Schedule schedule = new Schedule();
                schedule.setClassroom(s);
                schedule.setStartTime(finalStartTime);
                schedule.setEndTime(finalEndTime);
                schedule.setClassroomStatus(ClassroomStatus.codeOf(Integer.valueOf(status)));
                schedule.setStatus(ScheduleStatus.PENDING);
                return schedule;
            }
        });
        return scheduleDao.batchAddSchedule(scheduleList) > 0;
    }


    public List<String> parseIdList(String classroomListJson){
        List<String> numberList = Lists.newArrayList();
        JSONArray ja = JSON.parseArray(classroomListJson);
        for(Object o :ja){
            numberList.add((String)o);
        }
        return numberList;
    }

}
