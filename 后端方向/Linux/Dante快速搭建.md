## 安装脚本项目地址

项目地址：`https://github.com/Lozy/danted`

```
# 下载脚本
wget --no-check-certificate https://raw.github.com/Lozy/danted/master/install.sh -O install.sh
chmod u+x install.sh
```

## 安装指令

```
./install.sh --port=6666 --user=admin --passwd=123456
```

## 关于 UDP

如果要使用 UDP 转发，并且是在 NAT 机器上，则需要限定 UDP 端口范围，否则会出现 UDP 转发失败的情况。

编辑配置文件: /etc/danted/sockd.conf

```
pass {
        from: 0.0.0.0/0 to: 0.0.0.0/0
        protocol: tcp udp
        method: pam
        log: connect disconnect
        # 此处为限定端口的关键配置
        udp.portrange: 49928-49928
}
```

然后做好相关端口的转发与开放即可

## Docker 启动

~~~
# sockd.passwd is a `htpasswd` file contains socks5 auth user/password. 
docker run -d \
    --name sockd \
    --publish 47006:2020 \
    --publish 49928:49928 \
    --volume /root/socks5/sockd.passwd:/home/danted/conf/sockd.passwd \
    lozyme/sockd
~~~