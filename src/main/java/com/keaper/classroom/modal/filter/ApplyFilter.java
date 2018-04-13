package com.keaper.classroom.modal.filter;

import com.keaper.classroom.enums.ApplyStatus;
import com.keaper.classroom.modal.Apply;

public class ApplyFilter extends CommonFilter {

    private String applicant;

    private ApplyStatus applyStatus;


    public String getApplicant() {
        return applicant;
    }

    public void setApplicant(String applicant) {
        this.applicant = applicant;
    }

    public ApplyStatus getApplyStatus() {
        return applyStatus;
    }

    public void setApplyStatus(ApplyStatus applyStatus) {
        this.applyStatus = applyStatus;
    }


    public ApplyFilter(int pageCount, int pageSize,
                       String applicant,ApplyStatus applyStatus) {
        super(pageCount, pageSize);
        this.applicant = applicant;
        this.applyStatus = applyStatus;
    }

    public static ApplyFilter of(int pageCount, int pageSize){
        return new ApplyFilter(pageCount,pageSize,null,null);
    }

    public static ApplyFilter of(int pageCount, int pageSize,
                                 String applicant, ApplyStatus applyStatus){
        return new ApplyFilter(pageCount,pageSize,applicant,applyStatus);
    }



}
