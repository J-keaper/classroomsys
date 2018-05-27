package com.keaper.classroom.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum UserType {
    ADMIN(1,"管理员"),
    STUDENT(11,"学生"),
    TEACHER(12,"教师");

    private int code;

     private String desc;

    UserType(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public static  UserType codeOf(int code){
        for(UserType userType : UserType.values()){
            if(userType.getCode() == code){
                return userType;
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
