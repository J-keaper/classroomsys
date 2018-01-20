package com.keaper.persistence.dao;


import org.springframework.stereotype.Repository;

@Repository
public interface UserDao {

    String selectUserNameById(int id);

}
