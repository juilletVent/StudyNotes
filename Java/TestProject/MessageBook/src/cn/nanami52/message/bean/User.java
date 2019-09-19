package cn.nanami52.message.bean;

import java.util.Date;

public class User {
    private long id;

    private String name;

    private String password;

    private String realName;

    private Date birthday;

    private String phone;

    private String address;

    public User() {
    }

    public User(long id, String name, String password, String realName, Date birthday, String phone, String address) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.realName = realName;
        this.birthday = birthday;
        this.phone = phone;
        this.address = address;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
