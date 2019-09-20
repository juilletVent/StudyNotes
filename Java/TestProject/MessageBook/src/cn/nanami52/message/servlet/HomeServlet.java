package cn.nanami52.message.servlet;

import cn.nanami52.message.bean.Message;
import cn.nanami52.message.service.MessageService;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;
import java.util.List;

@WebServlet("/message/list.do")
public class HomeServlet extends javax.servlet.http.HttpServlet {

    private MessageService messageService;

    @Override
    public void init() throws ServletException {
        super.init();
        messageService = new MessageService();
    }


    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        int pageNo = null != req.getParameter("page") ? Integer.parseInt(req.getParameter("page")) : 1;
        int pageSize = null != req.getParameter("pageSize") ? Integer.parseInt(req.getParameter("pageSize")) : 5;
        List<Message> messages = messageService.getMessages(pageNo, pageSize);
        int count = messageService.getCount();
//        int count = 22;

        req.setAttribute("messages", messages);
        req.setAttribute("count", count);
        req.setAttribute("page", pageNo);
        req.setAttribute("last", (int) Math.ceil(count / pageSize));

        req.getRequestDispatcher("/WEB-INF/views/biz/message_list.jsp").forward(req, res);
    }
}
