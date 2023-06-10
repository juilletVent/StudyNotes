## 创建流量统计

创建针对某个端口的 TCP、UDP 入站与出站流量统计规则

```shell
# 创建针对端口1111的入站与出站TCP流量统计规则
iptables -I INPUT -p tcp --dport 1111 -j ACCEPT -m comment --comment "1111端口的入站TCP流量统计规则"
iptables -I OUTPUT -p tcp --sport 1111 -j ACCEPT -m comment --comment "1111端口的出站TCP流量统计规则"
# 创建针对端口1111的入站与出站UDP流量统计规则
iptables -I INPUT -p udp --dport 1111 -j ACCEPT -m comment --comment "1111端口的入站TCP流量统计规则"
iptables -I OUTPUT -p udp --sport 1111 -j ACCEPT -m comment --comment "1111端口的出站TCP流量统计规则"

# 删除对应的规则只需要镜 -I 改为 -D 即可，删除后重新添加即可完成流量统计的重置
iptables -D INPUT -p tcp --dport 1111 -j ACCEPT -m comment --comment "1111端口的入站TCP流量统计规则"
# 删除所有的默认Chain规则，此命令谨慎调用，Docker可能为自己创建了一些规则，此命令会将所有规则删除，执行前请确认是否有其他规则
iptables -F
# 删除所有自定义的链
iptables -X
```

## 创建出站流控

创建针对某个端口的流量控制，注意修改网卡的名称，此处使用的样例网卡名称为 eth0，请修改为实际的网卡名称，当前默认带宽为 100Mbit，限速为 4Mbit

```shell
# 为网卡创建默认队列，默认使用 100 标号的分类
tc qdisc add dev eth0 root handle 1:0 htb default 100


# 为默认队列添加总限速速度为 100Mbps 的默认限速Class
tc class add dev eth0 parent 1:0 classid 1:100 htb rate 100mbit burst 100mbit ceil 100mbit

# 创建 30Mbit 保底限速的子分类，也可以占满带宽，此条目使用 1111 标号
tc class add dev eth0 parent 1:100 classid 1:1111 htb rate 30mbit burst 100mbit ceil 100mbit
# 创建 70Mbit 保底限速的子分类，也可以占满带宽，此条目使用 1112 标号
tc class add dev eth0 parent 1:100 classid 1:1112 htb rate 70mbit burst 100mbit ceil 100mbit

# 分别为子Class创建过滤器，parent仍然需要指定为队列的编号，而不是class的编号，流量始终是以队列为单位进行控制的，Class只是作为处理分支，不是匹配分支
tc filter add dev ens18 parent 1:0 protocol ip prio 1 u32 match ip sport 1111 0xffff flowid 1:1111
tc filter add dev ens18 parent 1:0 protocol ip prio 1 u32 match ip sport 1112 0xffff flowid 1:1112
```

# 创建入站流控

> 简单的进行入站流控：

```shell
# 添加入站流控根队列
tc qdisc add dev eth0 ingress

# 控制入站速度（不知道为什么入站过流程并未遵守class设置的限速侧率，只能通过在filter上直接设置限制速率的形式来限速了）
# 研究了很久，还是无法通过tc对入站流量直接进行精细的控制，可能只能借助虚拟网卡外加tc出站的形式来实现了
tc filter add dev eth0 parent ffff: protocol ip prio 1 u32 match ip dport 1111 0xffff police rate 10Mbit burst 10Mbit flowid 1:0
```

> 完整的入站流控策略：

因为上传对于服务器来说，入站流量，因此只能通过 Ingress qdisc 来处理，但 tc 的 Ingress qdisc 本身功能很弱，所以我们这里使用虚拟设备 ifb 来处理入站数据，核心思路就是将入站数据转变为出站数据，然后使用 tc 强大的出站控制进行流控即可。

大致思路为：

1. 加载内核模块，开启虚拟网卡设备
2. 检查 ifb 网卡是否存在，如果不存在则创建
3. 创建物理网卡的入站默认队列
4. 将物理网卡的入站流量重定向到虚拟网卡
5. 然后为虚拟网卡的出口方向应用出口流控即可完成入站流控（借助虚拟网卡将入站流量变为虚拟网卡的出站流量，然后使用 tc 就行控制即可）

下面是一个样例：

```shell
# 首先需要加载内核模块（卸载模块的命令为：modprobe ifb -R）
modprobe ifb
# 启用虚拟网卡设备ifb0
ip link set dev ifb0 up
# 如果没有ifb0设备，可以通过下面的命令进行创建
# 创建 ifb0 虚拟网卡：ip link add ifb0 type ifb
# 删除 ifb0 虚拟网卡：ip link del ifb0 type ifb

# 创建物理网卡的入站默认队列
tc qdisc add dev eth0 ingress

# 将物理网卡的入站流量重定向到虚拟网卡
tc filter add dev eth0 parent ffff: protocol ip u32 match u32 0 0 action mirred egress redirect dev ifb0
# tc filter add dev eth0 parent ffff: protocol ip u32 match u32 0 0 flowid 1:1 action mirred egress redirect dev ifb0

# 为虚拟网卡的出口方向应用出口流控
tc qdisc add dev ifb0 root handle 1:0 htb default 100
tc class add dev ifb0 parent 1:0 classid 1:100 htb rate 100mbit burst 100mbit ceil 100mbit
tc class add dev ifb0 parent 1:100 classid 1:1111 htb rate 30mbit burst 100mbit ceil 100mbit
tc class add dev ifb0 parent 1:100 classid 1:1112 htb rate 70mbit burst 100mbit ceil 100mbit
tc filter add dev ifb0 parent 1:0 protocol ip prio 1 u32 match ip dport 1111 0xffff flowid 1:1111
tc filter add dev ifb0 parent 1:0 protocol ip prio 1 u32 match ip dport 1112 0xffff flowid 1:1112
```

至此，对应端口的入站流控就完成了，其核心难点在于如何将入站流量重定向到虚拟网卡上，这里使用的是 tc 的 filter 功能，将入站流量的所有数据包都重定向到虚拟网卡上，然后再对虚拟网卡的出口方向进行流控（主要坑就是因为 tc 对入站方向流控功能的羸弱）。

## 查看当前流控策略

```shell
tc -s qdisc show dev eth0
tc -s class show dev eth0
tc -s filter show dev eth0
```

## 查看所有的 iptables 规则

```shell
# -n 使用明确的地址与端口显示，不使用域名与服务名
# -v 显示详细信息
# -x 用量使用数字显示，不使用友好单位
iptables -L -vxn
```

## 删除网卡的所有的流控

```shell
# 删除出站根队列，这将会连带删除所有的子队列以及过滤器
tc qdisc del dev eth0 root
# 删除入站根队列
tc qdisc del dev eth0 ingress
```
