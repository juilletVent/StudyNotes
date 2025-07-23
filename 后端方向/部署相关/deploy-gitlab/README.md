<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [部署 gitlab](#%E9%83%A8%E7%BD%B2-gitlab)
- [数据备份与恢复](#%E6%95%B0%E6%8D%AE%E5%A4%87%E4%BB%BD%E4%B8%8E%E6%81%A2%E5%A4%8D)
  - [备份](#%E5%A4%87%E4%BB%BD)
  - [恢复](#%E6%81%A2%E5%A4%8D)
- [升级](#%E5%8D%87%E7%BA%A7)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

使用 Docker 部署的 gitlab 升级过程：

1. 查询升级路径：`https://gitlab-com.gitlab.io/support/toolbox/upgrade-path/`，得到必要的升级节点版本
2. 将升级需要的版本节点资源使用脚本批量拉取到本地，加快速度：
   ```shell
   #!/bin/bash
   docker pull gitlab/gitlab-ce:x.x.x-ce.0
   docker pull gitlab/gitlab-ce:x.x.x-ce.0
   # 将所有必要的版本全部拉取到本地
   ```
3. 停止 gitlab 容器：`docker down gitlab`
4. 修改 docker-compose.yml 文件，将 gitlab 版本修改为需要升级第一个必要节点的版本，然后重新启动 gitlab 容器：`docker up -d`
5. 等待 gitlab 容器启动完成，然后进入 gitlab 中，查看`监控` > `后台迁移` 等待所有的后台迁移任务全部完成
6. 重复步骤 3 至 5，直到升级到最新版本

**重点：一定要等待后台迁移任务完成，否则会造成升级失败**
