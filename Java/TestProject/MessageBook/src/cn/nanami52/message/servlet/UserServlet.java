package cn.nanami52.message.servlet;

import cn.nanami52.message.bean.User;
import cn.nanami52.message.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@WebServlet(name = "UserServlet", urlPatterns = {"/userInfo.do", "/editInfo.do"})
public class UserServlet extends HttpServlet {

    private UserService userService;

    @Override
    public void init() throws ServletException {
        super.init();
        this.userService = new UserService();
    }

    private User getUser(HttpServletRequest req) {
        Long id = Long.valueOf(req.getParameter("id"));
        String name = req.getParameter("name");
        String password = req.getParameter("password");
        String realName = req.getParameter("realName");
        String birthday = req.getParameter("birthday");
        String phone = req.getParameter("phone");
        String address = req.getParameter("address");

        User user = null;
        try {
            user = new User(id, name, password, realName, null, phone, address);
            user.setBirthday(new SimpleDateFormat("yyyy-MM-dd").parse(birthday));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return user;
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String path = req.getServletPath();
        String method = req.getMethod();

        if (method.equals("POST")) {
            User user = this.getUser(req);
            boolean update = userService.update(user);
            if (update) {
                req.setAttribute("user", user);
                req.getRequestDispatcher("WEB-INF/views/biz/user.jsp").forward(req, resp);
            } else {
                req.getRequestDispatcher("WEB-INF/views/error/500.jsp").forward(req, resp);
            }
            return;
        }

        User user = (User) req.getAttribute("user");
        user = this.userService.getUser(user.getId());
        req.setAttribute("user", user);
        if ("/userInfo.do".equals(path)) {
            req.getRequestDispatcher("WEB-INF/views/biz/user.jsp").forward(req, resp);
        } else if ("/editInfo.do".equals(path)) {
            req.getRequestDispatcher("WEB-INF/views/biz/edit_user.jsp").forward(req, resp);
        } else {
            req.getRequestDispatcher("WEB-INF/views/error/404.jsp").forward(req, resp);
        }
    }
}
