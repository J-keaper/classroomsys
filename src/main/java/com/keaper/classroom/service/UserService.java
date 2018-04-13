package com.keaper.classroom.service;


import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.keaper.classroom.modal.User;
import com.keaper.classroom.modal.filter.UserFilter;
import com.keaper.classroom.persistence.dao.UserDao;
import com.keaper.classroom.utils.EncryptUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserService {

    @Resource
    private UserDao userDao;


    public User getUserInfoByAccount(String account){
        return userDao.selectUserByAccount(account);
    }


    /**
     * validate password
     * @param account
     * @param password
     * @return
     */
    public boolean validatePassword(String account,String password,String rightPassword){
        String encryptedPassword = EncryptUtil.EncryptPassword(account,password);
        return StringUtils.equals(encryptedPassword,rightPassword);
    }


    /**
     * Notice: not include password field
     * @param pageCount
     * @param pageSize
     * @return
     */
    public List<User> getUserList(int pageCount,int pageSize){
        List<User> userList = getUserList(UserFilter.of(pageCount,pageSize));
        return Lists.transform(userList, new Function<User, User>() {
            public User apply(User user) {
                user.setPassword(null);
                return user;
            }
        });
    }

    public List<User> getUserList(UserFilter userFilter){
        int offset = (userFilter.getPageCount()-1)*userFilter.getPageSize();
        if(offset < 0){
            offset = 0;
        }
        return userDao.selectUserList(userFilter.getType() != null ? userFilter.getType().getCode() :null,
                userFilter.getKeyWord(), offset, userFilter.getPageSize());
    }



    public boolean updateUser(String account, String phone, String email, String password){
        return userDao.updateUser(account,phone,email,
                EncryptUtil.EncryptPassword(account,password)) > 0;
    }

}
