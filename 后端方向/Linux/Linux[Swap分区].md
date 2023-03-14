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
