<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Linux 设置免密登录以及屏蔽密码登录](#linux-%E8%AE%BE%E7%BD%AE%E5%85%8D%E5%AF%86%E7%99%BB%E5%BD%95%E4%BB%A5%E5%8F%8A%E5%B1%8F%E8%94%BD%E5%AF%86%E7%A0%81%E7%99%BB%E5%BD%95)
  - [1. 设置免密登录](#1-%E8%AE%BE%E7%BD%AE%E5%85%8D%E5%AF%86%E7%99%BB%E5%BD%95)
  - [2. 屏蔽密码登录](#2-%E5%B1%8F%E8%94%BD%E5%AF%86%E7%A0%81%E7%99%BB%E5%BD%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Linux 设置免密登录以及屏蔽密码登录

配置文件位置：`/etc/ssh/sshd_config`

### 1. 设置免密登录

1. 生成密钥对
2. 将公钥追加拷贝到目标机器的`~/.ssh/authorized_keys`文件中
3. 修改配置文件：`PubkeyAuthentication yes`
4. 修改配置文件：`RSAAuthentication yes`
5. 重启 ssh 服务：`sudo service ssh restart`

### 2. 屏蔽密码登录

1. 修改配置文件：`PasswordAuthentication no`
2. 修改配置文件：`ChallengeResponseAuthentication no`
3. 修改配置文件：`UsePAM no`
4. 重启 ssh 服务：`sudo service ssh restart`
