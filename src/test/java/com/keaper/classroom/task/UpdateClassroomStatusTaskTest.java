package com.keaper.classroom.task;

import com.keaper.SpringBaseTest;
import org.junit.Test;
import org.quartz.JobExecutionException;

import javax.annotation.Resource;

import static org.junit.Assert.*;

public class UpdateClassroomStatusTaskTest extends SpringBaseTest{

    @Resource
    private UpdateClassroomStatusTask updateClassroomStatusTask;

    @Test
    public void doTask() throws JobExecutionException {
        updateClassroomStatusTask.doTask();
    }
}