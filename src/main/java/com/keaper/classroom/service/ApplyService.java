package com.keaper.classroom.service;


import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.keaper.classroom.enums.ApplyStatus;
import com.keaper.classroom.enums.ClassroomStatus;
import com.keaper.classroom.enums.ScheduleStatus;
import com.keaper.classroom.modal.Apply;
import com.keaper.classroom.modal.ApplyInfo;
import com.keaper.classroom.modal.filter.ApplyFilter;
import com.keaper.classroom.persistence.dao.ApplyDao;
import com.keaper.classroom.persistence.dao.ClassroomDao;
import com.keaper.classroom.persistence.dao.ScheduleDao;
import com.keaper.classroom.persistence.dao.UserDao;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Service
public class ApplyService {


    @Resource
    private ApplyDao applyDao;

    @Resource
    private UserDao userDao;

    @Resource
    private ClassroomDao classroomDao;

    @Resource
    private ScheduleDao scheduleDao;

    public List<ApplyInfo> getApplyList(int pageCount,int pageSize){
        return getApplyList(ApplyFilter.of(pageCount,pageSize));
    }

    public List<ApplyInfo> getApplyList(ApplyFilter filter){
        int offset = (filter.getPageCount()-1)*filter.getPageSize();
        if(offset < 0){
            offset = 0;
        }
        List<Apply> applyList = applyDao.getApplyList(filter.getApplicant(),
                filter.getApplyStatus() == null ? null : filter.getApplyStatus().getCode(),
                offset,filter.getPageSize());
        return Lists.transform(applyList, new Function<Apply, ApplyInfo>() {
            public ApplyInfo apply(Apply apply) {
                return apply2ApplyInfo(apply);
            }
        });
    }

    public List<ApplyInfo> getApplyListByUser(long userId){
        List<Apply> applyList = applyDao.getApplyByUser(userId);
        return Lists.transform(applyList, new Function<Apply, ApplyInfo>() {
            public ApplyInfo apply(Apply apply) {
                return apply2ApplyInfo(apply);
            }
        });
    }

    public int getApplyCount(ApplyFilter filter){
        return applyDao.countApplyList(filter.getApplicant(),
                filter.getApplyStatus() == null ? null : filter.getApplyStatus().getCode());
    }

    public ApplyInfo getApplyById(long id){
        return apply2ApplyInfo(applyDao.getApplyById(id));
    }

    public boolean addApply(long applicantId, int applyPurpose, String applyReason,
                            int applyCapacity, Date startTime, Date endTime) throws ParseException {
        return applyDao.addApply(applicantId,applyPurpose,applyReason, applyCapacity,
                startTime,endTime, ApplyStatus.PENDING.getCode()) > 0;
    }


    @Transactional
    public boolean auditApply(long id,long auditorId,boolean pass,String opinion,String classroom){
        ApplyStatus status = pass ? ApplyStatus.PASSED : ApplyStatus.DENIED;
        if(status == ApplyStatus.DENIED){
            return applyDao.updateAuditInfo(id,auditorId,status.getCode(),opinion,classroom) > 0;
        }
        Apply apply = applyDao.getApplyById(id);
        return  scheduleDao.addSchedule(classroom,apply.getStartTime(),
                apply.getEndTime(),ScheduleStatus.PENDING.getCode(), ClassroomStatus.ACTIVITY)> 0 &&
                applyDao.updateAuditInfo(id,auditorId,status.getCode(),opinion,classroom) > 0;
    }


    private ApplyInfo apply2ApplyInfo(Apply apply){
        ApplyInfo applyInfo = new ApplyInfo(apply);
        applyInfo.setApplicant(userDao.selectUserById(apply.getApplicantId()));
        if(apply.getAuditorId() != null){
            applyInfo.setAuditor(userDao.selectUserById(apply.getAuditorId()));
        }
        if(apply.getClassroom() != null){
            applyInfo.setAuditClassroom(classroomDao.selectClassroomByNumber(apply.getClassroom()));
        }
        return applyInfo;
    }

    public List<String> getCanApplyClassroomList(long applyId){
        Apply apply = applyDao.getApplyById(applyId);
        return classroomDao.getCanApplyClassroom(apply.getStartTime(),apply.getEndTime(),apply.getCapacity());
    }

}
