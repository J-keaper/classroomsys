package com.keaper.classroom.service;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.keaper.classroom.enums.ClassroomStatus;
import com.keaper.classroom.modal.Classroom;
import com.keaper.classroom.modal.filter.ClassroomFilter;
import com.keaper.classroom.persistence.dao.ClassroomDao;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ClassroomService {


    @Resource
    private ClassroomDao classroomDao;


    public List<Classroom> getClassroomList(int pageCount,int pageSize){
        return getClassroomList(ClassroomFilter.of(pageCount,pageSize));
    }


    public List<Classroom> getClassroomList(ClassroomFilter filter){
        int offset = (filter.getPageCount()-1)*filter.getPageSize();
        if(offset < 0){
            offset = 0;
        }
        return classroomDao.getClassroomList(filter.getCampus(),filter.getBuilding(),
                filter.getStatus() == null ?  null :filter.getStatus().getCode(),
                filter.getNumber(), offset, filter.getPageSize());
    }

    public int getClassroomCount(ClassroomFilter filter){
        return classroomDao.countClassroomList(filter.getCampus(),filter.getBuilding(),
                filter.getStatus() == null ?  null :filter.getStatus().getCode(),
                filter.getNumber());

    }


    public boolean batchImportUser (String classroomListJson){
        List<Classroom> classroomList = parseClassroomList(classroomListJson);
        return classroomDao.batchAddClassroom(classroomList) > 0;
    }

    public List<Classroom> parseClassroomList(String classroomListJson){
        List<Classroom> classroomList = Lists.newArrayList();
        JSONArray ja = JSON.parseArray(classroomListJson);
        for(Object o : ja){
            JSONObject jo = (JSONObject) o;
            Classroom classroom = new Classroom();
            classroom.setCampus(jo.getString("campus"));
            classroom.setBuilding(jo.getString("building"));
            classroom.setNumber(jo.getString("number"));
            classroom.setSeating(jo.getInteger("seating"));
            classroom.setStatus(ClassroomStatus.FREE);
            classroomList.add(classroom);
        }
        return classroomList;
    }




}
