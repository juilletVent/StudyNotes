<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Linux 配置sudoer](#linux-%E9%85%8D%E7%BD%AEsudoer)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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