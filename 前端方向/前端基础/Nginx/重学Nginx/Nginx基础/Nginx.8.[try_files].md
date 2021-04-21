<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [try_files 使用详解](#try_files-%E4%BD%BF%E7%94%A8%E8%AF%A6%E8%A7%A3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## try_files 使用详解

try_files

语法: try_files file ... uri 或 try_files file ... = code

作用域: `server location`

按顺序检查文件是否存在，返回第一个找到的文件，try_files的路径尝试会重新分发一次，下面是解释：


~~~nginx
location ^~ /account {
    alias $applicationPath\\ezt-platform\\;
    index index.html index.htm;
    expires -1;
    # 重新分发至/account/index.html，实际匹配文件路径:$applicationPath\\ezt-platform\\index.html
    # alias 模式path不参与文件寻找
    try_files $uri /account/index.html =404;
}

location / {
    expires -1;
    root /opt/gectest/websrc/ezt-platform;
    index index.html index.htm;
    try_files $uri /index.html;
}
~~~
