package com.keaper.classroom.persistence.handler;

import com.keaper.classroom.enums.UserType;
import com.keaper.classroom.modal.User;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;

import java.sql.*;

@MappedJdbcTypes(JdbcType.INTEGER)
@MappedTypes(UserType.class)
public class UserTypeHandler implements TypeHandler<UserType>{
    public void setParameter(PreparedStatement ps, int i, UserType parameter, JdbcType jdbcType) throws SQLException {
        ps.setInt(i,parameter.getCode());
    }

    public UserType getResult(ResultSet rs, String columnName) throws SQLException {
        return UserType.codeOf(rs.getInt(columnName));
    }

    public UserType getResult(ResultSet rs, int columnIndex) throws SQLException {
        return UserType.codeOf(rs.getInt(columnIndex));
    }

    public UserType getResult(CallableStatement cs, int columnIndex) throws SQLException {
        return UserType.codeOf(cs.getInt(columnIndex));
    }

}
