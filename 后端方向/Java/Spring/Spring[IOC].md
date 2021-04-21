<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Sprin IOC](#sprin-ioc)
      - [常用的ApplicationContext实现类](#%E5%B8%B8%E7%94%A8%E7%9A%84applicationcontext%E5%AE%9E%E7%8E%B0%E7%B1%BB)
      - [Bean声明相关注解](#bean%E5%A3%B0%E6%98%8E%E7%9B%B8%E5%85%B3%E6%B3%A8%E8%A7%A3)
      - [Bean注入相关注解](#bean%E6%B3%A8%E5%85%A5%E7%9B%B8%E5%85%B3%E6%B3%A8%E8%A7%A3)
      - [配置相关注解](#%E9%85%8D%E7%BD%AE%E7%9B%B8%E5%85%B3%E6%B3%A8%E8%A7%A3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: WeiHong Ran
 * @Date: 2019-10-18 20:53:29
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-10-20 15:56:05
 * @Description: Nothing
 -->
# Sprin IOC

#### 常用的ApplicationContext实现类

- AnnotationConfigApplicationContext 从一个或多个基于java的配置类中加载上下文定义，适用于java注解的方式
- ClassPathXmlApplicationContext 从类路径下的一个或多个xml配置文件中加载上下文定义，适用于xml配置的方式
- FileSystemXmlApplicationContext 从文件系统下的一个或多个xml配置文件中加载上下文定义，也就是说系统盘符中加载xml配置文件
- AnnotationConfigWebApplicationContext 专门为web应用准备的，适用于注解方式
- XmlWebApplicationContext 从web应用下的一个或多个xml配置文件加载上下文定义，适用于xml配置方式

#### Bean声明相关注解

- @Component 通用Bean声明注解，没有特殊含义
- @Service 服务层Bean声明注解
- @Controller 控制层Bean声明注解
- @Repository 数据访问层（DAO层）注解

#### Bean注入相关注解

- @Autowired spring提供的注入注解
- @Inject JSR-300提供的注解
- @Resource JSR-250 提供的注解

#### 配置相关注解

- @Configuration 说明这是一个配置类
- @ComponentScan("cn.nanami52.test") 表明扫描的包，将扫描这个包以及子包下面的相关spring注解


bean注解一般用于属性之上，也可以用于set方法之上


一个简单的依赖注入栗子：

新建bean：

    package cn.nanami52.test.entity;

    import org.springframework.stereotype.Component;

    @Component
    public class Student {

        public void sayHello() {
            System.out.println("hello siri");
        }

    }

新建dao：

    package cn.nanami52.test.dao;

    import cn.nanami52.test.entity.Student;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    @Service
    public class StudentDAO {

        @Autowired
        private Student student;

        public void sayHello() {
            this.student.sayHello();
        }
    }

新建配置类，使用xml进行配置也是可以的：

    package cn.nanami52.test;

    import org.springframework.context.annotation.ComponentScan;
    import org.springframework.context.annotation.Configuration;

    @Configuration // 标记这个类是配置类
    @ComponentScan("cn.nanami52.test") // 标记扫描这个包下面的所有的Spring ioc相关注解
    public class SpringConfig {
    }


单元测试：

    package cn.nanami52.test.unitTest;

    import cn.nanami52.test.SpringConfig;
    import cn.nanami52.test.dao.StudentDAO;
    import org.junit.Test;
    import org.springframework.context.annotation.AnnotationConfigApplicationContext;

    public class testIOC {

        @Test
        public void testInject() {
            AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
            StudentDAO studentDAO = context.getBean(StudentDAO.class);
            studentDAO.sayHello();
        }

    }











