package cn.nanami52.message.dao;

import cn.nanami52.message.bean.Message;
import cn.nanami52.message.utils.ConnectUtils;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MessageDao {

    public List<Message> getMessage(int pageNo, int pageSize) {
        return this.getMessage(pageNo, pageSize, null);
    }

    public List<Message> getMessage(int pageNo, int pageSize, Long userId) {
        List<Message> data = new ArrayList<Message>();
        Connection connect = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        String sql = "select * from message " + ((null != userId) ? "where user_id = ?" : "") +
                " order by create_time desc limit ?,?;";
        try {
            int offset = null == userId ? 0 : 1;
            connect = ConnectUtils.getConnect();
            statement = connect.prepareStatement(sql);
            if (null != userId) {
                statement.setLong(offset, userId);
            }
            statement.setInt(offset + 1, (pageNo - 1) * pageSize);
            statement.setInt(offset + 2, pageSize);
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
        return this.getCount(null);
    }

    public int getCount(Long userId) {
        Connection connect = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        String sql = "select COUNT(*) as 'count'" + (null != userId ? "where user_id = ? " : "") +
                " from message;";
        try {
            connect = ConnectUtils.getConnect();
            statement = connect.prepareStatement(sql);
            if (null != userId) {
                statement.setLong(1, userId);
            }
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

    public boolean addMsg(Message msg) {
        Connection connect = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        String sql = "INSERT message(title,content,user_id,username,create_time) VALUES (?,?,?,?,?)";

        try {
            connect = ConnectUtils.getConnect();
            statement = connect.prepareStatement(sql);
            statement.setString(1, msg.getTitle());
            statement.setString(2, msg.getContent());
            statement.setLong(3, msg.getUserId());
            statement.setString(4, msg.getUsername());
            statement.setTimestamp(5, new Timestamp(System.currentTimeMillis()));
            int update = statement.executeUpdate();

            if (update > 0) {
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            cleanResource(connect, statement, resultSet);
        }
        return false;
    }
}
