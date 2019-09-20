package cn.nanami52.message.dao;

import cn.nanami52.message.bean.User;
import cn.nanami52.message.utils.ConnectUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDao {

    public User login(String user, String pwd) {
        Connection connection = null;
        PreparedStatement statement;
        ResultSet resultSet = null;
        User userObj = null;
        try {
            connection = ConnectUtils.getConnect();
            String sql = "select * from user where username = ? and password = ?;";
            statement = connection.prepareStatement(sql);
            statement.setString(1, user);
            statement.setString(2, pwd);
            resultSet = statement.executeQuery();

            if (resultSet.next()) {
                userObj = new User();
                userObj.setId(resultSet.getLong("id"));
                userObj.setName(resultSet.getString("username"));
                userObj.setPassword(resultSet.getString("password"));
                userObj.setAddress(resultSet.getString("real_name"));
                userObj.setBirthday(resultSet.getDate("birthday"));
                userObj.setPhone(resultSet.getString("phone"));
                userObj.setRealName(resultSet.getString("address"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userObj;
    }

}
