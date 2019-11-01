## 基础配置流程

1、依赖配置 引入依赖：spring-webmvc、servlet 依赖

    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.2.0.RELEASE</version>
    </dependency>

2、配置上下文参数，标明 Spring 配置文件在何处

    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring.xml</param-value>
    </context-param>

3、配置编码过滤器

    <filter>
        <filter-name>EncodeFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>EncodeFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

4、配置上下文初始化监听器

    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

5、配置入口 Servlet 以及匹配规则

    <servlet>
        <servlet-name>DispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring.xml</param-value>
        </init-param>
    </servlet>

    <servlet-mapping>
        <servlet-name>DispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.css</url-pattern>
    </servlet-mapping>

6、创建 Spring 配置文件，添加视图解析规则,会将 Handler 返回的视图名称拼接前缀与后缀然后寻找对应的 jsp 进行绑定输出

    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <!-- 视图前缀 -->
        <property name="prefix" value="/"/>
        <!-- 视图后缀 -->
        <property name="suffix" value=".jsp"/>
    </bean>

7、编写 Handler，并配置映射路径(xml|注解）

    package cn.nanami52.test.controller;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.servlet.ModelAndView;

    @Controller
    public class Home {
        @RequestMapping("/home/index")
        public ModelAndView index() {
            ModelAndView modelAndView = new ModelAndView();

            modelAndView.addObject("name", "和风柒月");

            modelAndView.setViewName("home/index");
            return modelAndView;
        }
    }

8、开启 Spring 组件自动扫描

    <context:component-scan base-package="cn.nanami52.test"/>
