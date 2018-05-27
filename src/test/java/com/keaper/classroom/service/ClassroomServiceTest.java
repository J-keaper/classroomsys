package com.keaper.classroom.service;

import com.keaper.SpringBaseTest;
import org.junit.Test;

import javax.annotation.Resource;

import java.text.ParseException;

import static org.junit.Assert.*;

public class ClassroomServiceTest extends SpringBaseTest {

    @Resource
    private ClassroomService classroomService;

    @Test
    public void addSchedule() throws ParseException {
        classroomService.addSchedule("[\"11102\", \"11104\"]","2018-05-20 16:42",
                "2018-05-20 18:42","2");
    }
}