package cn.nanami52.testmybatis.listener;

import cn.nanami52.testmybatis.utils.SqlSessionFactoryUtils;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class InitListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("容器加载中...");
        // 初始化我们的SqlSesionFactory对象
        SqlSessionFactoryUtils.initFactory();
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("容器销毁中...");
        // 销毁我们的SqlSesionFactory对象
        SqlSessionFactoryUtils.close();
    }
}
