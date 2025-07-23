<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [非标准端口 HTTP 重定向到 HTTPS](#%E9%9D%9E%E6%A0%87%E5%87%86%E7%AB%AF%E5%8F%A3-http-%E9%87%8D%E5%AE%9A%E5%90%91%E5%88%B0-https)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 非标准端口 HTTP 重定向到 HTTPS

标准端口下，直接将 80 端口的请求直接重定向到 443 端口下使用 HTTPS 即可，但是非标端口会引发连接失败，在 Nginx 中使用自定义错误代码来描述错误，然后使用`error_page`来重定向到 HTTPS。

```nginx
server {
    listen 8443 ssl http2;
    server_name www.example.com;
    # 关键配置
    error_page 497 https://$host:8443$request_uri;
}
```
