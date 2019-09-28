package cn.nanami52.testmybatis.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class SqlSessionFactoryUtils {

    private static final String CONF_PATH = "mybatis-config.xml";

    private static SqlSessionFactory sqlSessionFactory = null;

    private static ThreadLocal<SqlSession> threadLocal = new ThreadLocal<SqlSession>();


    public static void initFactory() {
        try {
            InputStream inputStream = Resources.getResourceAsStream(CONF_PATH);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static SqlSessionFactory getSqlSessionFactory() {
        return sqlSessionFactory;
    }

    public static void close() {
        SqlSession sqlSession = threadLocal.get();
        if (null != sqlSession) {
            sqlSession.close();
            threadLocal.set(null);
        }
    }

}
