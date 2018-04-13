package com.keaper.classroom.modal.filter;

import com.keaper.classroom.enums.UserType;

public class UserFilter extends CommonFilter{
    private UserType type;

    private String keyWord;

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
    }

    public String getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
    }

    private UserFilter(UserType type, String keyWord,int pageCount,int pageSize) {
        super(pageCount, pageSize);
        this.type = type;
        this.keyWord = keyWord;
    }

    public static UserFilter of(UserType type, String keyWord,
                                int pageCount,int pageSize){
        return new UserFilter(type,keyWord,pageCount,pageSize);
    }

    public static UserFilter of(int pageCount,int pageSize){
        return new UserFilter(null,null,pageCount,pageSize);
    }

}
