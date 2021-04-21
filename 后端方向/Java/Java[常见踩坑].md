<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [编码字符集](#%E7%BC%96%E7%A0%81%E5%AD%97%E7%AC%A6%E9%9B%86)
- [IDEA tomcat部署问题](#idea-tomcat%E9%83%A8%E7%BD%B2%E9%97%AE%E9%A2%98)
- [IDEA 控制台乱码](#idea-%E6%8E%A7%E5%88%B6%E5%8F%B0%E4%B9%B1%E7%A0%81)
- [Maven慢](#maven%E6%85%A2)
- [Spring AOP代理失败](#spring-aop%E4%BB%A3%E7%90%86%E5%A4%B1%E8%B4%A5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->




## 编码字符集

设置全局过滤器对请求以及响应进行编码设置之后浏览器仍然中文乱码，很有可能是没有给影响添加ContentType头导致的，默认是不会加的，所以需要在过滤器中添加字符集描述：

    // 设置响应字符集
    resp.setContentType("text/html;charset=" + EncodeFilter.charSet);
    // 或者硬编码也可以,json
    resp.setContentType("text/html;charset=UTF-8");
    // json
    resp.setContentType("application/json;charset=UTF-8");

## IDEA tomcat部署问题

如果默认新建的是web项目，在配置tomcat的时候deployment下直接添加一个Artifacts即可，没什么特别的，如果是复合项目，则需要在项目工程配置中，Artifacts板块下吧web子模块手动添加进去，在tomcat配置中deployment下才能看得到，如果项目本身就是web项目则不存在这个问题

## IDEA 控制台乱码

添加jvm启动参数 -Dfile.encoding=UTF-8

## Maven慢

如果在Maven中配置了镜像，但是IDEA拉取依赖的时候仍然很慢，原因可能是IDEA使用了自带的Maven进行依赖获取，而不是使用你本地的Maven（滑稽~），解决办法是在IDEA设置中找到Maven板块，将Maven切换到本地的Maven即可，也可以设置项目级Maven源配置

## Spring AOP代理失败

如果发生类似的报错：

    Bean named 'xxxxxx' is expected to be of type 'xxxxxxxx' but was actually of type 'com.sun.proxy.$Proxy23'

有可能是代理模式问题，Spring本身的代理应该采用Java借口代理完成，不知道为什么默认模式不行，那么就只能切换成cglib来完成代理了，Spring.xml配置的

    <!-- 添加配置 proxy-target-class="true" -->
    <aop:aspectj-autoproxy proxy-target-class="true"/>

已经不推荐使用cglib模式来实现代理了，相比之下效率很低，为什么默认代理模式失效，原因暂时不清楚
