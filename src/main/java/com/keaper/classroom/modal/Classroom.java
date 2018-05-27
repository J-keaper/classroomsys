package com.keaper.classroom.modal;

import com.keaper.classroom.enums.ClassroomStatus;

import java.util.Date;

public class Classroom {

    private long id;

    private String number;

    private String building;

    private String campus;

    private int seating;

    private Date updateTime;

    private ClassroomStatus status;

    public Classroom() {
    }

    public Classroom(Classroom classroom) {
        this.id = classroom.id;
        this.number = classroom.number;
        this.building = classroom.building;
        this.campus = classroom.campus;
        this.seating = classroom.seating;
        this.updateTime = classroom.updateTime;
        this.status = classroom.status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public int getSeating() {
        return seating;
    }

    public void setSeating(int seating) {
        this.seating = seating;
    }

    public ClassroomStatus getStatus() {
        return status;
    }

    public void setStatus(ClassroomStatus status) {
        this.status = status;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
