package com.keaper.classroom.persistence.dao;


import com.keaper.classroom.enums.ClassroomStatus;
import com.keaper.classroom.modal.Schedule;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ScheduleDao {

    int addSchedule(@Param("classroom") String classroom,
                    @Param("startTime") Date startTime,
                    @Param("endTime") Date endTime,
                    @Param("status") int status,
                    @Param("classroomStatus") ClassroomStatus classroomStatus);

    int batchAddSchedule(@Param("scheduleList") List<Schedule> scheduleList);

    List<Schedule> getNeedExecuteList();

    List<Schedule> getNeedOverdueList();

    int updateStatus(@Param("id")long id,@Param("status")int status);
}
