<!--
 * @Author: WeiHong Ran
 * @Date: 2019-09-03 23:48:32
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-09-03 23:49:50
 * @Description: Nothing
 -->
## 建立连接

```
public class TestMysql {

    @Test
    public void testConnect() {
        try {
            DriverManager.registerDriver(new Driver());
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/mysql", "root", "");
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
