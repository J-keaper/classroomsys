package com.keaper.classroom.common;

import com.alibaba.fastjson.JSON;

import java.io.Serializable;

public class JsonResult<T> implements Serializable {
    private boolean ret ;

    private int code;

    private String msg;

    private T data;

    public static <T> JsonResult getCorrectResult(T data) {
        return new JsonResult<T>(true,0, Result.OK.name(), data);
    }

    public static <T> JsonResult getErrorResult(JsonResult.Result result, T data) {
        return new JsonResult<T>(false, result.code, result.name(), data);
    }

    public static <T> JsonResult getErrorResult(int errcode, String errmsg, T data) {
        return new JsonResult<T>(false, errcode, errmsg, data);
    }

    public JsonResult(boolean ret, int code, String msg, T data) {
        this.ret = ret;
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public boolean isRet() {
        return ret;
    }

    public JsonResult<T> setRet(boolean ret) {
        this.ret = ret;
        return this;
    }

    public int getCode() {
        return code;
    }

    public JsonResult<T> setCode(int code) {
        this.code = code;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public JsonResult<T> setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    public T getData() {
        return data;
    }

    public JsonResult<T> setData(T data) {
        this.data = data;
        return this;
    }

    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }

    public enum Result{
        OK(0,"成功"),

        PARAMETER_ERROR(1,"参数错误"),

        LOGIN_PASSWORD_WRONG(201,"密码错误"),
        LOGIN_CAPTCHA_DENIED(202,"验证未通过"),
        LOGIN_NO_USER(203,"用户不存在"),

        ERROR(-1,"错误");


        int  code;
        String text;

        Result(int code, String text) {
            this.code = code;
            this.text = text;
        }

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }

}
