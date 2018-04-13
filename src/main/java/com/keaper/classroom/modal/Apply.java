package com.keaper.classroom.modal;

import com.keaper.classroom.enums.ApplyPurpose;
import com.keaper.classroom.enums.ApplyStatus;

import java.util.Date;

public class Apply {
    private long id;

    /**
     * 申请人ID
     */
    private long applicantId;

    private ApplyPurpose applyPurpose;

    private String applyReason;

    private int capacity;

    private Date startTime;

    private Date endTime;

    private Date createTime;

    private ApplyStatus status;

    /**
     * 审核人Id
     */
    private Long auditorId;

    private Date auditTime;

    private String auditResult;

    private String classroom;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getApplicantId() {
        return applicantId;
    }

    public void setApplicantId(long applicantId) {
        this.applicantId = applicantId;
    }

    public ApplyPurpose getApplyPurpose() {
        return applyPurpose;
    }

    public void setApplyPurpose(ApplyPurpose applyPurpose) {
        this.applyPurpose = applyPurpose;
    }

    public String getApplyReason() {
        return applyReason;
    }

    public void setApplyReason(String applyReason) {
        this.applyReason = applyReason;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public ApplyStatus getStatus() {
        return status;
    }

    public void setStatus(ApplyStatus status) {
        this.status = status;
    }

    public Long getAuditorId() {
        return auditorId;
    }

    public void setAuditorId(Long auditorId) {
        this.auditorId = auditorId;
    }

    public Date getAuditTime() {
        return auditTime;
    }

    public void setAuditTime(Date auditTime) {
        this.auditTime = auditTime;
    }

    public String getAuditResult() {
        return auditResult;
    }

    public void setAuditResult(String auditResult) {
        this.auditResult = auditResult;
    }

    public String getClassroom() {
        return classroom;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    public Apply() {
    }

    public Apply(Apply apply) {
        this.id = apply.id;
        this.applicantId = apply.applicantId;
        this.applyPurpose = apply.applyPurpose;
        this.applyReason = apply.applyReason;
        this.capacity = apply.capacity;
        this.startTime = apply.startTime;
        this.endTime = apply.endTime;
        this.createTime = apply.createTime;
        this.status = apply.status;
        this.auditorId = apply.auditorId;
        this.auditTime = apply.auditTime;
        this.auditResult = apply.auditResult;
        this.classroom = apply.classroom;
    }
}
