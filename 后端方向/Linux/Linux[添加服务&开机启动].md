## 配置服务启动

这里以添加frp服务为栗子，其他自启动脚本、可执行程序都可以参照这种方法进行添加


使用systemd配置开机自启，适用于 centos7 Ubuntu 16 或 debian 8。

	vi /etc/systemd/system/frps.service 

新建此文件，并写入以下内容:

	[Unit]
	Description=frps daemon
	
	[Service]
	Type=simple
	ExecStart=/usr/bin/frps -c /etc/frps/frps.ini
	# bash 命令 自定义服务，bash使用绝对路径即可，脚本内可以切换工作路径
	ExecStart=/usr/bin/bash /root/easy-mock/start.sh
	
	[Install]
	WantedBy=multi-user.target

启动并设为开机自启。

	$ systemctl start frps
	$ systemctl enable frps
	# 查看服务自启动情况
	$ systemctl list-unit-files


------------centos6.5及以下---------------------

	vi /etc/rc.local

在最下面加一行

	/usr/sbin/frp/frps -c /usr/sbin/frp/frps.ini

其中 /usr/sbin/frp是程序放置的目录，重启ok


> 另一个例子

	[Unit]
	Description=frpc daemon
	After=syslog.target  network.target
	Wants=network.target
	
	[Service]
	Type=simple
	ExecStart=/usr/sbin/frp/frpc -c /etc/frp/frpc.ini
	Restart= always
	RestartSec=1min
	ExecStop=/usr/bin/killall frpc
	
	
	[Install]
	WantedBy=multi-user.target