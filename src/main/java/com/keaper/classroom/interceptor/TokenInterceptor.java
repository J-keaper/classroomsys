package com.keaper.classroom.interceptor;

import com.keaper.classroom.annotation.TokenValidate;
import com.keaper.classroom.common.utils.TokenUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

public class TokenInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(TokenInterceptor.class);


    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(!(handler instanceof HandlerMethod)){
            return true;
        }
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod();
        /**
         * 注解的类或方法需要校验
         */
        if(method.getDeclaringClass().getAnnotation(TokenValidate.class) == null &&
                method.getAnnotation(TokenValidate.class) == null){
            return true;
        }

        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ServletException("Missing or invalid Authorization header.");
        }
        final String token = authHeader.substring(7);
        try {
            Claims claims = TokenUtil.parseToken(token);
            logger.info("token : {} 校验成功，Claims:{}",token,claims);

            String newToken = TokenUtil.refreshToken(claims);
            response.setHeader("token",newToken);
            logger.info("token : {} 刷新，新token : {}",token, newToken);

            request.setAttribute("claims", claims);
            return true;
        }catch (ExpiredJwtException e) {
            logger.error("token : {} 已过期！",token,e);
            response.setStatus(401);
            return false;
        } catch (SignatureException e) {
            logger.error("token : {} 校验失败！",token,e);
            response.setStatus(401);
            return false;
        }
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    }
}
