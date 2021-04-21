<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Linux 系统服务](#linux-%E7%B3%BB%E7%BB%9F%E6%9C%8D%E5%8A%A1)
    - [service指令](#service%E6%8C%87%E4%BB%A4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Linux 系统服务

> 相关目录

|目录|作用|
|---|
|/etc/init.d/*|服务管理入口|
|/etc/sysconfig/*|各服务的初始化环境配置文件|
|/etc/* |各服务各自的配置文件|
|/var/lib/* |各服务产生的数据库|
|/var/run/* |各服务的程序乀 PID 记录处|
|/etc/init.d/syslog/*|日志|

### service指令

	service [service name] (start|stop|restart|...)

状态查看：

	service --status-all

**Tips:Centos 7+ 中已经替换为systemctl进行管理用法基本相同**












