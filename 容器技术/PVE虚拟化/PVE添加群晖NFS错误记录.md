## 添加NFS注意备忘

新版的PVE在添加NFS存储时，默认使用了NFS 4.2版本的协议，群晖最高只支持到NFS 4.1 版本协议，因此需要在PVE添加NFS存储时，勾选下方的高级选项，展开高级选项，切换NFS协议版本到4.1，并且在群晖中将最大NFS协议版本设置为4.1，否则会出现无法连接的问题。

## 变更NFS挂载

如果需要变更NFS挂载配置，比如文件存储服务器变更了IP时，直接在WEB UI删除NFS目录然后重新挂载，大概率会卡住，这是因为WEB UI与目录挂载有时候不同步，此时重新写入新的NFS配置挂载目录大概率挂载不上，需要手动卸载先前的NFS目录才能重新挂载，操作如下：

```shell
# 首先检查NFS是否已经在WEB UI删除

# 检查是否仍然存在NFS挂载
mount | grep nfs
# 懒卸载NFS，注意目录名是否一致，如果不一致，修改为实际挂载目录
umount -l /mnt/pve/NAS
# 再次检查nfs挂载是否存在，正常的话，应该不再存在NFS挂载目录了
mount | grep nfs

# 重置NFS状态
systemctl restart nfs-common
systemctl restart rpcbind
systemctl restart nfs-idmapd

# 然后重新在WEB UI添加NFS挂载即可
```
