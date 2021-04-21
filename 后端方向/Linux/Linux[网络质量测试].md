<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [安装](#%E5%AE%89%E8%A3%85)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 安装

	#安装yum前置源
	yum -y install  epel-release
	#安装
	yum -y install iperf

参数说明：

-s 以server模式启动。#iperf -s
-c host以client模式启动。host是server端地址。#iperf -c serverip

通用参数：

- -f [kmKM] 分别表示以Kbits, Mbits, KBytes, MBytes显示报告，默认以Mbits为单位,#iperf -c 192.168.100.6 -f K
- -i sec 以秒为单位显示报告间隔，#iperf -c 192.168.100.6 -i 2
- -l 缓冲区大小，默认是8KB,#iperf -c 192.168.100.6 -l 64
- -m 显示tcp最大mtu值
- -o 将报告和错误信息输出到文件#iperf -c 192.168.100.6 -o ciperflog.txt
- -p 指定服务器端使用的端口或客户端所连接的端口#iperf -s -p 5001;iperf -c 192.168.100.55 -p 5001
- -u 使用udp协议
- -w 指定TCP窗口大小，默认是8KB
- -B 绑定一个主机地址或接口（当主机有多个地址或接口时使用该参数）
- -C 兼容旧版本（当server端和client端版本不一样时使用）
- -M 设定TCP数据包的最大mtu值
- -N 设定TCP不延时
- -V 传输ipv6数据包

server专用参数：

- -D 以服务方式运行。#iperf -s -D
- -R 停止iperf服务。针对-D，#iperf -s -R
- client端专用参数：
- -d 同时进行双向传输测试
- -n 指定传输的字节数，#iperf -c 192.168.100.6 -n 1024000
- -r 单独进行双向传输测试
- -t 测试时间，默认20秒,#iperf -c 192.168.100.6 -t 5
- -F 指定需要传输的文件
- -T 指定ttl值

使用：

	  服务器端： 
	  执行
	  iperf -s -d
	  客户端： 
	  执行
	  iperf -c 192.168.100.55 -t 20 -i 2 -d -m

原文：https://blog.csdn.net/shenzhen206/article/details/72820341 
