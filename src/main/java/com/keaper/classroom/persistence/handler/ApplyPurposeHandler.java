package com.keaper.classroom.persistence.handler;

import com.keaper.classroom.enums.ApplyPurpose;
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
@MappedTypes(ApplyPurpose.class)
public class ApplyPurposeHandler implements TypeHandler<ApplyPurpose>{
    public void setParameter(PreparedStatement ps, int i, ApplyPurpose parameter, JdbcType jdbcType) throws SQLException {
        ps.setInt(i,parameter.getCode());
    }

    public ApplyPurpose getResult(ResultSet rs, String columnName) throws SQLException {
        return ApplyPurpose.codeOf(rs.getInt(columnName));
    }

    public ApplyPurpose getResult(ResultSet rs, int columnIndex) throws SQLException {
        return ApplyPurpose.codeOf(rs.getInt(columnIndex));
    }

    public ApplyPurpose getResult(CallableStatement cs, int columnIndex) throws SQLException {
        return ApplyPurpose.codeOf(cs.getInt(columnIndex));
    }
}
