<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [基础 Dockerfile](#%E5%9F%BA%E7%A1%80-dockerfile)
- [Build](#build)
- [应用 Dockerfile](#%E5%BA%94%E7%94%A8-dockerfile)
- [启动容器](#%E5%90%AF%E5%8A%A8%E5%AE%B9%E5%99%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 基础 Dockerfile

```dockerfile
FROM centos:7
ENV container docker
RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == \
systemd-tmpfiles-setup.service ] || rm -f $i; done); \
rm -f /lib/systemd/system/multi-user.target.wants/*;\
rm -f /etc/systemd/system/*.wants/*;\
rm -f /lib/systemd/system/local-fs.target.wants/*; \
rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
rm -f /lib/systemd/system/basic.target.wants/*;\
rm -f /lib/systemd/system/anaconda.target.wants/*;
VOLUME [ "/sys/fs/cgroup" ]
CMD ["/usr/sbin/init"]
```

## Build

```shell
docker build -t local/c7-systemd .
```

## 应用 Dockerfile

```dockerfile
# 基础依赖Centos的镜像
FROM local/c7-systemd
# 作者
MAINTAINER julyWind
RUN echo alias ll="\"ls -l --color\"" > /.dockerenv & \
. /.dockerenv & \
yum clean packages & \
yum update -y & \
yum install wget net-tools vim -y
# 入口执行的命令，数组最终采用空格进行连接，生成一条命令：/usr/sbin/nginx -g deamon off;
# ENTRYPOINT ["/usr/sbin/nginx","-g","daemon off;"]
# 循环shell命令，保持容器不退出
ENTRYPOINT ["/bin/bash","-c","while true;do echo hello docker;sleep 1;done"]
# 目录挂载位置
VOLUME ["/data1"]
# 暴露端口
EXPOSE 21 22 80 443 3306 8888
```

## 启动容器

```shell
docker run -itd -p 20080:80 -p 23306:3306 -p 20443:443 -p 28888:8888 -p 20021:21 -p 21000-21020:21000-21020 --name proxy-manager-instance proxy-manager
```
