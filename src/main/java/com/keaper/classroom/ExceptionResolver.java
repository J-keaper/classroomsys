package com.keaper.classroom;

import com.keaper.classroom.common.JsonResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;

public class ExceptionResolver implements HandlerExceptionResolver {

    private static final Logger logger = LoggerFactory.getLogger(ExceptionResolver.class);

    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        ModelAndView mv = new ModelAndView();
        if(!(handler instanceof HandlerMethod)){
            return mv;
        }
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod();
        logger.error("{}:{} Exception",method.getDeclaringClass().getName(),method.getName(),ex);

        JsonResult result = JsonResult.getErrorResult(JsonResult.Result.ERROR,"发生异常!");
        try {
            response.setContentType("text/html; charset=UTF-8");
            response.getWriter().write(result.toString());
        } catch (IOException e) {
            logger.error("Write Response Exception",e);
        }
        return mv;
    }
}
