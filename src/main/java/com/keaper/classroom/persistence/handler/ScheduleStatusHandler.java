package com.keaper.classroom.persistence.handler;

import com.keaper.classroom.enums.ScheduleStatus;
import com.keaper.classroom.modal.Schedule;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ScheduleStatusHandler implements TypeHandler<ScheduleStatus> {
    public void setParameter(PreparedStatement ps, int i, ScheduleStatus parameter, JdbcType jdbcType) throws SQLException {
        ps.setInt(i,parameter.getCode());
    }

    public ScheduleStatus getResult(ResultSet rs, String columnName) throws SQLException {
        return ScheduleStatus.codeOf(rs.getInt(columnName));
    }

    public ScheduleStatus getResult(ResultSet rs, int columnIndex) throws SQLException {
        return ScheduleStatus.codeOf(rs.getInt(columnIndex));
    }

    public ScheduleStatus getResult(CallableStatement cs, int columnIndex) throws SQLException {
        return ScheduleStatus.codeOf(cs.getInt(columnIndex));
    }
}
