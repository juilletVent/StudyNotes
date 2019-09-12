package cn.nanami52.message.dao;

import cn.nanami52.message.bean.Message;
import cn.nanami52.message.utils.ConnectUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MessageDao {

    public List<Message> getMessage(int pageNo, int pageSize) {
        List<Message> data = new ArrayList<Message>();
        Connection connect = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        String sql = "select * from message order by create_time desc limit ?,?;";
        try {
            connect = ConnectUtils.getConnect();
            statement = connect.prepareStatement(sql);
            statement.setInt(1, (pageNo - 1) * pageSize);
            statement.setInt(2, pageSize);
            resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Message message = new Message(
                        resultSet.getLong("id"),
                        resultSet.getLong("user_id"),
                        resultSet.getString("username"),
                        resultSet.getString("title"),
                        resultSet.getString("content"),
                        resultSet.getTimestamp("create_time")
                );
                data.add(message);
            }
            return data;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            cleanResource(connect, statement, resultSet);
        }
        return data;
    }

    public int getCount() {
        Connection connect = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        String sql = "select COUNT(*) as 'count' from message;";
        try {
            connect = ConnectUtils.getConnect();
            statement = connect.prepareStatement(sql);
            resultSet = statement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getInt("count");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            cleanResource(connect, statement, resultSet);
        }
        return 0;
    }

    private void cleanResource(Connection connect, PreparedStatement statement, ResultSet resultSet) {
        try {
            if (null != resultSet) {
                resultSet.close();
            }
            if (null != statement) {
                statement.close();
            }
            if (null != connect) {
                connect.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
