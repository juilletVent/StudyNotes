/*
 * @Author: WeiHong Ran
 * @Date: 2019-09-21 00:06:17
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-09-22 11:28:06
 * @Description: Nothing
 */
package cn.nanami52.message.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(filterName = "CharsetFilter")
public class CharsetFilter implements Filter {
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
