<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ubuntu 下重设 Root 密码](#ubuntu-%E4%B8%8B%E9%87%8D%E8%AE%BE-root-%E5%AF%86%E7%A0%81)
  - [进入 GRUB 引导，修改配置进入单人模式](#%E8%BF%9B%E5%85%A5-grub-%E5%BC%95%E5%AF%BC%E4%BF%AE%E6%94%B9%E9%85%8D%E7%BD%AE%E8%BF%9B%E5%85%A5%E5%8D%95%E4%BA%BA%E6%A8%A1%E5%BC%8F)
    - [问题](#%E9%97%AE%E9%A2%98)
  - [使用 Live CD-ROM 重置密码](#%E4%BD%BF%E7%94%A8-live-cd-rom-%E9%87%8D%E7%BD%AE%E5%AF%86%E7%A0%81)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Ubuntu 下重设 Root 密码

记录一下 Ubuntu 下的重置 root 密码的方法，其他 Linux 类似。

## 进入 GRUB 引导，修改配置进入单人模式

开机时在 GRUB 菜单页面按：`e` 进入 GRUB 编辑模式，找到类似下面这行：

```
linux /vmlinuz-xxx root=UUID=xxx ro quiet splash
```

在后面添加 `init=/bin/bash` 参数，然后按 `Ctrl+X` 启动系统进入单人模式：

```
linux /vmlinuz-xxx root=UUID=xxx ro quiet splash init=/bin/bash
```

系统启动后会进入一个类似 `sh` 的 shell 环境，此时系统的文件系统是只读的，需要先将其重新挂载为可读写：

```
mount -o remount,rw /
```

然后使用 `passwd` 命令修改 root 用户的密码：

```
passwd root
```

输入新密码并确认即可。

修改完成后，使用 `exec /sbin/init` 重启即可

### 问题

1、为什么重启的时候没有 GRUB 菜单，而是直接引导进入了系统：

答：Ubuntu 在安装的时候默认隐藏了 GRUB 菜单，需要修改配置才能重新启用 GRUB 菜单：

```
vim /etc/default/grub
```

将 `GRUB_HIDDEN_TIMEOUT=0` 改为 `GRUB_HIDDEN_TIMEOUT=10` 或其他值，注释掉 `GRUB_TIMEOUT_STYLE=hidden`，然后保存并退出。

更新 GRUB 配置：

```
update-grub
```

## 使用 Live CD-ROM 重置密码

如果无法进入 GRUB 菜单，可以尝试使用 Live CD-ROM 重置密码。

Tips：假设我们的 Ubuntu 使用了 LVM

1. 从 CD-ROM 启动，启动后进入 shell 模式
2. 查找 LVM 逻辑卷：`lvscan`，假设我们找到的 LVM 逻辑卷为`/dev/ubuntu-vg/root`
3. 激活所有 LVM 逻辑卷：`vgchange -ay`
4. 挂载 LVM 逻辑卷以及其他的必要分区：
   ```
   mount /dev/ubuntu-vg/root /mnt
   mount --bind /proc /mnt/proc
   mount --bind /sys /mnt/sys
   mount --bind /dev /mnt/dev
   ```
5. 进入 chroot 环境：`chroot /mnt`
6. 修改密码：`passwd root`
7. 退出 chroot：`exit`
8. 卸载分区：
   ```
   umount /mnt/dev
   umount /mnt/sys
   umount /mnt/proc
   umount /mnt
   ```
9. 重启：`reboot`
