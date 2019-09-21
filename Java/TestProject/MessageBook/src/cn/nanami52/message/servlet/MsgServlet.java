package cn.nanami52.message.servlet;

import cn.nanami52.message.bean.Message;
import cn.nanami52.message.bean.User;
import cn.nanami52.message.service.MessageService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "MsgServlet", urlPatterns = "/addMessage.do")
public class MsgServlet extends HttpServlet {

    private MessageService messageService;

    @Override
    public void init() throws ServletException {
        super.init();
        messageService = new MessageService();
    }

    private Message getMsg(HttpServletRequest request) {
        Message message = new Message();
        message.setTitle(request.getParameter("title"));
        message.setContent(request.getParameter("content"));
        message.setUserId(((User) (request.getAttribute("user"))).getId());
        message.setUsername(((User) (request.getAttribute("user"))).getName());
        return message;
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


        String servletPath = req.getServletPath();
        String method = req.getMethod();
        if (method.equals("POST")) {
            // 插入数据
            Message msg = this.getMsg(req);
            boolean isSuccess = this.messageService.addMsg(msg);
            // 转至列表页面
            resp.sendRedirect("/message/list.do");
            return;
        }

        if (servletPath.equals("/addMessage.do")) {
            req.getRequestDispatcher("WEB-INF/views/biz/add_message.jsp").forward(req, resp);
            return;
        }
        req.getRequestDispatcher("WEB-INF/views/biz/message_list.jsp").forward(req, resp);

    }
}
