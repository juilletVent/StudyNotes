<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [访问限制配置](#%E8%AE%BF%E9%97%AE%E9%99%90%E5%88%B6%E9%85%8D%E7%BD%AE)
    - [limit_conn](#limit_conn)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 访问限制配置

#### limit_conn

limit_conn_zone key zone=name:size

key为限制的客户端预定义类型，如客户端IP。zone为规则命名，size为空间大小

context:http

number为连接数

limit_conn zoneName number

contest:http,server,location

2. limit_req

