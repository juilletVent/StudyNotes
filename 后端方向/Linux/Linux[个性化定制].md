## 自定义登录提示

/etc下存有issue、issus.net、motd三个欢迎用的提示文件，自定义登陆页面的输出只需要修改issue或者motd即可，issus.net的欢迎仅用于telnet连接输出室友，其他两个文件将会在全部用户登录时显示

	vim /etc/motd

	Hey ~ Welcome to the server,good luck with you work. *^_^*



## 指令别名

定义llam指令为`ll -a | more`快捷执行命令

	alias llam='ll -a | more'

显示目前全部的指令别名:`alias`

移出命令别名： `unalias alias1 alias2`

## Vim tab缩进更改

	set ts=4
	set softtabstop=4
	set shiftwidth=4
	set expandtab
	set autoindent

 - ts是tabstop的缩写，设TAB宽度为4个空格。
 - softtabstop 表示在编辑模式的时候按退格键的时候退回缩进的长度，当使用 expandtab 时特别有用。
 - shiftwidth 表示每一级缩进的长度，一般设置成跟 softtabstop 一样。
 - expandtab表示缩进用空格来表示，noexpandtab 则是用制表符表示一个缩进。
 - autoindent自动缩进