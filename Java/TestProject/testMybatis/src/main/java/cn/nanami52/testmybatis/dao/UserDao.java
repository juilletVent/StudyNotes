package cn.nanami52.testmybatis.dao;

import cn.nanami52.testmybatis.entity.User;
import cn.nanami52.testmybatis.utils.SqlSessionFactoryUtils;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

public class UserDao {

    private SqlSession sqlSession = null;

    private SqlSession getSession() {
        sqlSession = SqlSessionFactoryUtils.getSqlSessionFactory().openSession();
        return sqlSession;
    }

    public User getOnce(User user) {
        User _user = (User) getSession().selectOne("userList", user);
        return _user;
    }

    public List<User> getUsers(User user) {
        List<User> userList = getSession().selectList("userList");
        return userList;
    }

    public User update(User user) {
        int updateUser = getSession().update("updateUser", user);
        sqlSession.commit();
        if (updateUser > 0) {
            return getOnce(user);
        }
        return null;
    }
}
