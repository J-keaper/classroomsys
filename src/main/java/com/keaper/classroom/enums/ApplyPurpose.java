package com.keaper.classroom.enums;

public enum ApplyPurpose {
    PRELECT(1,"讲演/讲课"),
    EXAM(2,"考试"),

    OTHER(-128,"其他");


    private int code;
    private String desc;

    ApplyPurpose(int code, String desc) {
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
