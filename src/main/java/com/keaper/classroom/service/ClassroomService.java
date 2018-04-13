package com.keaper.classroom.service;


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
        return classroomDao.getClassroomList(filter.getBuilding(), filter.getCampus(),
                filter.getStatus() == null ?  null :filter.getStatus().getCode(),
                filter.getNumber(), offset, filter.getPageSize());
    }


}
