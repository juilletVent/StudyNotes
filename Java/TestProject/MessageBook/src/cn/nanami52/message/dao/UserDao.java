package cn.nanami52.message.dao;

import cn.nanami52.message.bean.User;
import cn.nanami52.message.utils.ConnectUtils;

import java.sql.*;

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

    public boolean update(User user) {
        Connection connection = null;
        PreparedStatement statement;
        ResultSet resultSet = null;
        User userObj = null;
        try {
            connection = ConnectUtils.getConnect();
            String sql = "UPDATE user SET real_name = ? , phone = ? , password = ? , birthday = ? , address = ? where id = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, user.getRealName());
            statement.setString(2, user.getPhone());
            statement.setString(3, user.getPassword());
            statement.setDate(4, new Date(user.getBirthday().getTime()));
            statement.setString(5, user.getAddress());
            statement.setLong(6, user.getId());
            int update = statement.executeUpdate();

            if (update > 0) {
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public User getUser(long id) {
        Connection connection = null;
        PreparedStatement statement;
        ResultSet resultSet = null;
        User userObj = null;
        try {
            connection = ConnectUtils.getConnect();
            String sql = "select * from user where id = ?";
            statement = connection.prepareStatement(sql);
            statement.setLong(1, id);
            resultSet = statement.executeQuery();

            if (resultSet.next()) {
                userObj = new User();
                userObj.setId(resultSet.getLong("id"));
                userObj.setName(resultSet.getString("username"));
                userObj.setPassword(resultSet.getString("password"));
                userObj.setAddress(resultSet.getString("address"));
                userObj.setBirthday(resultSet.getDate("birthday"));
                userObj.setPhone(resultSet.getString("phone"));
                userObj.setRealName(resultSet.getString("real_name"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userObj;
    }
}
