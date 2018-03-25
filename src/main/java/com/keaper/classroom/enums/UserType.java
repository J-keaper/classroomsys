package com.keaper.classroom.enums;

public enum UserType {
    ADMIN(1,"管理员"),
    AUDITOR(2,"审核人员"),
    STUDENT(11,"学生"),
    TEACHER(12,"教师");

    private int code;

     private String desc;

    UserType(int code, String desc) {
        this.code = code;
        this.desc = desc;
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