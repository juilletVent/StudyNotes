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
