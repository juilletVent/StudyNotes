package cn.nanami52.testmybatis.servlet;

import cn.nanami52.testmybatis.entity.User;
import cn.nanami52.testmybatis.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "DetailServlet", urlPatterns = "/detail")
public class DetailServlet extends HttpServlet {

    private UserService userService = null;

    @Override
    public void init() throws ServletException {
        super.init();
        this.userService = new UserService();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");

        try {
            User user = this.userService.getUser(new User(Integer.parseInt(id)));
            request.setAttribute("user", user);
            request.getRequestDispatcher("view/detail.jsp").forward(request, response);
        } catch (NumberFormatException e) {
            response.sendRedirect("error/404.jsp");
            return;
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
