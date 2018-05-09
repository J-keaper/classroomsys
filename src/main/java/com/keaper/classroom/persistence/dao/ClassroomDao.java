package com.keaper.classroom.persistence.dao;

import com.keaper.classroom.enums.ClassroomStatus;
import com.keaper.classroom.modal.Classroom;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassroomDao {


    Classroom selectClassroomByNumber(@Param("number") String number);


    List<String> getCampusList();

    List<String> getBuildingList();


    /**
     *
     * @param number 模糊查询
     * @return
     */
    List<Classroom> getClassroomList(@Param("campus") String campus,
                                     @Param("building") String building,
                                     @Param("status") Integer status,
                                     @Param("number") String number,
                                     @Param("offset") int offset,
                                     @Param("limit") int limit);

    int countClassroomList(@Param("campus") String campus,
                           @Param("building") String building,
                           @Param("status") Integer status,
                           @Param("number") String number);


    int batchAddClassroom(@Param("classroomList") List<Classroom> classroomList);

    /**
     * @param classroom 教室号
     * @return
     */
    int updateStatus(@Param("classroom")String classroom,@Param("status")int status);

}
