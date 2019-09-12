package cn.nanami52.message.servlet;

import cn.nanami52.message.bean.Message;
import cn.nanami52.message.service.MessageService;

import javax.servlet.ServletException;
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

    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        int pageNo = Integer.parseInt(request.getParameter("pageNo"));
        int pageSize = Integer.parseInt(request.getParameter("pageSize"));
        List<Message> messages = messageService.getMessages(pageNo, pageSize);
        int count = messageService.getCount();
//        int count = 22;

        request.setAttribute("messages", messages);
        request.setAttribute("count", count);
        request.setAttribute("page", pageNo);
        request.setAttribute("page", pageNo);

        request.getRequestDispatcher("/WEB-INF/views/biz/message_list.jsp").forward(request, response);
    }
}
