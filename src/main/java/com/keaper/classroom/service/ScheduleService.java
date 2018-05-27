package com.keaper.classroom.service;

import com.keaper.classroom.modal.Classroom;
import com.keaper.classroom.modal.Schedule;
import com.keaper.classroom.persistence.dao.ClassroomDao;
import com.keaper.classroom.persistence.dao.ScheduleDao;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


@Service
public class ScheduleService {

    @Resource
    private ScheduleDao scheduleDao;


    @Resource
    private ClassroomDao classroomDao;
}
