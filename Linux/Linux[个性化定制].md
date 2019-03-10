## 自定义登录提示

/etc下存有issue、issus.net、motd三个欢迎用的提示文件，自定义登陆页面的输出只需要修改issue或者motd即可，issus.net的欢迎仅用于telnet连接输出室友，其他两个文件将会在全部用户登录时显示

	vim /etc/motd

	Hey ~ Welcome to the server,good luck with you work. *^_^*



## 指令别名

定义llam指令为`ll -a | more`快捷执行命令

	alias llam='ll -a | more'

显示目前全部的指令别名:`alias`

移出命令别名： `unalias alias1 alias2`

