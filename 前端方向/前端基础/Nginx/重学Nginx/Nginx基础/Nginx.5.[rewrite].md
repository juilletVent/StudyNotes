## Rewrite

语法： rewrite regex replacement flag

上下文：server, location, if

flag 可选值：

- last – 停止处理重写模块指令，之后搜索 location 与更改后的 URI 匹配。
- break – 完成重写指令。
- redirect – 返回 302 临时重定向
- permanent – 返回 301 永久重定向

将 asset 重写到 img 上

```nginx
# 重写规则
location ^~ /asset {
    rewrite ^/asset/(.*\.png)$ /img/$1 last;
    return 403;
}
# 实际处理
location ^~ /img {
    root /root/nginx-install/nginx/sbin/web;
}
```
