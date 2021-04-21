<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [C3P0 创建线程池](#c3p0-%E5%88%9B%E5%BB%BA%E7%BA%BF%E7%A8%8B%E6%B1%A0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## C3P0 创建线程池

需要引入C3P0相关的jar包


*有一个坑：数据库连接需要指定时区，也就是jdbcUrl后面需要添加`serverTimezone=GMT%2B8`*

样例代码：

~~~
package cn.nanami52.utils;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.junit.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class MysqlTest {

    @Test
    public void TestConn() {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();

        Connection conn = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
//            dataSource.setDriverClass("com.mysql.jdbc.Driver");
//            dataSource.setJdbcUrl("jdbc:mysql://127.0.0.1:3306/mysql?serverTimezone=GMT%2B8");
//            dataSource.setUser("root");
//            dataSource.setPassword("root");
//            dataSource.setInitialPoolSize(20);
            conn = dataSource.getConnection();
            String sql = "select * from user";
            statement = conn.prepareStatement(sql);
            resultSet = statement.executeQuery();

            while (resultSet.next()) {
                System.out.println(resultSet.getString("user") + " " + resultSet.getString("host"));
            }

            resultSet.close();
            statement.close();
            conn.close();


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

~~~

样例配置：

src目录下，文件名为`c3p0-config.xml`,具体可查询c3p0的文档说明

~~~
<?xml version="1.0" encoding="UTF-8"?>
<c3p0-config>
    <default-config>
        <property name="driverClass">com.mysql.jdbc.Driver</property>
        <property name="jdbcUrl">jdbc:mysql://127.0.0.1:3306/mysql?serverTimezone=GMT%2B8</property>
        <property name="user">root</property>
        <property name="password">root</property>
        <property name="initialPoolSize">5</property>
        <property name="maxPoolSize">20</property>
    </default-config>
</c3p0-config>
~~~