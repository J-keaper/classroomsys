package com.keaper.classroom.task;

import com.keaper.SpringBaseTest;
import org.junit.Test;
import org.quartz.JobExecutionException;

import javax.annotation.Resource;

import static org.junit.Assert.*;

public class OverdueApplyTaskTest extends SpringBaseTest {

    @Resource
    private OverdueApplyTask overdueApplyTask;

    @Test
    public void doTask() throws JobExecutionException {
        overdueApplyTask.doTask();
    }
}