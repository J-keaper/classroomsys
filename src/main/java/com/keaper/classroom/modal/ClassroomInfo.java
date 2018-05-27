package com.keaper.classroom.modal;

public class ClassroomInfo extends Classroom{

    private Apply apply;

    public Apply getApply() {
        return apply;
    }

    public void setApply(Apply apply) {
        this.apply = apply;
    }

    public ClassroomInfo(Classroom classroom) {
        super(classroom);
    }
}
