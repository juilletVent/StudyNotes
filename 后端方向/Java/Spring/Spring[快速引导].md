<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Spring 基础](#spring-%E5%9F%BA%E7%A1%80)
  - [依赖安装](#%E4%BE%9D%E8%B5%96%E5%AE%89%E8%A3%85)
  - [简单的 IOC](#%E7%AE%80%E5%8D%95%E7%9A%84-ioc)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-10-09 21:47:29
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-10-21 21:51:02
 * @Description: Nothing
 -->

# Spring 基础

- [Maven 依赖](##依赖安装)

## 依赖安装

需要安装的依赖如下：

spring 相关依赖

- spring-core
- spring-context
- spring-beans
- spring-aop // 切面编程
- aspectjweaver // Aspectj aop 编程支持
- spring-expression // 表达式相关的，多用于动态校验

mybatis 相关核心

- mybatis
- mysql-connector-java // 数据库驱动

mybatis整合、数据库事务相关

- spring-jdbc
- spring-tx
- mybatis-spring

日志与测试相关

- commons-loggin # 日志，似乎不是 spring 的东西
- log4j # 日志，独立的依赖，不属于 spring
- junit # 单元测试

## 简单的 IOC

1、创建 Spring 配置文件
