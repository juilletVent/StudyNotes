package cn.nanami52.message.service;

import cn.nanami52.message.bean.User;
import cn.nanami52.message.dao.UserDao;

public class UserService {

    private UserDao userDao;

    public UserService() {
        userDao = new UserDao();
    }

    public User login(String user, String pwd) {
        return userDao.login(user, pwd);
    }

    public boolean update(User user) {
        return userDao.update(user);
    }

    public User getUser(long id) {
        return userDao.getUser(id);
    }
}
