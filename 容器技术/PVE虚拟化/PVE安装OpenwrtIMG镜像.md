## 安装步骤如下

1. 上传 img 镜像文件到 PVE 镜像管理中，并记录上传后的路径位置，通常为：`/var/lib/vz/template/iso/xxxx.img`，记下来，后续会用到
2. 正常新建虚拟机，操作系统选择：“不使用任何介质”，正常分配相关资源以及网络接口即可
3. 创建完成后，来到硬件选项卡，分离磁盘，然后删除磁盘
4. 执行 Shell 命令创建 Op 磁盘，命令如下：

```bash
# 注意修改虚拟机编号，以及镜像路径，末尾的 local-lvm 为存储位置，如果你的存储位置不是 local-lvm，请修改

# 默认情况下未删除local-lvm的话就是下面这条命令
qm importdisk 100 /var/lib/vz/template/iso/openwrt-07.12.2023-x86-64-generic-squashfs-combined.img local-lvm

# 如果删除了local-lvm，那么就是下面这条命令
qm importdisk 100 /var/lib/vz/template/iso/openwrt-07.12.2023-x86-64-generic-squashfs-combined.img local
```

5. 上面的命令执行完毕后，对应虚拟机就会多出一个磁盘，然后在硬件选项卡中，添加磁盘，选择刚刚创建的磁盘，保持默认即可
6. 修改引导顺序，将磁盘调整到第一位，然后启动虚拟机，即可进入 OpenWrt 的安装界面，按照提示进行安装即可
