package cn.nanami52.testmybatis.service;

import cn.nanami52.testmybatis.dao.UserDao;
import cn.nanami52.testmybatis.entity.User;

import java.util.List;

public class UserService {

    private UserDao userDao = null;


    public UserService() {
        this.userDao = new UserDao();
    }

    public List<User> getUsers() {
        return getUsers(null);
    }

    public List<User> getUsers(User user) {
        return this.userDao.getUsers(user);
    }

    public User getUser() {
        return getUser(null);
    }

    public User getUser(User user) {
        return this.userDao.getOnce(user);
    }

    public User update(User user) {
        return this.userDao.update(user);
    }

    public List<User> getUsersEx() {
        User user = new User();
        return this.getUsersEx(user);
    }

    public List<User> getUsersEx(User user) {
        return this.userDao.getListEx(user);
    }
}
