### Linux 配置sudoer

文件位置： `/etc/sudoers`

文件内容： 

~~~
## Allow root to run any commands anywhere
## 允许用户执行root命令
root    ALL=(ALL)       ALL
## 允许用户在不输入密码的情况下执行root命令
ran     ALL=(ALL)       NOPASSWD:ALL
~~~