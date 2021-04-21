<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [站点基础配置](#%E7%AB%99%E7%82%B9%E5%9F%BA%E7%A1%80%E9%85%8D%E7%BD%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 站点基础配置

简单的样例配置

```nginx
# 运行 nginx 的所属组和所有者，一定要配置正确否则将会导致403错误：用户 用户组
# 还需要注意文件夹权限，如果启动的用户不具备相关目录的执行权限，以及文件的读取权限都将导致403发生
user www www;
worker_processes 2; # 开启两个 nginx 工作进程,一般几个 CPU 核心就写几
error_log logs/error.log notice; # 错误日志路径
pid logs/nginx.pid; # pid 路径
events {
  worker_connections 1024; # 一个进程能同时处理 1024 个请求
}
http {
  include mime.types;
  default_type application/octet-stream;
  log_format main ‘ $remote_addr – $remote_user [$time_local] “ $request” ‘
  ‘ $status $body_bytes_sent “$http_referer” ‘
  ‘” $http_user_agent” “ $http_x_forwarded_for”‘ ;
  access_log logs/access.log main; # 默认访问日志路径
  sendfile on;
  keepalive_timeout 65; # keepalive 超市时间
  # 开始配置一个域名,一个 server 配置段一般对应一个域名
  server {
    listen 80; #
    # 在本机所有 ip 上监听 80,也可以写为 192.168.1.202:80,这样的话,就只监听 192.168.1.202 上的 80 口
    server_name www.heytool.com; # 域名,可以写多个，空格隔开，作用等价
    root /www/html/www.heytool.com; # 站点根目录（程序目录）
    index index.html index.htm; # 索引文件
    location / {
      root /www/html/www.heytool.com; # 站点根目录（程序目录）
    }
    error_page 500 502 503 504 /50x.html;
    # 定义错误页面,如果是 500 错误,则把站点根目录下的 50x.html 返回给用户
    location = /50x.html {
      root /www/html/www.heytool.com;
    }
  }
  # 开始配置站点 bbs.heytool.com
  server {
    listen 80;
    server_name bbs.heytool.com;
    root /www/html/bbs.heytool.com;
    index index.html index.htm; # 索引文件
    location / {
      root /www/html/bbs.heytool.com;
    }
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
      root /www/html/bbs.heytool.com;
    }
  }
}
```
