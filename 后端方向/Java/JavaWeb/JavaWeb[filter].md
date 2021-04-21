<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [设置filter，设置请求响应编码](#%E8%AE%BE%E7%BD%AEfilter%E8%AE%BE%E7%BD%AE%E8%AF%B7%E6%B1%82%E5%93%8D%E5%BA%94%E7%BC%96%E7%A0%81)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: WeiHong Ran
 * @Date: 2019-10-03 16:36:31
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-10-03 16:41:27
 * @Description: Nothing
 -->
## 设置filter，设置请求响应编码

栗子：

    package cn.nanami52.testmybatis.filter;

    import javax.servlet.*;
    import javax.servlet.annotation.WebFilter;
    import java.io.IOException;

    @WebFilter(filterName = "CharterFilter", urlPatterns = "*")
    public class CharterFilter implements Filter {
        public void destroy() {
        }

        public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
            req.setCharacterEncoding("UTF-8");
            resp.setCharacterEncoding("UTF-8");
            chain.doFilter(req, resp);
        }

        public void init(FilterConfig config) throws ServletException {

        }

    }


**Tips:其他的filter类似。主要注意的是，一定要写注解，否者不会执行相关的hook函数，实现import javax.servlet.Filter;**