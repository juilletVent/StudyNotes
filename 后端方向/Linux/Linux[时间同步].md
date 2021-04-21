<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [ntpdate](#ntpdate)
- [rdate](#rdate)
- [写入硬件信息](#%E5%86%99%E5%85%A5%E7%A1%AC%E4%BB%B6%E4%BF%A1%E6%81%AF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ntpdate

安装

	yum install ntpdate -y
	ntpdate ntp服务器地址 [-d 显示详细信息]

如果出现错误，可以尝试换成ip，而不是域名。仍然报错则直接放弃此命令，换用rdate，实在是解决不到

## rdate

安装rdate

	yum install rdate -y

执行：

	/usr/bin/rdate -s time.nist.gov

## 写入硬件信息

不写入的话重启后时间将被还原

	hwclock -w