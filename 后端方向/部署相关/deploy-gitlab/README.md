## 部署 gitlab

直接执行命令：`start-gitlab.sh` 即可

部署相关端口信息：

- SSH 端口:10022
- HTTP 端口:10980
- HTTPS 端口:10443

部署文件映射信息（前面为容器内地址，后面为宿主机内）：

- /etc/gitlab：./gitlab-data/config
- /var/log/gitlab：./gitlab-data/logs
- /var/opt/gitlab：./gitlab-data/data

> gitlab 备份文件夹位置：`/var/opt/gitlab/backups/`

## 数据备份与恢复

如果是使用 Docker 部署，则需要进入 Docker 内部进行执行，备份时所使用的版本与恢复时所使用的版本必须一致才能够进行恢复。

### 备份

```bash
# 备份命令
gitlab-rake gitlab:backup:create
```

使用以上命令会在/var/opt/gitlab/backups 目录下创建一个名称类似为 1530156812_2018_06_28_10.8.4_gitlab_backup.tar 的压缩包, 这个压缩包就是 Gitlab 整个的完整部分, 其中开头的 1530156812_2018_06_28_10.8.4 是备份创建的日期，备份完成之后，使用 docker cp 命令将备份文件拷贝到宿主机上即可。

### 恢复

按照如下命令进行恢复，恢复之前需要先将备份文件放置到：`/var/opt/gitlab/backups`下。

然后执行下面的命令进行恢复：

```bash
# 停止相关数据连接服务
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq
# 从1530156812_2018_06_28_10.8.4编号备份中恢复，注意修改为自己的备份编号
gitlab-rake gitlab:backup:restore BACKUP=1530156812_2018_06_28_10.8.4
```

## 升级
