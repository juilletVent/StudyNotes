<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Mybatis 集成](#mybatis-%E9%9B%86%E6%88%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Mybatis 集成

1、依赖 Mybatis、以及分页

    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>1.3.2</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.48</version>
    </dependency>
    <!--PageHelper-->
    <dependency>
        <groupId>com.github.pagehelper</groupId>
        <artifactId>pagehelper-spring-boot-starter</artifactId>
        <version>1.2.3</version>
    </dependency>

2、入口 Application 类配置 Mapper 扫描表位置

    @MapperScan("cn.nanami52.warehouse.mapper")

3、配置 PageHelper 参数（application.yml 中）

    pagehelper:
      helperDialect: mysql
      reasonable: true
      supportMethodsArguments: true
      params: count=countSql

4、mybatis 实体别名配置（application.yml 中）

    mybatis:
      type-aliases-package: cn.nanami52.warehouse.entity

剩下的步骤就与 Spring MVC 的步骤一致了，可以开始构建了
