package cn.nanami52.message.service;

import cn.nanami52.message.bean.Message;
import cn.nanami52.message.dao.MessageDao;

import java.util.List;

public class MessageService {
    private final MessageDao messageDao;

    public MessageService() {
        messageDao = new MessageDao();
    }

    public List<Message> getMessages(String pageNo, String pageSize) {

        int _pageNo = 1;
        int _pageSize = 10;
        try {
            _pageNo = Integer.parseInt(pageNo);
            _pageSize = Integer.parseInt(pageSize);
        } catch (NumberFormatException e) {
            System.out.println("页码、页面大小获取失败，采用默认值");
        }
        return this.messageDao.getMessage(_pageNo, _pageSize);
    }

    public int getCount() {
        return this.messageDao.getCount();
    }
}
