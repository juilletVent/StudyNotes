<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [安装、编译参数](#%E5%AE%89%E8%A3%85%E7%BC%96%E8%AF%91%E5%8F%82%E6%95%B0)
  - [Linux 下的编译安装](#linux-%E4%B8%8B%E7%9A%84%E7%BC%96%E8%AF%91%E5%AE%89%E8%A3%85)
  - [windows 下的编译安装](#windows-%E4%B8%8B%E7%9A%84%E7%BC%96%E8%AF%91%E5%AE%89%E8%A3%85)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 安装、编译参数

### Linux 下的编译安装

Linux：下载源码编译或者直接使用系统包管理器进行安装，可在http://nginx.org/en/download.html下载.tar.gz的源码包，如（nginx-1.4.7.tar.gz）

下载后解压缩，进入文件夹，执行 configure，并添加你需要进行编译添加的模块，已经安装路径等信息

栗子：

    ./configure --prefix=/opt/demo/nginx --add-module=/home/fastdfs-nginx-module/src  --with-http_stub_status_module --with-http_ssl_module

相关参数：

- --prefix 用于指定 nginx 编译后的安装目录（如果你是用 install 进行安装的话这个参数将指明安装路径，自行拷贝的话就无所谓了）
- --add-module 为添加的第三方模块，此次添加了 fdfs 的 nginx 模块
- --with...\_module 表示启用的 nginx 内置模块 模块，如此处启用了 http_ssl_module 模块

_Tips:多个参数只需要空格隔开，配置多个即可，编译需要 PCRE 以及 Openssl 支持，一般来说 Linux 系统都有，如果没有则需要使用 yum 、 apt-get 之类的包管理器进行安装_

_tips2：查看现有 nginx 的编译参数：`nginx -v`_

安装:

    make

此操作将产生最终的目标可执行文件，如果是为已有的 Nginx 添加模块，则将生成的 Nginx 替换之前的 Nginx 可执行文件即可，如果是新安装，则需要继续执行：

    make install

此操作将会在之前设置的`--prefix`参数路径下 copy 所需要的所有文件，然后在`sbin`创建 nginx 可执行文件的软连接，安装就完成了，形如：

    ln -s /opt/demo/nginx/sbin/nginx /usr/bin/nginx

> 常用 Nginx 指令

```shell
# 重载配置文件
nginx -s reload
# 测试conf文件是否有误
nginx -t
# 测试conf文件是否有误，并打印出来
nginx -T
# 指定conf文件运行nginx
nginx -c ./config.nginx
# 停止
nginx -s stop
```

Tips:可以查看使用`nginx -h`查看更加详细的指令帮助

### windows 下的编译安装

编译过程需要使用到 MSYS 集成的脚本环境（MinGW，以及 GUN 相关的编译工具链），Nginx 在 Win 下的性能表现不佳，没有太大的必要自己去编译，而且配套环境基本都需要自己手动搭建相对较为麻烦,经过我的一系列折腾，编译未通过（ActiveState 最新版的兼容问题，旧版又限制下载），有兴趣可以跟着这个博文折腾一下

https://blog.csdn.net/u012156872/article/details/104166782
