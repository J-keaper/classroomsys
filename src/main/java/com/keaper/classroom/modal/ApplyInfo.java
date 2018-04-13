package com.keaper.classroom.modal;



public class ApplyInfo extends Apply{

    private User applicant;

    private User auditor;

    private Classroom auditClassroom;


    public User getApplicant() {
        return applicant;
    }

    public void setApplicant(User applicant) {
        this.applicant = applicant;
    }

    public User getAuditor() {
        return auditor;
    }

    public void setAuditor(User auditor) {
        this.auditor = auditor;
    }

    public Classroom getAuditClassroom() {
        return auditClassroom;
    }

    public void setAuditClassroom(Classroom auditClassroom) {
        this.auditClassroom = auditClassroom;
    }

    public ApplyInfo(Apply apply) {
        super(apply);
    }



}
