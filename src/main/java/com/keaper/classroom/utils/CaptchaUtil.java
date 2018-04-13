package com.keaper.classroom.utils;

import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.afs.model.v20180112.AuthenticateSigRequest;
import com.aliyuncs.afs.model.v20180112.AuthenticateSigResponse;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.profile.IClientProfile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;

public class CaptchaUtil {

    private static final Logger logger = LoggerFactory.getLogger(CaptchaUtil.class);

    private static final String ACCESS_KEY = "LTAIzplJ820jn9Sv";
    private static final String ACCESS_SECRET = "b3zHe2fY3s0l0Nhtt11Ax36AnHvdXI";
    private static IAcsClient client;

    static {
        IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", ACCESS_KEY, ACCESS_SECRET);
        client = new DefaultAcsClient(profile);
        try {
            DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", "afs", "afs.aliyuncs.com");
        } catch (ClientException e) {
            logger.error("验证码服务初始化失败！",e);
        }
    }

    public static boolean validate(HttpServletRequest httpServletRequest){
        AuthenticateSigRequest request = new AuthenticateSigRequest();
        request.setSessionId(httpServletRequest.getParameter("csessionid"));
        request.setSig(httpServletRequest.getParameter("sig"));
        request.setToken(httpServletRequest.getParameter("token"));
        request.setScene(httpServletRequest.getParameter("scene"));

        request.setAppKey("FFFF0N00000000005B69");
        request.setRemoteIp(httpServletRequest.getRemoteAddr());
        try {
            //response的code枚举：100验签通过，900验签失败
            AuthenticateSigResponse response = client.getAcsResponse(request);
            if(response.getCode() == 100){
                return true;
            }
            return false;
        } catch (Exception e) {
            logger.error("验证码服务出错！",e);
            return false;
        }
    }
}
