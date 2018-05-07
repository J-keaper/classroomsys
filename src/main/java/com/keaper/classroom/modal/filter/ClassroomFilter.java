package com.keaper.classroom.modal.filter;

import com.keaper.classroom.enums.ClassroomStatus;

public class ClassroomFilter extends CommonFilter {

    private String building;

    private String campus;

    private ClassroomStatus status;

    private String number;


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

    public ClassroomStatus getStatus() {
        return status;
    }

    public void setStatus(ClassroomStatus status) {
        this.status = status;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public ClassroomFilter(int pageCount, int pageSize,
                           String building, String campus,
                           ClassroomStatus status, String number) {
        super(pageCount, pageSize);
        this.building = building;
        this.campus = campus;
        this.status = status;
        this.number = number;
    }

    public static ClassroomFilter of(int pageCount, int pageSize){
        return new ClassroomFilter(pageCount,pageSize,
                null,null,null,null);
    }

    public static ClassroomFilter of(String searchCampus,String searchBuilding,
                                     ClassroomStatus searchStatus, String searchNumber,
                                     int pageCount, int pageSize){
        return new ClassroomFilter(pageCount,pageSize,
                searchBuilding,searchCampus,searchStatus,searchNumber);
    }


}
