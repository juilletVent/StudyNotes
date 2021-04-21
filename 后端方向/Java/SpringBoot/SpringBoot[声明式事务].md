<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [SpringBoot 声明式事务配置](#springboot-%E5%A3%B0%E6%98%8E%E5%BC%8F%E4%BA%8B%E5%8A%A1%E9%85%8D%E7%BD%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## SpringBoot 声明式事务配置

1、 引入依赖

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-aop</artifactId>
        <version>2.2.0.RELEASE</version>
    </dependency>

2、添加配置文件，并配置事务切点 transaction.xml

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
          xmlns:tx="http://www.springframework.org/schema/tx"
          xsi:schemaLocation="
            http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/tx
            http://www.springframework.org/schema/tx/spring-tx.xsd
            http://www.springframework.org/schema/aop
            http://www.springframework.org/schema/aop/spring-aop.xsd">

        <tx:advice id="txAdvice" transaction-manager="transactionManager">
            <tx:attributes>
                <tx:method name="query*" propagation="SUPPORTS" read-only="true"></tx:method>
                <tx:method name="get*" propagation="SUPPORTS" read-only="true"></tx:method>
                <tx:method name="select*" propagation="SUPPORTS" read-only="true"></tx:method>
                <tx:method name="*" propagation="REQUIRED" rollback-for="Exception"></tx:method>
            </tx:attributes>
        </tx:advice>
        <aop:config>
            <aop:pointcut id="allManagerMethod" expression="execution (* cn.nanami52.warehouse.service.*.*(..))"/>
            <aop:advisor advice-ref="txAdvice" pointcut-ref="allManagerMethod" order="0"/>
        </aop:config>
    </beans>

3、入口类添加注解进行引入

    @ImportResource("classpath:transaction.xml")

**Tips:似乎只需要引入依赖就行了，SpringBoot 似乎默认就会开启事务管理**
