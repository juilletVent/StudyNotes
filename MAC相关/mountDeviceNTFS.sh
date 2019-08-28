#!/bin/sh
###
# @Author: WeiHong Ran
# @Date: 2019-08-27 17:16:08
 # @LastEditors: WeiHong Ran
 # @LastEditTime: 2019-08-28 21:59:25
# @Description: Nothing
###

# 打印磁盘信息
diskutil list

read -p "请输入磁盘名称：" deviceName

# 挂载磁盘
sudo echo LABEL=$deviceName none ntfs rw,auto,nobrowse >>/etc/fstab

# 创建连接
sudo ln -s /Volumes/$deviceName ~/Desktop/$deviceName
