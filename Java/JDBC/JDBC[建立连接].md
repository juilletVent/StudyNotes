<!--
 * @Author: WeiHong Ran
 * @Date: 2019-09-03 23:48:32
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-09-05 22:40:19
 * @Description: Nothing
 -->
## 建立连接

```
public class TestMysql {

    @Test
    public void testConnect() {
        try {
            在DriverManager内部的静态代码块内本身就有驱动注册代码，所以只需要加载DriverManage类即可完成驱动注册
            // DriverManager.registerDriver(new Driver());
            Class.forName("com.mysql.jdbc.Driver")
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/mysql?characterEncoding=UTF-8&amp;characterSetResults=UTF-8&amp;zeroDateTimeBehavior=convertToNull", "root", "");
            String sql = "select * from user";
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()) {
                System.out.println(resultSet.getString("host"));
//                System.out.println(resultSet.getString("user"));
            }
            resultSet.close();
            statement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
```

**敲黑板：**getConnection获取连接的时候一定要指定字符集时区配置，不然会出现问题：

	?characterEncoding=UTF-8&amp;characterSetResults=UTF-8&amp;zeroDateTimeBehavior=convertToNull

加到连接uri后面，mybatis配置是同样有这个问题，因为都是使用的mysql-connector驱动的


## statement中的api

- executeQuery 用于查询，返回查询结果集
- executeUpdate 用于执行更新、插入、删除类型的语句，返回影响的行数

## prepareStatement

一般使用这个api对sql进行预编译谈后参数化执行sql，避免sql注入的问题

~~~
PrepareStatement st = conn.prepareStatement(sql);
# 下标从1开始
st.setString(1,"user");
st.executeUpdate()
~~~