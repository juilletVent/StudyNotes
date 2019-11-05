# 基础配置

**注意：SpringBoot 的配置文件名称不能随意，必须要符合规范**，默认名称及位置为：resources 下 application.yml，多环境配置名称规范为：application-{envName}.yml，然后在主配置文件中配置 spring.profiles.active 来指定激活的环境配置文件为哪一个

## 代码引用 yml 中预定义的配置值

在 yml 配置文件中定义的值在 java 代码中需要使用@Value 注解进行取值，栗子如下：

    @Value("${custom.env}") // 全路径名称
    private String env;

## 多环境配置切换

使用spring.profiles.active选项进行配置

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
        url: jdbc:mysql://localhost:3306/user?charset=UTF-8
        driver-class-name: com.mysql.jdbc.Driver

    # Mybatis 实体包扫描别名配置
    mybatis:
    type-aliases-package: cn.nanami52.warehouse.entity

