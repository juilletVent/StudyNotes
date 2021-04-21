<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Linux SSH 登陆](#linux-ssh-%E7%99%BB%E9%99%86)
    - [生成秘钥对](#%E7%94%9F%E6%88%90%E7%A7%98%E9%92%A5%E5%AF%B9)
    - [配置用户SSH](#%E9%85%8D%E7%BD%AE%E7%94%A8%E6%88%B7ssh)
    - [修改ssh服务配置](#%E4%BF%AE%E6%94%B9ssh%E6%9C%8D%E5%8A%A1%E9%85%8D%E7%BD%AE)
    - [客户端](#%E5%AE%A2%E6%88%B7%E7%AB%AF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Linux SSH 登陆

#### 生成秘钥对

	ssh-keygen -t rsa

生成的秘钥对存储在用户目录下的`.ssh`目录下`id_rsa`为私钥文件，`id_rsa.pub`为公钥文件

#### 配置用户SSH

在用户目录下的`.ssh`目录下执行

	# 添加秘钥到配置，多个用户秘钥只需要将id_rsa.pub追加至authorized_keys即可
	cat id_rsa.pub>> authorized_keys
	# 修改权限
	chmod 600 authorized_keys
	# 删除秘钥对
	rm -f id_rsa* 

#### 修改ssh服务配置

启用ssh登陆

	vim /etc/ssh/sshd_config
	# 是否开启登录验证ssh验证，取消注释，配置为yes
	PasswordAuthentication no|yes

#### 客户端

连接时使用秘钥文件+密码的形式，连接即可，如果秘钥生成时不输入密码，则无需输入密码，仅使用秘钥文件即可登录