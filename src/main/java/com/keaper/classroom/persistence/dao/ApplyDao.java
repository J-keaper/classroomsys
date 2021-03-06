package com.keaper.classroom.persistence.dao;

import com.keaper.classroom.modal.Apply;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ApplyDao {

    List<Apply> getApplyList(@Param("applicant") String applicant,
                             @Param("status") Integer status,
                             @Param("offset") int offset,
                             @Param("limit") int limit);

    List<Apply> getApplyByUser(@Param("applicantId") long applicantId);

    int countApplyList(@Param("applicant") String applicant,
                       @Param("status") Integer status);

    Apply getApplyById(@Param("id")long id);

    int addApply(@Param("applicantId") long applicantId,
                 @Param("applyPurpose") int applyPurpose,
                 @Param("applyReason") String applyReason,
                 @Param("capacity") int applyCapacity,
                 @Param("startTime") Date startTime,
                 @Param("endTime") Date endTime,
                 @Param("status") int status);

    int updateAuditInfo(@Param("id")long id,
                        @Param("auditorId")long auditorId,
                        @Param("status") int status,
                        @Param("result") String result,
                        @Param("classroom") String classroom);

    List<Apply> getOverdueApply();

    int updateStatus(@Param("id")long id,@Param("status")int status);

    /**
     * 获取教室当前活动详情
     * @param classroom
     * @return
     */
    Apply getApplyByClassroom(@Param("classroom") String classroom);

}
