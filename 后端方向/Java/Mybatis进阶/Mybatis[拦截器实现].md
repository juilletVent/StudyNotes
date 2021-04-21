<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [自定义拦截器](#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8B%A6%E6%88%AA%E5%99%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 自定义拦截器

定义类，实现接口org.apache.ibatis.plugin.Interceptor，实现接口内的三个方法，plugin方法为固定写法，setProperties用于插件参数初始化，intercept方法为拦截操作主要的实现位置，事先完毕后，添加拦截注解@Intercepts，配置要拦截的目标对象、方法、形式参数表，最后将插件类在Mybatis配置文件中进行配置即可

> 插件简单实现

	package cn.nanami52.sm_service.plugin;
	
	import org.apache.ibatis.cache.CacheKey;
	import org.apache.ibatis.executor.Executor;
	import org.apache.ibatis.mapping.BoundSql;
	import org.apache.ibatis.mapping.MappedStatement;
	import org.apache.ibatis.plugin.*;
	import org.apache.ibatis.session.ResultHandler;
	import org.apache.ibatis.session.RowBounds;
	
	import java.util.Properties;
	
	@Intercepts({
	        @Signature(type = Executor.class, method = "query", args = {
	                MappedStatement.class, Object.class, RowBounds.class,
	                ResultHandler.class,
	                CacheKey.class,
	                BoundSql.class,
	        }),
	        @Signature(type = Executor.class, method = "query", args = {
	                MappedStatement.class, Object.class, RowBounds.class,
	                ResultHandler.class,
	        })
	})
	public class MyPlugin implements Interceptor {
	    public Object intercept(Invocation invocation) throws Throwable {
	
	        String methodName = invocation.getMethod().getName();
	        Object[] args = invocation.getArgs();
	        Object target = invocation.getTarget();
	
	        System.out.println("执行实际方法:" + methodName);
	        System.out.println("实参：" + args);
	        Object proceed = invocation.proceed();
	        System.out.println("方法完成，返回值：" + proceed);
	        return proceed;
	    }
	
	    public Object plugin(Object target) {
	        // 创建代理对象，固定写法，使用当前对象作为代理对象
	        return Plugin.wrap(target, this);
	    }
	
	    public void setProperties(Properties properties) {
	        // 插件参数，XML配置中的参数
	        System.out.println("取得插件参数，properties:" + properties);
	    }
	}

> 插件配置栗子

	<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
	        "http://mybatis.org/dtd/mybatis-3-config.dtd">
	
	<configuration>
	    <plugins>
	        <plugin interceptor="com.github.pagehelper.PageHelper"></plugin>
	        <plugin interceptor="cn.nanami52.sm_service.plugin.MyPlugin">
	            <property name="pageNo" value="1"/>
	            <property name="pageSize" value="10"/>
	        </plugin>
	    </plugins>
	</configuration>