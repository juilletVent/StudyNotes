package cn.nanami52.testmybatis.entity;

public class Address {

    private Integer id;         // 编号
    private User user;         // 所属用户
    private Boolean defaultAddr;  // 是否默认地址
    private String nation;      // 国家
    private String province;    // 省
    private String city;        // 市
    private String country;     // 县
    private String street;      // 街道
    private String remark;      // 描述

    public Address() {
    }

    public Address(Integer id, User user, Boolean defaultAddr, String nation, String province, String city, String country, String street, String remark) {
        this.id = id;
        this.user = user;
        this.defaultAddr = defaultAddr;
        this.nation = nation;
        this.province = province;
        this.city = city;
        this.country = country;
        this.street = street;
        this.remark = remark;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getDefaultAddr() {
        return defaultAddr;
    }

    public void setDefaultAddr(Boolean defaultAddr) {
        this.defaultAddr = defaultAddr;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
