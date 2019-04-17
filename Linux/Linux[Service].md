# Linux 系统服务

> 相关目录

|目录|作用|
|---|
|/etc/init.d/*|服务管理入口|
|/etc/sysconfig/*|各服务的初始化环境配置文件|
|/etc/* |各服务各自的配置文件|
|/var/lib/* |各服务产生的数据库|
|/var/run/* |各服务的程序乀 PID 记录处|


### service指令

	service [service name] (start|stop|restart|...)

状态查看：

	service --status-all
