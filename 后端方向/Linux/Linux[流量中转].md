<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Linux 配置服务器流量中转](#linux-%E9%85%8D%E7%BD%AE%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%B5%81%E9%87%8F%E4%B8%AD%E8%BD%AC)
  - [将网络流量通过本机转发到另外一台服务器](#%E5%B0%86%E7%BD%91%E7%BB%9C%E6%B5%81%E9%87%8F%E9%80%9A%E8%BF%87%E6%9C%AC%E6%9C%BA%E8%BD%AC%E5%8F%91%E5%88%B0%E5%8F%A6%E5%A4%96%E4%B8%80%E5%8F%B0%E6%9C%8D%E5%8A%A1%E5%99%A8)
  - [将网络流量转发到本地的某个端口](#%E5%B0%86%E7%BD%91%E7%BB%9C%E6%B5%81%E9%87%8F%E8%BD%AC%E5%8F%91%E5%88%B0%E6%9C%AC%E5%9C%B0%E7%9A%84%E6%9F%90%E4%B8%AA%E7%AB%AF%E5%8F%A3)
- [使用应用程序转发（主要用于 NAT 主机，防火墙转发无效的情况下使用）](#%E4%BD%BF%E7%94%A8%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E8%BD%AC%E5%8F%91%E4%B8%BB%E8%A6%81%E7%94%A8%E4%BA%8E-nat-%E4%B8%BB%E6%9C%BA%E9%98%B2%E7%81%AB%E5%A2%99%E8%BD%AC%E5%8F%91%E6%97%A0%E6%95%88%E7%9A%84%E6%83%85%E5%86%B5%E4%B8%8B%E4%BD%BF%E7%94%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Linux 配置服务器流量中转

1、开放相关端口

    #开启TCP流量端口
    firewall-cmd --add-port=8080/tcp --permanent
    #开启UDP流量端口
    firewall-cmd --add-port=8080/udp --permanent

2、转发网络流量

### 将网络流量通过本机转发到另外一台服务器

    #开启TCP流量转发(将本地机器的8080端口流量转发至2.2.2.2的666端口，TCP协议流量)
    firewall-cmd --add-forward-port=port=8080:proto=tcp:toaddr=2.2.2.2:toport=666 --permanent
    #开启UDP流量转发（同上，UDP协议）
    firewall-cmd --add-forward-port=port=8080:proto=udp:toaddr=2.2.2.2:toport=666 --permanent

### 将网络流量转发到本地的某个端口

    #开启TCP流量转发
    firewall-cmd --add-forward-port=port=8080:proto=tcp:toport=8090 --permanent
    #开启UDP流量转发
    firewall-cmd --add-forward-port=port=8080:proto=udp:toport=8090 --permanent

3、重载生效

    firewall-cmd --reload

Tips：关于 Trojan 用户使用此方法中转流量时，请在客户端关闭证书验证，非常重要，不关闭将导致无法建立连接

Tips2：防火墙相关规则存放在 `/etc/firewalld/zones/public.xml` 可以直接修改文件进行配置

## 使用应用程序转发（主要用于 NAT 主机，防火墙转发无效的情况下使用）

主要借助于软件：`rinetd`

1. 安装

```bash
# 下载
wget https://pencil.file.lynchj.com/rpm/rinetd-0.62-9.el7.nux.x86_64.rpm
# 安装
rpm -ivh rinetd-0.62-9.el7.nux.x86_64.rpm
```

2. 配置

```bash
vim /etc/rinetd.conf

# 来源网卡地址 来源端口 目的地址 目的端口
0.0.0.0 19999 111.111.111.111 29999
```

3. 启动服务

```bash
systemctl start rinetd
```
