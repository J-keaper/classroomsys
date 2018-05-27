package com.keaper.classroom.modal;

import com.keaper.classroom.enums.ClassroomStatus;
import com.keaper.classroom.enums.ScheduleStatus;

import java.util.Date;

public class Schedule {

    private long id;

    private String classroom;

    private Date startTime;

    private Date endTime;

    private ScheduleStatus status;

    private ClassroomStatus classroomStatus;

    private Date createTime;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getClassroom() {
        return classroom;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public ScheduleStatus getStatus() {
        return status;
    }

    public void setStatus(ScheduleStatus status) {
        this.status = status;
    }

    public ClassroomStatus getClassroomStatus() {
        return classroomStatus;
    }

    public void setClassroomStatus(ClassroomStatus classroomStatus) {
        this.classroomStatus = classroomStatus;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
