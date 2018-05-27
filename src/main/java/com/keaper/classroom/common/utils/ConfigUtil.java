package com.keaper.classroom.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Properties;

public class ConfigUtil {
    static private Logger logger = LoggerFactory.getLogger(ConfigUtil.class);

    static private Properties PROPERTIES = new Properties();

    static {
        try {
            // 加载配置文件
            PROPERTIES.load(TokenUtil.class.getClassLoader().getResourceAsStream("config.properties"));
        } catch (IOException e) {
            logger.error("加载配置文件错误！");
        }
    }

    static public String getProperty(String key){
        return PROPERTIES.getProperty(key);
    }

}
