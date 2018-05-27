package com.keaper.classroom.task;


import com.keaper.classroom.enums.ClassroomStatus;
import com.keaper.classroom.enums.ScheduleStatus;
import com.keaper.classroom.modal.Classroom;
import com.keaper.classroom.modal.Schedule;
import com.keaper.classroom.persistence.dao.ClassroomDao;
import com.keaper.classroom.persistence.dao.ScheduleDao;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * 定时任务更新教室状态
 */
@Component
public class UpdateClassroomStatusTask {
    private static Logger logger = LoggerFactory.getLogger(UpdateClassroomStatusTask.class);

    @Resource
    private ClassroomDao classroomDao;
    @Resource
    private ScheduleDao scheduleDao;


    @Transactional
    public void doTask() throws JobExecutionException {
        try{
            logger.info("[更新教室状态]定时任务开始...");
            List<Schedule> scheduleList = scheduleDao.getNeedExecuteList();
            for (Schedule schedule : scheduleList){
                logger.info("教室：{}，需要更新状态：{}",
                        schedule.getClassroom(),schedule.getClassroomStatus());
                Classroom classroom = classroomDao.selectClassroomByNumber(schedule.getClassroom());
                if(classroom.getStatus().getCode() == schedule.getClassroomStatus().getCode()){
                    logger.info("教室：{}，无需更新状态,当前状态：{}",
                            schedule.getClassroom(),schedule.getClassroomStatus());
                    continue;
                }
                boolean result = classroomDao.updateStatus(schedule.getClassroom(),
                        schedule.getClassroomStatus().getCode()) > 0 &&
                        scheduleDao.updateStatus(schedule.getId(),ScheduleStatus.UNDERWAY.getCode()) >0;
                logger.info("教室：{}，更新状态结果：{}",
                        schedule.getClassroom(),result);
            }
            List<Schedule> overdueScheduleList = scheduleDao.getNeedOverdueList();
            for (Schedule schedule : overdueScheduleList){
                logger.info("教室：{}，需要更新状态为关闭", schedule.getClassroom());
                Classroom classroom = classroomDao.selectClassroomByNumber(schedule.getClassroom());
                if(classroom.getStatus().getCode() == ClassroomStatus.CLOSE.getCode()){
                    logger.info("教室：{}，无需更新状态,当前状态：{}",
                            schedule.getClassroom(),classroom.getStatus());
                    continue;
                }
                boolean result = classroomDao.updateStatus(schedule.getClassroom(),
                        ClassroomStatus.CLOSE.getCode()) > 0 &&
                        scheduleDao.updateStatus(schedule.getId(),ScheduleStatus.OVERDUE.getCode()) > 0;
                logger.info("教室：{}，更新状态结果：{}",
                        schedule.getClassroom(),result);
            }
            logger.info("[更新教室状态]定时任务结束!]");
        }catch (Exception  e){
            logger.error("[更新教室状态]定时任务发生异常",e);
            JobExecutionException e2 = new JobExecutionException(e);
            e2.refireImmediately();
            throw e2;
        }
    }
}
