<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [配置DBCP2数据源](#%E9%85%8D%E7%BD%AEdbcp2%E6%95%B0%E6%8D%AE%E6%BA%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 配置DBCP2数据源

1、依赖

    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-dbcp2</artifactId>
        <version>2.1.1</version>
    </dependency>

2、yml配置

    spring:
      datasource:
        username: root
        password: root
        url: jdbc:mysql://localhost:3306/warehouse?characterEncoding=UTF-8&amp;characterSetResults=UTF-8&amp;serverTimezone=UTC&amp;verifyServerCertificate=false
        driver-class-name: com.mysql.jdbc.Driver
        # dbcp2数据源
        dbcp2:
          initial-size: 5
          min-idle: 5
          max-wait-millis: 200
          max-total: 10
        # 数据源类型
        type: org.apache.commons.dbcp2.BasicDataSource