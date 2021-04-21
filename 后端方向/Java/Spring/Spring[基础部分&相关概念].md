<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Spring 基础以及相关概念](#spring-%E5%9F%BA%E7%A1%80%E4%BB%A5%E5%8F%8A%E7%9B%B8%E5%85%B3%E6%A6%82%E5%BF%B5)
  - [Spring 四大核心理念](#spring-%E5%9B%9B%E5%A4%A7%E6%A0%B8%E5%BF%83%E7%90%86%E5%BF%B5)
  - [Maven 依赖 pom 栗子](#maven-%E4%BE%9D%E8%B5%96-pom-%E6%A0%97%E5%AD%90)
  - [整合 mybatis 配置文件](#%E6%95%B4%E5%90%88-mybatis-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: WeiHong Ran
 * @Date: 2019-10-18 20:49:43
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-10-20 16:21:15
 * @Description: Nothing
 -->

# Spring 基础以及相关概念

## Spring 四大核心理念

- 使用 jojo 实现轻量级和最小侵入式开发
- 通过依赖注入以及面向接口编程实现松耦合
- 通过 AOP 和默认习惯进行声明式编程
- 使用 AOP 和模板减少模式化代码

## Maven 依赖 pom 栗子

主要依赖四个包：

- spring-context
- spring-beans
- spring-core
- spring-aop
- spring-expression
- spring-aspects // AspectJ 支持 AOP 切面支持
- aspectjweaver // AspectJ 支持 AOP 切面支持
- aopalliance // aop 联盟，不知道干嘛用的
- spring-test // Spring 整合单元测试支持

样例：

    <?xml version="1.0" encoding="UTF-8"?>

    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>

        <groupId>cn.nanami52.Spring</groupId>
        <artifactId>testSpring</artifactId>
        <version>1.0-SNAPSHOT</version>
        <packaging>war</packaging>

        <name>testSpring Maven Webapp</name>
        <!-- FIXME change it to the project's website -->
        <url>http://www.example.com</url>

        <properties>
            <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
            <maven.compiler.source>1.7</maven.compiler.source>
            <maven.compiler.target>1.7</maven.compiler.target>
            <!-- 统一定义版本，方便修改 -->
            <spring-version>5.2.0.RELEASE</spring-version>
        </properties>
        <!-- 主要依赖配置处 -->
        <dependencies>
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>4.12</version>
                <scope>test</scope>
            </dependency>
            <!-- https://mvnrepository.com/artifact/org.springframework/spring-core -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-core</artifactId>
                <version>${spring-version}</version>
            </dependency>
            <!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context</artifactId>
                <version>${spring-version}</version>
            </dependency>
            <!-- https://mvnrepository.com/artifact/org.springframework/spring-beans -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-beans</artifactId>
                <version>${spring-version}</version>
            </dependency>
            <!-- https://mvnrepository.com/artifact/org.springframework/spring-aop -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-aop</artifactId>
                <version>${spring-version}</version>
            </dependency>


        </dependencies>

        <build>
            <finalName>testSpring</finalName>
            <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
                <plugins>
                    <plugin>
                        <artifactId>maven-clean-plugin</artifactId>
                        <version>3.1.0</version>
                    </plugin>
                    <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
                    <plugin>
                        <artifactId>maven-resources-plugin</artifactId>
                        <version>3.0.2</version>
                    </plugin>
                    <plugin>
                        <artifactId>maven-compiler-plugin</artifactId>
                        <version>3.8.0</version>
                    </plugin>
                    <plugin>
                        <artifactId>maven-surefire-plugin</artifactId>
                        <version>2.22.1</version>
                    </plugin>
                    <plugin>
                        <artifactId>maven-war-plugin</artifactId>
                        <version>3.2.2</version>
                    </plugin>
                    <plugin>
                        <artifactId>maven-install-plugin</artifactId>
                        <version>2.5.2</version>
                    </plugin>
                    <plugin>
                        <artifactId>maven-deploy-plugin</artifactId>
                        <version>2.8.2</version>
                    </plugin>
                </plugins>
            </pluginManagement>
        </build>
        <!-- 仓库配置，启用镜像地址 -->
        <repositories>
            <repository>
                <id>nexus-aliyun</id>
                <name>nexus-aliyun</name>
                <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
                <releases>
                    <enabled>true</enabled>
                </releases>
                <snapshots>
                    <enabled>false</enabled>
                </snapshots>
            </repository>
        </repositories>
    </project>

## 整合 mybatis 配置文件

    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <property name="typeAliasesPackage" value="cn.nanami52.sm_service.entity"/>
        <!-- 在此处引入即可 -->
        <property name="configLocation" value="classpath:mybatis.xml"></property>
    </bean>

PageHelper 引入

    <!-- mybatis配置 -->
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
            "http://mybatis.org/dtd/mybatis-3-config.dtd">

    <configuration>
        <plugins>
            <plugin interceptor="com.github.pagehelper.PageHelper"></plugin>
        </plugins>
    </configuration>
