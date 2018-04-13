package com.keaper.classroom.persistence.handler;

import com.keaper.classroom.enums.ClassroomStatus;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@MappedJdbcTypes(JdbcType.INTEGER)
@MappedTypes(ClassroomStatus.class)
public class ClassroomStatusHandler implements TypeHandler<ClassroomStatus>{
    public void setParameter(PreparedStatement ps, int i, ClassroomStatus parameter, JdbcType jdbcType) throws SQLException {
        ps.setInt(i,parameter.getCode());
    }

    public ClassroomStatus getResult(ResultSet rs, String columnName) throws SQLException {
        return ClassroomStatus.codeOf(rs.getInt(columnName));
    }

    public ClassroomStatus getResult(ResultSet rs, int columnIndex) throws SQLException {
        return ClassroomStatus.codeOf(rs.getInt(columnIndex));
    }

    public ClassroomStatus getResult(CallableStatement cs, int columnIndex) throws SQLException {
        return ClassroomStatus.codeOf(cs.getInt(columnIndex));
    }
}
