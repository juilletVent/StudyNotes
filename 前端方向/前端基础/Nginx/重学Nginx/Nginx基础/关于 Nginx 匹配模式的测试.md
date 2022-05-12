<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [关于 Nginx 匹配模式的测试](#%E5%85%B3%E4%BA%8E-nginx-%E5%8C%B9%E9%85%8D%E6%A8%A1%E5%BC%8F%E7%9A%84%E6%B5%8B%E8%AF%95)
  - [关于反向代理转发的尾部斜线问题](#%E5%85%B3%E4%BA%8E%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E8%BD%AC%E5%8F%91%E7%9A%84%E5%B0%BE%E9%83%A8%E6%96%9C%E7%BA%BF%E9%97%AE%E9%A2%98)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 关于 Nginx 匹配模式的测试

```nginx
# 模式：=
# 结果：
# - 如果proxy_pass没有子路径，则携带全路径URI转发
# - 如果proxy_pass有子路径，不携带任何东西直接访问配置的地址
# 访问：/myapi
# 等同：https://www.cqzcjtest1.gm/gwebsite/api/v1/projects/program/001/homeMarq
location = /myapi {
  proxy_pass https://www.cqzcjtest1.gm/gwebsite/api/v1/projects/program/001/homeMarq;
  proxy_read_timeout 3s;
}

# 模式：^~
#  - 如果proxy_pass没有子路径，则携带全路径URI转发
#  - 如果proxy_pass有子路径，则携带URI除了模式串之外的部分进行转发（可以起到网关重命名的效果）
# 访问：/mygwebsite/api/getUser
# 等同：https://www.cqzcjtest1.gm/gwebsite/api/getUser
location ^~ /mygwebsite {
  proxy_pass https://www.cqzcjtest1.gm/gwebsite;
  proxy_read_timeout 3s;
}

# 模式：~
# 结果：
#  - 如果proxy_pass没有子路径，则携带全路径URI转发
#  - 正则匹配模式下，相较于其他模式proxy_pass的配置略有不同，正则模式下，proxy_pass不能仅配置为某个子路径URI，必须是下面的
#    规则之一：
#    1. 使用正则前向引用的子路径组合，例如：proxy_pass https://www.a.com/$1
#    2. proxy_pass直接配置为某个域名，proxy_pass https://www.a.com
#    不允许直接配置为子路径，例如：proxy_pass https://www.a.com/a（Nginx不允许这样配置）

location ~ ^/gwebsite {
  proxy_pass https://www.cqzcjtest1.gm;
  proxy_read_timeout 3s;
}

# 模式：无
# 结果：
#  - 如果proxy_pass没有子路径，则携带全路径URI转发
#  - 如果proxy_pass有子路径，则携带URI除了模式串之外的部分进项转发
# 访问：/mygwebsite/api/getUser
# 等同：https://www.cqzcjtest1.gm/gwebsite/api/getUser
location /mygwebsite {
  proxy_pass https://www.cqzcjtest1.gm/gwebsite/;
  proxy_read_timeout 3s;
}
```

**总结：简单来说，模式匹配串是否参与资源寻找主要是看 proxy_pass 是否含有子路径**

### 关于反向代理转发的尾部斜线问题

接口反向代理，经测试结果如下：

| 类型                    | 真值 | 真值 | 真值 | 真值 |
| ----------------------- | ---- | ---- | ---- | ---- |
| 模式串是否有尾斜线      | 有   | 没有 | 有   | 没有 |
| proxy_pass 是否有尾斜线 | 有   | 没有 | 没有 | 有   |
| 接口代理是否成功        | 成功 | 成功 | 失败 | 成功 |

原因：主要是 Nginx 对 uri 的解释，带斜线的 URI 被解释为目录，不带斜线的被解释为资源，资源映射为资源、目录映射为目录是是合理的，如果不匹配，则会形成一些非法的 URI。

假设 a、b 均为目录，c 为某种资源，路径资源类型不匹配可能会形成以下的路径组合，均会导致 404：

- /a//b/c（路径标识重复）
- a/b/c（无根路径）
- /ab/c（路径标识缺失）
