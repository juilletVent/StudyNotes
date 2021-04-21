<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [SCP命令](#scp%E5%91%BD%E4%BB%A4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## SCP命令

-P为端口参数紧接端口参数，不要有空格，后面两个为文件路径，拷贝方向为从前向后，不区分本地与远端路径

远端路径格式：用户名@地址:远端路径

栗子：

	scp -P22000 ./clearLog.sh root@211.149.215.86:/root/taskBash

