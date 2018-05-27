package com.keaper.classroom.task;

import com.keaper.classroom.enums.ApplyStatus;
import com.keaper.classroom.modal.Apply;
import com.keaper.classroom.persistence.dao.ApplyDao;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class OverdueApplyTask {
    private static final Logger logger = LoggerFactory.getLogger(OverdueApplyTask.class);

    @Resource
    private ApplyDao applyDao;

    public void doTask() throws JobExecutionException {
        try{
            logger.info("[更新过期申请]定时任务开始...");
            List<Apply> applyList = applyDao.getOverdueApply();
            for(Apply apply : applyList){
                logger.info("申请ID：{} 已过期,需要更新为过期未审核",apply.getId());
                boolean result = applyDao.updateStatus(apply.getId(),ApplyStatus.OVERDUE.getCode()) > 0;
                logger.info("申请ID：{} 更新状态结果：{}",apply.getId(),result);
            }
            logger.info("[更新过期申请]定时任务结束...");
        }catch (Exception  e){
            logger.error("[更新过期申请]定时任务发生异常",e);
            JobExecutionException e2 = new JobExecutionException(e);
            e2.refireImmediately();
            throw e2;
        }
    }



}
