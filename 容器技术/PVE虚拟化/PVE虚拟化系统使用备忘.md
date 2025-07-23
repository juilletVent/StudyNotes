<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [PVE 转换 ISO 文件为 KVM 系统文件](#pve-%E8%BD%AC%E6%8D%A2-iso-%E6%96%87%E4%BB%B6%E4%B8%BA-kvm-%E7%B3%BB%E7%BB%9F%E6%96%87%E4%BB%B6)
- [OpenWRT SSH 免密登录](#openwrt-ssh-%E5%85%8D%E5%AF%86%E7%99%BB%E5%BD%95)
- [OpenWRT 配置](#openwrt-%E9%85%8D%E7%BD%AE)
- [OpenWRT 修改 Nginx 默认端口以及 SSL 证书位置](#openwrt-%E4%BF%AE%E6%94%B9-nginx-%E9%BB%98%E8%AE%A4%E7%AB%AF%E5%8F%A3%E4%BB%A5%E5%8F%8A-ssl-%E8%AF%81%E4%B9%A6%E4%BD%8D%E7%BD%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## PVE 转换 ISO 文件为 KVM 系统文件

```bash
# 103 为虚拟机节点ID，需要对应起来，后面的文件就是上传的镜像文件
# 执行转换之前，需要修改PVE的存储类型，操作方法如下：
# 选择左侧菜单：数据中心 -> 存储 -> local -> 编辑 -> 内容（增加磁盘影像选项）然后保存，下面的命令即可成功，否则会报错
qm importdisk 103 /var/lib/vz/template/iso/openwrt_v4.img local
```

## OpenWRT SSH 免密登录

将公钥放置到此处即可，默认是开启了公钥登录的

- 公钥存放位置：`/etc/dropbear/authorized_keys`

- SSH 服务端为：`dropbear`，资料查询直接查询这个关键字即可

## OpenWRT 配置

OpenWrt 配置使用 uci 进行配置，直接使用 CLI 命令: `uci show` 可以查看现有配置

## OpenWRT 修改 Nginx 默认端口以及 SSL 证书位置

修改 uci 配置即可：

```shell
# 修改端口
uci set nginx._lan.listen='9080 default_server'
uci set nginx._ssl.listen='9443 ssl' '[::]:9443 ssl'
# 修改证书路径
uci set nginx._ssl.ssl_certificate='/root/cert/inas.52nanami.cn/fullchain.cer'
uci set nginx._ssl.ssl_certificate_key='/root/cert/inas.52nanami.cn/inas.52nanami.cn.key'
```
