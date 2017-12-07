# Linux 下 安装Git，并配置Git服务端

> Install Git

	yum install git

> Add a user for git

	adduser git

> Create a depository

	git init --bare sample.git //Git仓库名称，带有.git后缀，会在当前路径下创建一个文件夹

> disable shell

	vim /etc/passwd

	git:x:1001:1001:,,,:/home/git:/bin/bash
	改为
	git:x:1001:1001:,,,:/home/git:/bin/git-shell

这样，git用户可以正常通过ssh使用git，但无法登录shell，因为我们为git用户指定的git-shell每次一登录就自动退出。

> Clone

	git clone 用户名@服务器地址:/srv/sample.git   //仓库绝对路径