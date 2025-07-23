<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [安装脚本项目地址](#%E5%AE%89%E8%A3%85%E8%84%9A%E6%9C%AC%E9%A1%B9%E7%9B%AE%E5%9C%B0%E5%9D%80)
- [安装指令](#%E5%AE%89%E8%A3%85%E6%8C%87%E4%BB%A4)
- [关于 UDP](#%E5%85%B3%E4%BA%8E-udp)
- [Docker 启动](#docker-%E5%90%AF%E5%8A%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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