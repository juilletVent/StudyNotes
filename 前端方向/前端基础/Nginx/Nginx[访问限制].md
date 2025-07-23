<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [访问限制配置](#%E8%AE%BF%E9%97%AE%E9%99%90%E5%88%B6%E9%85%8D%E7%BD%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 访问限制配置

```nginx
http{
    # 创建Session池，限制每个IP的连接数，链接速率为每秒0.5个请求
    limit_req_zone $binary_remote_addr zone=perip:10m rate=30r/m;
    server {
        # 应用请求限制，并设置突发请求的最大值为3
        limit_req zone=perip burst=3 nodelay;
    }
}
```
