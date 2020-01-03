## Centos 配置静态IP

1、修改网络配置文件`vi /etc/sysconfig/network-scripts/ifcfg-你的网卡名字`

	BOOTPROTO="static" # 使用静态IP地址，默认为dhcp 
	IPADDR="19.37.33.66" # 设置的静态IP地址
	NETMASK="255.255.255.0" # 子网掩码 
	GATEWAY="19.37.33.1" # 网关地址 
	DNS1="192.168.241.2" # DNS服务器（此设置没有用到，所以我的里面没有添加）
	ONBOOT=yes  #设置网卡启动方式为 开机启动 并且可以通过系统服务管理器 systemctl 控制网卡

2、另一个网卡配置`vi /etc/sysconfig/network`

	# Created by anaconda
	NETWORKING=yes
	GATEWAY=19.37.33.1

3、重启网卡服务

	systemctl restart network