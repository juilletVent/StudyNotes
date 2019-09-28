package cn.nanami52.testmybatis.servlet;

import cn.nanami52.testmybatis.entity.User;
import cn.nanami52.testmybatis.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ModifyServlet", urlPatterns = "/modify")
public class ModifyServlet extends HttpServlet {

    private UserService userService = null;

    @Override
    public void init() throws ServletException {
        this.userService = new UserService();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            String type = req.getParameter("type");
            Integer id = Integer.parseInt(req.getParameter("id"));

            User user = new User(id);
            switch (type) {
                case "lock":
                    user.setUserStatus(1);
                    break;
                case "unlock":
                    user.setUserStatus(0);
                    break;
                case "delete":
                    user.setUserStatus(2);
                    break;
                default:
                    resp.sendRedirect("error/404.jsp");
                    return;
            }
            this.userService.update(user);
            resp.sendRedirect("/home");
        } catch (NumberFormatException e) {
            req.setAttribute("serverError", "id值非法");
            resp.sendRedirect("error/500.jsp");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


    }
}
