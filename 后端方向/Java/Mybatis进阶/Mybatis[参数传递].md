<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Mybatis 参数传递](#mybatis-%E5%8F%82%E6%95%B0%E4%BC%A0%E9%80%92)
  - [单参](#%E5%8D%95%E5%8F%82)
  - [多参传递](#%E5%A4%9A%E5%8F%82%E4%BC%A0%E9%80%92)
      - [多参封装形式](#%E5%A4%9A%E5%8F%82%E5%B0%81%E8%A3%85%E5%BD%A2%E5%BC%8F)
  - [集合类型参数](#%E9%9B%86%E5%90%88%E7%B1%BB%E5%9E%8B%E5%8F%82%E6%95%B0)
  - [最佳实践](#%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Mybatis 参数传递

- [多参数传递](##多参传递)
- [集合类型参数](##集合类型参数)
- [最佳实践](##最佳实践)

## 单参

单参传递的时候接口定义的参数名称，以及 xml 中配置的占位名称不重要，Mybatis 会直接吧实际入参填入占位符的位置

## 多参传递

Mybatis 默认多参数处理形式：

在 XML 中戳用 arg0、arg1 或者 param1、param2 这种形式的占位符，并且定义位置与实际入参位置一致时就可以完成默认形式的映射，栗子

xml 中 sql 配置如下：

    <select id="getUsers" resultType="User">
      select * from t_user where username=#{param1} and password=#{param1}
    </select>

实际调用的时候使用：

    userDao.getUsers("admin","xxxxxxx");

#### 多参封装形式

- POJO 类封装（实体封装）传入对应的表实体类即可，xml 中占位符需要使用实体字段进行占位
- Map 封装：map 封装，key 对应 xml 占位符，map 的 value 就是填充的值
- @param 注解：dao 数据接口声明的时候，对形参进行参数注解即可

  @param 注解封装栗子：

      // 接口声明
      public List<User> getUsers(@Param("username") String username,@Param("password") String password);

      <!-- xml sql配置 -->
      <select id="getUsers" resultType="User">
        select * from user where username=#{username} and password=#{password}
      </select>

**谨防踩坑：使用 Map 进行查询封装的时候，由于 map 的 get 如果获取不到值会返回 null，而查询占位 null 一般不好引发异常，所以很有可能会造成查不出数据又不报错的情况，一定要小心检查入参的情况**

**Tips：注解方式与默认参数方式可以混用，但是不建议这么做，语义表达很不清晰，非常容易造成混乱，一般来说 POJO 类封装，或者使用参数注解比较实用**

## 集合类型参数

如果在 dao 接口中定义了入参是集合类型或者数组类型，则在 xml 中可以使用如下几个关键字进行取值：

- collection：list 类型
- list：list 类型
- array：array 类型

栗子：

    // dao接口定义
    public User getUser(List<String> args);
    public User getUser(Array<String> args);

    <!-- xml定义 -->
    <select id="getUser" resultType="User">
      select * from t_user where username=#{list[0]} and passwrod=#{list[1]}
    </select>
    // 或者
    <select id="getUser" resultType="User">
      select * from t_user where username=#{collection[0]} and passwrod=#{collection[1]}
    </select>

    <!-- 数组入参使用 -->
    <select id="getUser" resultType="User">
      select * from t_user where username=#{array[0]} and passwrod=#{array[1]}
    </select>

以上是默认的约定形式，对于集合参数也是可以使用参数注解的，使用了参数注解之后，在 xml 中直接使用注解参数名配合下标取值即可

    public User getUser(@Params("myargs") Array<String> args);
    <!-- xml sql -->
    <select id="getUser" resultType="User">
      select * from t_user where username=#{myargs[0]} and passwrod=#{myargs[1]}
    </select>

## 最佳实践

原则一：参数小于五个的时候推荐使用 Params 注解进行传递

原则二：参数多余五个的时候推荐单独封装 POJO 类进行传递
