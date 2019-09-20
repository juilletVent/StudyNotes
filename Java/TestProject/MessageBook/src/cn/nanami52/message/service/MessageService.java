package cn.nanami52.message.service;

import cn.nanami52.message.bean.Message;
import cn.nanami52.message.dao.MessageDao;

import java.util.List;

public class MessageService {
    private final MessageDao messageDao;

    public MessageService() {
        messageDao = new MessageDao();
    }

    public List<Message> getMessages(int pageNo, int pageSize) {
        return this.messageDao.getMessage(pageNo, pageSize);
    }

    public int getCount() {
        return this.messageDao.getCount();
    }
}
