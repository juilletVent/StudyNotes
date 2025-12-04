# Nginx 镜像创建流程

## 文件说明

- `nginx-init.dockerfile`：基于官方 Nginx 镜像，配置软件源，安装必要的工具，并清理缓存，减小镜像体积
- `nginx-run.dockerfile`：基于`nginx-init.dockerfile`，配置 Nginx，并开放 ll 指令，处理 VIM 鼠标选择问题

_Tips:配置国内镜像没什么卵用，还是会拉取官方镜像，要想快还是需要走代理_

## 创建镜像

```bash
# 创建Nginx基础镜像
docker build -f nginx-init.dockerfile -t nginx-init:latest .
# 创建Nginx实际运行镜像
docker build -f nginx-run.dockerfile -t nginx-run:latest .
```

## 网络指令

```bash
# 启用代理网关
route add default gw 192.168.6.7 ens18
route del default gw 192.168.6.1 ens18
# 关闭代理网管
route add default gw 192.168.6.1 ens18
route del default gw 192.168.6.7 ens18
```
