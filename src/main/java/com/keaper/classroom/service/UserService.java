package com.keaper.classroom.service;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.keaper.classroom.enums.UserType;
import com.keaper.classroom.modal.User;
import com.keaper.classroom.modal.filter.UserFilter;
import com.keaper.classroom.persistence.dao.UserDao;
import com.keaper.classroom.utils.EncryptUtil;
import com.keaper.classroom.utils.TokenUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class UserService {


    @Resource
    private UserDao userDao;


    public User getUserInfoByAccount(String account){
        return userDao.selectUserByAccount(account);
    }

    public User selectUserByEmail(String email){
        return userDao.selectUserByEmail(email);
    }
    public String buildResetPasswordUrl(HttpServletRequest request,User user){
        if(user == null){
            return null;
        }
        String token = TokenUtil.generateToken(user);
        String host = "http://" + request.getServerName() + ":" +
                request.getServerPort();
        return host + "/pass/reset?t=" + token;
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

    public int getUserCount(UserFilter userFilter){
        return userDao.countUserList(userFilter.getType() != null ? userFilter.getType().getCode() :null,
                userFilter.getKeyWord());
    }

    public boolean batchImportUser (String userListJson) {
        List<User> userList = parseUserList(userListJson);
        return userDao.batchAddUser(userList) > 0;
    }


    public List<User> parseUserList(String userListJson){
        List<User> userList = Lists.newArrayList();
        JSONArray ja = JSON.parseArray(userListJson);
        for(Object o : ja){
            User user = new User();
            JSONObject jo = (JSONObject)o;
            user.setAccount(jo.getString("account"));
            user.setName(jo.getString("name"));
            user.setPassword(EncryptUtil.EncryptPassword(user.getAccount(),user.getAccount()));
            user.setPhone(jo.getString("phone"));
            user.setEmail(jo.getString("email"));
            user.setType(UserType.codeOf(jo.getJSONObject("type").getInteger("code")));
            userList.add(user);
        }
        return userList;
    }


    public boolean updateUser(String account, String phone, String email, String password){
        return userDao.updateUser(account,phone,email,
                StringUtils.isEmpty(password) ? null :
                        EncryptUtil.EncryptPassword(account,password)) > 0;
    }

    public boolean weatherWaitReset(String account){
        return userDao.getWaitPassword(account) == 1;
    }

    public boolean setWaitReset(String account){
        return userDao.setWaitPassword(account,1) > 0;
    }

    public boolean clearWaitReset(String account){
        return userDao.setWaitPassword(account,0) > 0;
    }

}
