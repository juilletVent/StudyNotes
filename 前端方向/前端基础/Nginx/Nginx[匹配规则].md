## 匹配模式

- = 开头表示精确匹配 如 A 中只匹配根目录结尾的请求，后面不能带任何字符串。
- 空匹配符：什么都不写，直接书写路径，匹配以指定模式开始的 URI
- ^~ 开头表示uri以某个正则匹配模式开始
- ~ 开头表示区分大小写的正则匹配;
- ~* 开头表示不区分大小写的正则匹配
- / 通用匹配, 如果没有其它匹配,任何请求都会匹配到

**重点：所有正则匹配模式，在进行资源引用时会把匹配到的正则加到配置的路径上，所以不要把location上配置的正则路径在proxy_pass或者root上再次书写**

**栗子解释：**

~~~nginx
# 简单的正确转发
location /app_download {
    root $applicationPath;
    expires -1;
    proxy_read_timeout 3s;
}
# 使用正则的正确转发
location ^~ /app_download {
    # 转发到 $applicationPath/app_download 下
    root $applicationPath;
    expires -1;
    proxy_read_timeout 3s;
}
# 使用正则的错误转发
location ^~ /app_download {
    # 错误原因：不需要再书写子路径
    root $applicationPath/app_download;
    expires -1;
    proxy_read_timeout 3s;
}
~~~

## 优先级

顺序优先级：
(location = 完整路径) > (location 起始路径) > (location ^~ 路径) > (location ~ 或者 location ~* 正则顺序) > (/)
