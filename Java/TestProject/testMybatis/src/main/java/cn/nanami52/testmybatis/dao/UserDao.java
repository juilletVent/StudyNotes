package cn.nanami52.testmybatis.dao;

import cn.nanami52.testmybatis.entity.User;
import cn.nanami52.testmybatis.mapper.UserMapper;
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
        sqlSession.close();
        return _user;
    }

    public List<User> getUsers(User user) {
        List<User> userList = getSession().selectList("userList");
        sqlSession.close();
        return userList;
    }

    public User update(User user) {
        int updateUser = getSession().update("updateUser", user);
        sqlSession.commit();
        sqlSession.close();
        if (updateUser > 0) {
            return getOnce(user);
        }
        return null;
    }

    public List<User> getListEx(User user) {
        SqlSession session = null;
        try {
            session = getSession();
            UserMapper mapper = session.getMapper(UserMapper.class);
            List<User> users = mapper.getUsersEx(user);
            return users;
        } finally {
            if (null != session) {
                session.close();
            }
        }
    }
}
