## 创建流量统计

创建针对某个端口的 TCP、UDP 入站与出站流量统计规则

```shell
# 创建针对端口1111的入站与出站TCP流量统计规则
iptables -I INPUT -p tcp --dport 1111 -j ACCEPT -m comment --comment "1111端口的入站TCP流量统计规则"
iptables -I OUTPUT -p tcp --sport 1111 -j ACCEPT -m comment --comment "1111端口的出站TCP流量统计规则"
# 创建针对端口1111的入站与出站UDP流量统计规则
iptables -I INPUT -p udp --dport 1111 -j ACCEPT -m comment --comment "1111端口的入站TCP流量统计规则"
iptables -I OUTPUT -p udp --sport 1111 -j ACCEPT -m comment --comment "1111端口的出站TCP流量统计规则"
```

查看所有的 iptables 规则：

```shell
# -n 使用明确的地址与端口显示，不使用域名与服务名
# -v 显示详细信息
# -x 用量使用数字显示，不使用友好单位
iptables -L -vxn
```

## 创建流控

创建针对某个端口的流量控制，注意修改网卡的名称，此处使用的样例网卡名称为 eth0，请修改为实际的网卡名称，当前默认带宽为 100Mbit，限速为 4Mbit

```shell
# 为网卡创建队列，默认使用 100Mbit的队列
tc qdisc add dev eth0 root handle 1:0 htb default 100

# 创建入站队列，如果不需要控制入站速率，也可以不创建
tc qdisc del dev eth0 ingress

# 删除跟队列，这将会连带删除所有的子队列以及过滤器
tc qdisc del dev eth0 root

# 添加默认限速速度分类 100Mbps
tc class add dev eth0 parent 1:0 classid 1:100 htb rate 100Mbit
# 添加限速速度分类 4Mbps
tc class add dev eth0 parent 1:0 classid 1:4 htb rate 4Mbit


# 控制出站速度
tc filter add dev eth0 parent 1:0 protocol ip prio 1 u32 match ip sport 1111 0xffff flowid 1:4
# 控制入站速度（不知道为什么入站过流程并未遵守class设置的限速侧率）
tc filter add dev eth0 parent ffff: protocol ip prio 1 u32 match ip dport 1111 0xffff police rate 10Mbit burst 10Mbit flowid 1:10

```
