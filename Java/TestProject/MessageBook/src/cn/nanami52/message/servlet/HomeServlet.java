package cn.nanami52.message.servlet;

import cn.nanami52.message.bean.Message;
import cn.nanami52.message.bean.User;
import cn.nanami52.message.service.MessageService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(urlPatterns = {"/message/list.do", "/my/message/list.do"})
public class HomeServlet extends javax.servlet.http.HttpServlet {

    private MessageService messageService;

    @Override
    public void init() throws ServletException {
        super.init();
        messageService = new MessageService();
    }


    @Override
    public void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        int pageNo = null != req.getParameter("page") ? Integer.parseInt(req.getParameter("page")) : 1;
        int pageSize = null != req.getParameter("pageSize") ? Integer.parseInt(req.getParameter("pageSize")) : 5;
        String servletPath = req.getServletPath();
        List<Message> messages = null;
        int count = 0;
        if (servletPath.equals("/my/message/list.do")) {
            try {
                Long userId = ((User) req.getAttribute("user")).getId();
                messages = messageService.getMessages(pageNo, pageSize, userId);
                count = messageService.getCount(userId);

            } catch (Exception e) {
                res.sendRedirect("/message/list.do");
                return;
            }
        } else {
            messages = messageService.getMessages(pageNo, pageSize);
            count = messageService.getCount();
        }
        req.setAttribute("messages", messages);
        req.setAttribute("count", count);
        req.setAttribute("page", pageNo);
        req.setAttribute("last", (int) Math.ceil(count / pageSize));
        req.getRequestDispatcher("/WEB-INF/views/biz/message_list.jsp").forward(req, res);
    }
}
