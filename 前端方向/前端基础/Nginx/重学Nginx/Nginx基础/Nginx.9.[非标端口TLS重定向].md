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
