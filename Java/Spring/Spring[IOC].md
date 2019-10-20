<!--
 * @Author: WeiHong Ran
 * @Date: 2019-10-18 20:53:29
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-10-20 15:56:05
 * @Description: Nothing
 -->
# Sprin IOC

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











