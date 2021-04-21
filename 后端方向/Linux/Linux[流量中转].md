<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Linux 配置服务器流量中转](#linux-%E9%85%8D%E7%BD%AE%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%B5%81%E9%87%8F%E4%B8%AD%E8%BD%AC)
  - [将网络流量通过本机转发到另外一台服务器](#%E5%B0%86%E7%BD%91%E7%BB%9C%E6%B5%81%E9%87%8F%E9%80%9A%E8%BF%87%E6%9C%AC%E6%9C%BA%E8%BD%AC%E5%8F%91%E5%88%B0%E5%8F%A6%E5%A4%96%E4%B8%80%E5%8F%B0%E6%9C%8D%E5%8A%A1%E5%99%A8)
  - [将网络流量转发到本地的某个端口](#%E5%B0%86%E7%BD%91%E7%BB%9C%E6%B5%81%E9%87%8F%E8%BD%AC%E5%8F%91%E5%88%B0%E6%9C%AC%E5%9C%B0%E7%9A%84%E6%9F%90%E4%B8%AA%E7%AB%AF%E5%8F%A3)

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

Tips：关于Trojan用户使用此方法中转流量时，请在客户端关闭证书验证，非常重要，不关闭将导致无法建立连接

Tips2：防火墙相关规则存放在 `/etc/firewalld/zones/public.xml` 可以直接修改文件进行配置