<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Nexus 私服搭建流程](#nexus-%E7%A7%81%E6%9C%8D%E6%90%AD%E5%BB%BA%E6%B5%81%E7%A8%8B)
  - [喜闻乐见的 Docker 一键部署](#%E5%96%9C%E9%97%BB%E4%B9%90%E8%A7%81%E7%9A%84-docker-%E4%B8%80%E9%94%AE%E9%83%A8%E7%BD%B2)
  - [配置 NPM 私服](#%E9%85%8D%E7%BD%AE-npm-%E7%A7%81%E6%9C%8D)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Nexus 私服搭建流程

### 喜闻乐见的 Docker 一键部署

配置文件：

```yaml
version: "3.5"
services:
  nexus:
    image: sonatype/nexus3
    container_name: nexus3
    restart: always
    environment:
      - TZ=Asia/Shanghai
    ports:
      - 8081:8081
    volumes:
      - ./data:/nexus-data
```

启动！！！：`docker-compose up`，不出意外是要出意外的，会报 data 目录权限不足，修改 docker 创建的 data 目录：`chmod 777 ./data`，再次启动即可：`docker-compose up -d`

访问：`http://localhost:8081`，管理员账号：`admin`，初始密码存放在：`./data/admin.password`，登录后修改密码即可。

### 配置 NPM 私服

1. 正常添加 Proxy 仓库即可
2. 开启匿名访问，不然很不方便：`Security > Anonymous Access` 勾选 `Allow anonymous users to access the server`，并保存
3. 开启代理：`system > HTTP`，设置好代理即可

至此，本地使用nrm配置好npm仓库路径，即可丝滑的安装包了。