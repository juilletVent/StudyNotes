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