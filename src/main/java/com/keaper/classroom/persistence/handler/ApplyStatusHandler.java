package com.keaper.classroom.persistence.handler;

import com.keaper.classroom.enums.ApplyStatus;
import com.keaper.classroom.modal.Apply;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.apache.ibatis.type.TypeHandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@MappedJdbcTypes(JdbcType.INTEGER)
@MappedTypes(ApplyStatus.class)
public class ApplyStatusHandler implements TypeHandler<ApplyStatus>{

    public void setParameter(PreparedStatement ps, int i, ApplyStatus parameter, JdbcType jdbcType) throws SQLException {
        ps.setInt(i,parameter.getCode());
    }

    public ApplyStatus getResult(ResultSet rs, String columnName) throws SQLException {
        return ApplyStatus.codeOf(rs.getInt(columnName));
    }

    public ApplyStatus getResult(ResultSet rs, int columnIndex) throws SQLException {
        return ApplyStatus.codeOf(rs.getInt(columnIndex));
    }

    public ApplyStatus getResult(CallableStatement cs, int columnIndex) throws SQLException {
        return ApplyStatus.codeOf(cs.getInt(columnIndex));
    }
}
