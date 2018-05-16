package com.keaper.classroom.utils;

import com.google.common.collect.Maps;
import com.keaper.classroom.modal.User;
import io.jsonwebtoken.*;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;
import java.util.Map;

public class TokenUtil {
    static private Logger logger = LoggerFactory.getLogger(TokenUtil.class);

    static private final int EXPIRE_MINUTES = 30;

    static private SecretKey generateKey(){
        String key = ConfigUtil.getProperty("secret_key");
        byte[] encodedKey = Base64.decodeBase64(key);
        return new SecretKeySpec(encodedKey,"AES");
    }

    static public String generateToken(User user){
        Map<String,Object> claims = Maps.newHashMap();
        claims.put("id",String.valueOf(user.getId()));
        claims.put("account",user.getAccount());
        claims.put("name",user.getName());
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(DateUtils.addMinutes(now,EXPIRE_MINUTES))
                .signWith(SignatureAlgorithm.HS256, generateKey())
                .compact();
    }

    static public String refreshToken(Claims claims){
        Date now = new Date();
        claims.setExpiration(DateUtils.addMinutes(now,EXPIRE_MINUTES));
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, generateKey())
                .compact();
    }

    static public Claims parseToken(String compactJws ){
        try {
            return Jwts.parser().setSigningKey(ConfigUtil.getProperty("secret_key"))
                    .parseClaimsJws(compactJws).getBody();
            //OK, we can trust this JWT
        } catch (SignatureException e) {
            //don't trust the JWT!
            logger.error("签名验证错误！",e);
            throw e;
        } catch (ExpiredJwtException e){
            logger.error("签名过期！",e);
            throw e;
        }
    }

}
