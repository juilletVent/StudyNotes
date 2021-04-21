<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [为 Nginx 添加自定义模块](#%E4%B8%BA-nginx-%E6%B7%BB%E5%8A%A0%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A8%A1%E5%9D%97)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 为 Nginx 添加自定义模块

1. 执行 nginx -V 查看现有的模块，并保存相关编译参数
2. 下载 nginx 源代码放到 a 目录下
3. 下载所需的第三方模块也放到 a 目录下
4. 解压源代码以及拓展模块到各自的文件夹下
5. 在 nginx 源码目录执行 ./configure [上面保存的编译参数][--add-module=../nginx-rtmp-module-1.2.1] [--add-module=模块路径，注意目录的相对位置，多个拓展写多个--add-module 即可]
6. 执行 make
7. 编译后的 nginx 在当前目录的 objs 文件夹内
8. 备份 /usr/sbin 目录下的 nginx 文件
9. 把编译后的 objs 文件夹内的 nginx 文件移动到 usr/sbin 文件夹内
10. 重启 nginx
