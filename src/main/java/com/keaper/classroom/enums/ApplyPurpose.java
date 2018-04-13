package com.keaper.classroom.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ApplyPurpose {
    PRELECT(1,"讲演/讲课"),
    LECTURE(2,"讲座"),
    EXAM(3,"考试"),
    CLUB_ACTIVITIES(4,"社团活动"),
    OTHER(-128,"其他");

    private int code;
    private String desc;

    ApplyPurpose(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public static ApplyPurpose codeOf(int code){
        for(ApplyPurpose applyPurpose : ApplyPurpose.values()){
            if(applyPurpose.getCode() == code){
                return applyPurpose;
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
