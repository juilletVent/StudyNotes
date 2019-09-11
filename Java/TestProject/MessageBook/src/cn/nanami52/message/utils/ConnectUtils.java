package cn.nanami52.message.utils;

import com.mchange.v2.c3p0.ComboPooledDataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class ConnectUtils {

    private static ComboPooledDataSource dataSource = null;

    static {
        ConnectUtils.dataSource = new ComboPooledDataSource();
    }

    /**
     * 获取数据库连接
     * @return
     * @throws SQLException
     */
    public static Connection getConnect() throws SQLException {
        return ConnectUtils.dataSource.getConnection();
    }

}
