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