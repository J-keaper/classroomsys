package com.keaper.classroom.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ApplyStatus {
    PENDING(1,"待审核"),
    PASSED(2,"审核通过"),
    DENIED(3,"审核未通过"),
    ;

    private int code;
    private String desc;


    ApplyStatus(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public static ApplyStatus codeOf(int code){
        for(ApplyStatus applyStatus : ApplyStatus.values()){
            if(applyStatus.getCode() == code){
                return applyStatus;
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
