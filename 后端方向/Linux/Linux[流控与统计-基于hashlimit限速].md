## 基于 hashlimit 的流控策略

样例：

```shell
iptables -A INPUT -p tcp -s 3.3.3.3 -m hashlimit \
--hashlimit-name limitDownLink \
--hashlimit-upto 12500kb/s \
--hashlimit-mode srcip \
--hashlimit-burst 12500kb \
-j ACCEPT

iptables -A INPUT -p tcp -s 3.3.3.3 -j DROP
```

参数说明：

- `--hashlimit-name limitDownLink`：限速规则的名称，可以自定义，唯一
- `--hashlimit-upto 12500kb/s`：令牌生成速率，理解为限速速率即可
- `--hashlimit-mode srcip`：限速模式，可以是 srcip、srcport、dstip、dstport。指定之后对应的目标使用同一个令牌桶，共享同一个限速规则
- `--hashlimit-burst 12500kb`：初始令牌桶大小
