<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [匹配模式](#%E5%8C%B9%E9%85%8D%E6%A8%A1%E5%BC%8F)
- [优先级](#%E4%BC%98%E5%85%88%E7%BA%A7)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

**重点2：所有的匹配规则，在默认情况下都会把命中的路径应用在请求的URI上，如果不需要命中的规则，则需要在proxy_pass或者alias的末尾添加一个正斜线。官方解释：如果proxy_pass具备资源URI定位符，则在请求时，将不会传递命中的代理URI；综上，如果你是用的是正则匹配，则一定要小心这里的坑，一般推荐配合前缀路径进行匹配,整站反代的话推荐使用独立的server段进行配置，因为如果以现有站点进行混用，由于正则命中优先于前缀命中，在静态资源部分会导致全部命中到当前站点，而不是目标站点。**

重点2说明：

~~~nginx
# 转发情况 /local/1.png => 127.0.0.1:8080/1.png
location /local {
    proxy_pass http://127.0.0.1:8080/;
    proxy_read_timeout 3s;
}

# 转发情况 /local/1.png => 127.0.0.1:8080/local/1.png
location /local {
    proxy_pass http://127.0.0.1:8080;
    proxy_read_timeout 3s;
}
~~~



## 优先级

顺序优先级：
(location = 完整路径) >  (location ^~ 路径) > (location ~ 或者 location ~* 正则顺序)> (location 起始路径[如果有多个前缀匹配规则，则以最长的命中为准])  > (/)
