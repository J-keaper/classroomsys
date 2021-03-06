package com.keaper.classroom.persistence.dao;


import com.keaper.classroom.modal.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao {

    User selectUserByAccount(@Param("account") String account);

    User selectUserByEmail(@Param("email") String email);

    User selectUserById(@Param("id") long id);

    /**
     * @param type may be null
     * @param key may be null
     * @param offset can not be null
     * @param limit can not be null
     * @return
     */
    List<User> selectUserList(@Param("type") Integer type, @Param("key") String key,
                              @Param("offset") int offset, @Param("limit") int limit);


    int countUserList(@Param("type") Integer type, @Param("key") String key);

    int batchAddUser(@Param("userList") List<User> userList);

    /**
     * phone,email,password at least one is not null
     * @param account can not be null
     * @return
     */
    int updateUser(@Param("account")String account,@Param("phone")String phone,
                   @Param("email") String email,@Param("password")String password);


    /**
     * 设置重置密码标志位
     * @param account
     * @return
     */
    int setWaitPassword(@Param("account") String account,@Param("flag")int flag);

    int getWaitPassword(@Param("account") String account);

}
