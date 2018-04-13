package com.keaper.classroom.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ClassroomStatus {
    CLOSE(1,"关闭"),
    FREE(2,"空闲"),
    TEACHING(3,"正常教学"),
    ACTIVITY(4,"活动占用");

    private int code;
    private String desc;

    ClassroomStatus(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public static ClassroomStatus codeOf(int code){
        for(ClassroomStatus classroomStatus : ClassroomStatus.values()){
            if(classroomStatus.getCode() == code){
                return classroomStatus;
            }
        }
        return null;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
