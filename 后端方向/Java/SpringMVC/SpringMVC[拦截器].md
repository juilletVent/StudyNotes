<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [SpringMVC 拦截器](#springmvc-%E6%8B%A6%E6%88%AA%E5%99%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## SpringMVC 拦截器

1、创建拦截器，实现接口 import org.springframework.web.servlet.HandlerInterceptor，并重写以下方法：

- preHandle ：请求处理之前 HOOK，返回 true 则执行处理，返回 false 则中断处理
- postHandle：Handler 处理后，视图渲染前(如果是@RestController 则这两个 Hook 都将在返回后触发，可能是因为 RestController 没有视图渲染部分吧，所以直接返回了)
- afterCompletion：请求返回前 HOOK(如果是@RestController 则这两个 Hook 都将在返回后触发，可能是因为 RestController 没有视图渲染部分吧，所以直接返回了)

2、在 Spring 核心配置文件中添加拦截器配置

    <mvc:interceptors>
        <mvc:interceptor>
            <!-- 拦截一集路径通配 -->
            <mvc:mapping path="/card/*"/>
            <!-- 拦截所有后辈路径 -->
            <mvc:mapping path="/card/**"/>
            <!-- 路径排除，不拦截此路径 -->
            <mvc:exclude-mapping path="/home/login"/>
            <bean class="cn.nanami52.test.intercepter.TestIntercepter"/>
        </mvc:interceptor>
    </mvc:interceptors>
