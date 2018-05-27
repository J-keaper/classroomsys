package com.keaper.classroom.enums;

public enum ScheduleStatus {
    PENDING(1,"待执行"),
    UNDERWAY(2,"进行中"),
    OVERDUE(3,"已过期");

    private int code;
    private String desc;


    ScheduleStatus(int code, String desc) {
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

    public static ScheduleStatus codeOf(int code){
        for(ScheduleStatus scheduleStatus : ScheduleStatus.values()){
            if(scheduleStatus.getCode() == code){
                return scheduleStatus;
            }
        }
        return null;
    }

}
