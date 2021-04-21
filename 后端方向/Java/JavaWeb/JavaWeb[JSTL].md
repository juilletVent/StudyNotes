<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [maven 依赖](#maven-%E4%BE%9D%E8%B5%96)
- [引入](#%E5%BC%95%E5%85%A5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: WeiHong Ran
 * @Date: 2019-09-28 18:03:16
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-09-28 23:18:41
 * @Description: Nothing
 -->

## maven 依赖

    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
    </dependency>

## 引入

prefix的含义就是使用标签时的前缀是什么，如果你修改为 b，那么写forEach时就是 `<b:forEach items="${items}" var="item">...</b:forEach>`,fmt包也是一样

    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

Tips:注意不要引入错了，jstl有两个包，引入错了会有问题

    1、将<%@taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
           更改为
            <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

    2、使用JSTL的备用库，
           将<%@taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
           更改为
            <%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>


**注意：如果发生el表达式以及jstl标签不被解析识别，但是也不报错的话请确认web.xml配置的版本，如果使用的时非2.4以及3.x的话，则isELIgnored默认为true，这将导致tomcat忽略el表达式以及jstl标签，请在jsp页面顶部添加相关配置**

    <%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>

或者修改web.xml的版本

    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns="http://java.sun.com/xml/ns/javaee"
            xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
            id="WebApp_ID" version="3.0">
        <display-name>Archetype Created Web Application</display-name>
    </web-app>