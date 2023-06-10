## TC 流控策略测试

### 添加流控策略

首先创建根队列、根分类以及子分类，用于控制总带宽和子分类的带宽，此处样例将机器的总带宽设置为 100Mbit，子分类的带宽分别为 ：

- ee26：最低保证带宽 30Mbit，最大带宽 100Mbit
- ee27：最低保证带宽 60Mbit，最大带宽 100Mbit

```shell
# 创建根
tc qdisc add dev ens18 root handle 1: htb default 1 &&
  # 创建根队列的根Class，限速100Mbit
  tc class add dev ens18 parent 1: classid 1:1 htb rate 100Mbit ceil 100Mbit &&
  # 添加子Class，限速10Mbit,ID为ee26
  tc class replace dev ens18 parent 1:1 classid 1:ee26 htb rate 30Mbit ceil 100Mbit &&
  # 添加子Class，限速20Mbit,ID为ee27
  tc class replace dev ens18 parent 1:1 classid 1:ee27 htb rate 60Mbit ceil 100Mbit
```

然后为子分类添加过滤器，用于匹配流量，将流量归类到对应的子分类中，样例将端口 1111 的流量归类到 ee26，端口 1112 的流量归类到 ee27，filter 标记方式我们使用两种方式来实现。

为什么需要标记 filter 呢？因为我们需要对 filter 进行管理，如果不标记，那么我们无法对 filter 进行删除，filter 不像 Class，可以借助删除跟队列进行连带删除，filter 只能通过 ID 进行删除，或者其他标记手段进行匹配删除，因此我们需要标记 filter，以便于后续管理，如果直接使用添加命令修改，将 add 修改为 del，并且你没有设置合适的 handle-id，那么你将无法删除 filter，或者一次性删除所有 filter。

因为，不提供 handle-id 的情况下，如果无法通过其他手段确定到要删除的 filter 的话，删除动作将删除所有的 filter，导致该parent下的所有流控策略全部失效。（一波送走）

首先我们采用 handle-id 来标记 filter 进行添加，观察到 id 参数为：`handle 0x800::1`，0x800 为 HTB 队列 filter 的固定命名空间，::1 为 filter 的 ID，我们可以将其简化为：`handle 800::1`，同理，我们可以将其简化为：`handle 800::2`，这样我们就可以通过 ID 来删除 filter 了，这种方式的缺点是，ID 的取值范围受限，只有 0x000-0xfff，总计 4096 个 ID，如果你要使用 ID 对 filter 进行管理，最好不要超过 0xfff。

handle-id 官方文档定义如下：`HANDLE := { u12_hex_htid:[u8_hex_hash:[u12_hex_nodeid] | 0xu32_hex_value }`，[参考文档地址](https://man7.org/linux/man-pages/man8/tc-u32.8.html)

样例如下：

```shell
tc filter replace dev ens18 parent 1: handle 800::1 protocol ip prio 1 u32 match ip sport 1111 0xffff flowid 1:ee26
tc filter replace dev ens18 parent 1: handle 800::2 protocol ip prio 1 u32 match ip sport 1112 0xffff flowid 1:ee27
```

然后我们采用 prio 来标记 filter 进行添加，观察到 prio 参数为：`prio 1`，1 为优先级，优先级范围为：1-65535，数值越小，优先级越高，由于我们总是为端口创建单独的分类，因此不用担心冲突或者优先级的问题，我们可以借助优先级来标识 filter，而不是使用取值范围受限的 ID。

样例如下：

```shell
tc filter replace dev ens18 parent 1: protocol ip prio 1111 u32 match ip sport 1111 0xffff flowid 1:ee26
tc filter replace dev ens18 parent 1: protocol ip prio 1112 u32 match ip sport 1112 0xffff flowid 1:ee27
```

最后添加一条默认的过滤器，用于匹配所有未匹配到的流量，将其归类到 1:1，以达到整体带宽控制的目的。

```shell
# tc filter replace dev ens18 parent 1: protocol ip prio 65535 u32 match ip sport 0 0xffff flowid 1:1
tc filter replace dev ens18 parent 1: protocol all prio 65535 u32 match ip protocol 0 0x00 flowid 1:1
```

至此，我们已经完成了流控策略的添加，我们可以通过 [查看命令](#查看命令) 来查看当前 ens18 网卡的流控策略

### 删除流控策略

因为前面我们使用了两种方式来标记 filter，因此我们也需要两种方式来删除 filter，我们可以通过 ID 来删除 filter，也可以通过 prio 来删除 filter，首先，我们通过 ID 来删除 filter，样例如下：

```shell
tc filter del dev ens18 parent 1: protocol ip prio 1 handle 800::1 u32
tc filter del dev ens18 parent 1: protocol ip prio 1 handle 800::2 u32
```

然后，我们通过 prio 来删除 filter，样例如下：

```shell
tc filter del dev ens18 parent 1: protocol ip prio 1111 u32
tc filter del dev ens18 parent 1: protocol ip prio 1112 u32
```

删除 filter 之后，Class 的锁定状态会被解除，此时我们就可以通过直接删除或间接删除来移除 Class 分类了，样例如下：

```shell
# 直接删除
tc class del dev ens18 parent 1:1 classid 1:ee26 htb rate 10Mbit ceil 10Mbit
tc class del dev ens18 parent 1:1 classid 1:ee27 htb rate 10Mbit ceil 10Mbit
# 通过删除上级Class间接删除下级所有的Class，此处实际上是删除了根分类
tc class del dev ens18 parent 1: classid 1:1 htb rate 100Mbit ceil 100Mbit
```

删除 Class 后，我们继续删除根队列，样例如下：

```shell
# 删除根队列
tc qdisc del dev ens18 root
```

至此，我们已经完成了流控策略的删除，可以通过查看命令进行确认。

### 查看命令

```shell
# 查看队列
tc -s -d qdisc show dev ens18
# 查看分类
tc -s -d class show dev ens18
# 查看过滤器
tc -s -d filter show dev ens18
```
