<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [匹配规则](#%E5%8C%B9%E9%85%8D%E8%A7%84%E5%88%99)
- [Alias 与 Root](#alias-%E4%B8%8E-root)
- [反向代理中的路径重写](#%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E4%B8%AD%E7%9A%84%E8%B7%AF%E5%BE%84%E9%87%8D%E5%86%99)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 匹配规则

语法规则： location [=|~|~*|^~] /uri/ { … }

| 匹配规则   | 优先级                                       | 解释                                                                                              |
| :--------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| =          | 最高                                         | 表示精确匹配,这个优先级也是最高的                                                                 |
| ^~         | 遵循贪婪匹配原则（多条规则命中，较长的取胜） | 表示 uri 以某个常规字符串开头，理解为匹配 url 路径即可                                            |
| ~ 或 ~\*   | 匹配即终止                                   | 前者表示区分大小写的正则匹配 ，后者则不区分大小写                                                 |
| !~ 与 !~\* | 反向匹配                                     | 分别为区分大小写不匹配及不区分大小写不匹配的正则                                                  |
| 无         | 遵循贪婪匹配原则（多条规则命中，较长的取胜） | 表示 uri 以某个常规字符串开头（匹配效果与^~一致，butt，不写规则将会导致匹配优先级下降至正则之后） |
| /          | 最低                                         | 通用匹配，任何请求都会匹配到，默认匹配                                                            |

## Alias 与 Root

在配置文件目录时经常使用两个指令，alias 与 root，其主要区别在于寻找文件时命中的模式字符串是否参与寻找，alias 不参与，root 参与：

```nginx
   # 匹配路径将不会出现在寻找文件的路径上
    location /i/ {
        alias /data/w3/images/;
    }
    # on request of “/i/top.gif”, the file /data/w3/images/top.gif will be sent.
    ~~~
```

如果使用 root ：

```nginx
# 请求 /imgages/1.png 返回 /data/w3/imgages/1.png
location /images/ {
    root /data/w3;
}
#等同于,官方在这种场景下推荐使用root
location /images/ {
    alias /data/w3/images/;
}
```

**重点：alias 一定要配置为目录，也就是尾巴上面一定要有/，不加斜线的异教徒配置法会导致一些莫名其妙的匹配行为，看不懂。**

## 反向代理中的路径重写

需求：将 `https://www.a.com/gatewayA` 反向代理到 `https://www.b.com/gatewayB`

```nginx
# 实际反向代理
location ~ ^/gwebsite {
    proxy_pass https://www.a.com;
    proxy_set_header host www.a.com;
    proxy_read_timeout 3s;
}
# 路径重写
location ^~ /mygwebsite {
    # 可以进行多次重写
    rewrite ^/mygwebsite/(.*)$ /gwebsite1/$1;
    # 如果需要进而二次分发，则使用last，如果不需要，则使用break
    # 反向代理中由于需要在完成重写后进行二次分发，所以基本不可能使用到break
    # 只有静态资源的路径重写（例如：伪静态）可能会用到break
    rewrite ^/gwebsite1/(.*)$ /gwebsite/$1 last;
    return 403;
}
```
