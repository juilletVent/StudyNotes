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