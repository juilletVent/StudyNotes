## 负载均衡配置

> 栗子

```nginx
upstream serverName {
	# 负载均衡调度模式
	ip_hash;
	# 权重1，最大失败次数5，死亡后的复活时间
	server www.server0.com weight=1 max_fails=5 fail_timeout=10s;
	server www.server1.com weight=5;
	# 后备服务器，所有实例均宕机的时候转至这个位置
	server www.server2.com backup;
	# 停用，不转发到只配置
	server www.server3.com done;
}
```

## 负载均衡中的配置

- done 停用当前服务器，不会转发请求到该服务器
- backup 后备服务器，当所有负载均衡全部宕机不可用时才会转发请求到此服务器
- max_fails 允许请求失败的次数，当负载服务器，请求失败次数超过此值时将会暂停转发请求到此服务
- fail_timeout 出发服务暂停后，服务暂停转发的时长
- max_conns 限制最大的接受连接数

#### 负载均衡调度模式

| 配置模式                  | 含义                                            | 语法                                    |
| :------------------------ | :---------------------------------------------- | :-------------------------------------- |
| default                   | 什么都不写，默认时间线，依次轮询                | 无                                      |
| weight                    | 加权轮询，配置权重轮询，出现概论根据权重决定    | `server www.server1.com weight=5;`      |
| ip_hash                   | 固定 ip 转发到固定负载，避免身份令牌丢失的问题  |                                         |
| last_conn                 | 最少连接数，将请求分发到目前负载最小的服务端    |                                         |
| url_hash                  | 按照 url 的 hash 结果分发请求                   | upstream 下添加`hash $request_uri;`即可 |
| hash key [1.7.2 以上版本] | 自定义 hash 分发,语法规则`hash key [condition]` |                                         |
