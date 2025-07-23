<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [基于 hashlimit 的流控策略](#%E5%9F%BA%E4%BA%8E-hashlimit-%E7%9A%84%E6%B5%81%E6%8E%A7%E7%AD%96%E7%95%A5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
