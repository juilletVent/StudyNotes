package cn.nanami52.message.servlet;

import cn.nanami52.message.bean.User;
import cn.nanami52.message.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = "/login.do")
public class LoginServlet extends HttpServlet {

    private UserService userService;

    @Override
    public void init() throws ServletException {
        super.init();
        userService = new UserService();
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if ("GET".equals(req.getMethod())) {
            req.getSession().setAttribute("error", null);
            req.getRequestDispatcher("WEB-INF/views/biz/login.jsp").forward(req, resp);
            return;
        }

        String username = req.getParameter("username");
        String passwd = req.getParameter("password");
        User user = userService.login(username, passwd);
        if (null != user) {
            // 登陆成功
            req.getSession().setAttribute("user", user);
            req.getRequestDispatcher("/message/list.do").forward(req, resp);
        } else {
            // 登陆失败
            req.getSession().setAttribute("username", username);
            req.getSession().setAttribute("error", "账户名或密码错误");
            req.getRequestDispatcher("WEB-INF/views/biz/login.jsp").forward(req, resp);
        }


    }
}
