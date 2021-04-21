<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [基础配置](#%E5%9F%BA%E7%A1%80%E9%85%8D%E7%BD%AE)
  - [代码引用 yml 中预定义的配置值](#%E4%BB%A3%E7%A0%81%E5%BC%95%E7%94%A8-yml-%E4%B8%AD%E9%A2%84%E5%AE%9A%E4%B9%89%E7%9A%84%E9%85%8D%E7%BD%AE%E5%80%BC)
  - [多环境配置切换](#%E5%A4%9A%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE%E5%88%87%E6%8D%A2)
  - [常用配置栗子](#%E5%B8%B8%E7%94%A8%E9%85%8D%E7%BD%AE%E6%A0%97%E5%AD%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 基础配置

**注意：SpringBoot 的配置文件名称不能随意，必须要符合规范**，默认名称及位置为：resources 下 application.yml，多环境配置名称规范为：application-{envName}.yml，然后在主配置文件中配置 spring.profiles.active 来指定激活的环境配置文件为哪一个

## 代码引用 yml 中预定义的配置值

在 yml 配置文件中定义的值在 java 代码中需要使用@Value 注解进行取值，栗子如下：

    @Value("${custom.env}") // 全路径名称
    private String env;

## 多环境配置切换

使用 spring.profiles.active 选项进行配置

    spring:
    profiles:
        # 这里的值为环境的名称，而不是配置文件的全名，下面的配置对应的配置文件名为
        # application-dev.yml
        active: dev

## 常用配置栗子

    # 入口配置文件:application.yml

    spring:
        profiles:
            active: dev


    # 单个环境的配置文件:application-dev.yml

    server:
      port: 8080
      servlet:
        context-path: /
    logging:
      file:
        path: ./runtime.log
      level:
        root: debug

    debug: true

    spring:
      datasource:
        username: root
        password: root
        url: jdbc:mysql://localhost:3306/warehouse?characterEncoding=UTF-8&amp;characterSetResults=UTF-8&amp;serverTimezone=UTC&amp;verifyServerCertificate=false
        driver-class-name: com.mysql.jdbc.Driver
        # 连接池
        dbcp2:
          initial-size: 5
          min-idle: 5
          max-wait-millis: 200
          max-total: 10
        type: org.apache.commons.dbcp2.BasicDataSource
      # 过滤json中的null空值
      jackson:
        default-property-inclusion: non_null


    mybatis:
      type-aliases-package: cn.nanami52.warehouse.entity
    # PageHelper参数
    pagehelper:
      helperDialect: mysql
      reasonable: true
      supportMethodsArguments: true
      params: count=countSql
    # 自定义的密码盐值
    custom:
      passwordSalt: warehouse@@!~88__*sun
