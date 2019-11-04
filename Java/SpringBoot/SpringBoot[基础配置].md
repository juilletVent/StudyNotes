# 基础配置

**注意：SpringBoot 的配置文件名称不能随意，必须要符合规范**，默认名称及位置为：resources 下 application.yml，多环境配置名称规范为：application-{envName}.yml，然后在主配置文件中配置 spring.profiles.active 来指定激活的环境配置文件为哪一个

## 代码引用 yml 中预定义的配置值

在 yml 配置文件中定义的值在 java 代码中需要使用@Value 注解进行取值，栗子如下：

    @Value("${custom.env}") // 全路径名称
    private String env;
