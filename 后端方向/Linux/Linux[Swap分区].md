## 创建于挂载 SWAP 分区

```shell
# 创建分区 count 的单位为 KB，这条命令创建了一个4GB的SWAP分区文件
dd if=/dev/zero of=/swap bs=1024 count=4194304
# 格式化分区
mkswap /swap
# 挂载分区
swapon /swap

# 卸载分区
swapoff /4Gswap
```

## 开机自动挂载

**重点：确保配置的 swap 文件能够正常挂载，否则重启之后将无法进入系统**

```shell
vim /etc/fstab
# 在文件底部新增，第一列的SWAP文件必须存在，切能够挂载，否则重启后将导致无法进入系统
/swap swap swap default 0 0
# 或者下面这行（瓦工是用的下面这行）
/swap  none  swap  sw 0  0
```

_Tips:如果是想要扩容 swap，就先创建一个临时的 swap 挂载上去，然后卸载掉之前的 swap，为之前的 swap 分区扩容，然后挂载，最后卸载掉临时 swap 即可_

## 虚拟内存使用积极程度

系统应始终积极使用物理内存来获得更高的性能，内核有个参数进行调整这个行为，这个参数叫做 swappiness，它的值可以在 0 到 100 之间，0 表示内核不会主动使用 swap，100 表示内核会尽可能的使用 swap，这个值的默认值是 60，可以通过下面的命令查看：

```shell
cat /proc/sys/vm/swappiness
```

如果要临时调整该参数，可以通过下面的命令：

```shell
# 调整为10
sysctl vm.swappiness=10
```

如果要永久调整该参数，可以通过下面的命令：

```shell
# 编辑配置文件
vim /etc/sysctl.conf
# 在文件底部新增
vm.swappiness=10
# 使配置生效
sysctl -p
```

以上命令均需要 root 权限

## 一个 swap 挂载脚本

```shell
#!/bin/bash

# 创建虚拟内存文件
dd if=/dev/zero of=/swap bs=1024 count=512000

# 格式化分区文件
mkswap -f /swap

# 挂载Swap分区文件
swapon /swap

# 设置开机自动挂载
echo "/swap swap swap default 0 0" >>/etc/fstab

```
