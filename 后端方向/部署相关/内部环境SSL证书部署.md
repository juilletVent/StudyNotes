<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [证书 SCP 复制](#%E8%AF%81%E4%B9%A6-scp-%E5%A4%8D%E5%88%B6)
- [openwrt SSL 证书配置](#openwrt-ssl-%E8%AF%81%E4%B9%A6%E9%85%8D%E7%BD%AE)
- [群晖证书路径](#%E7%BE%A4%E6%99%96%E8%AF%81%E4%B9%A6%E8%B7%AF%E5%BE%84)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 证书 SCP 复制

```shell
scp -r -P 11111 /root/.acme.sh/example.com/ root@192.168.0.1:/root/cert/
```

# openwrt SSL 证书配置

```shell
uci set nginx._ssl.ssl_certificate=/root/cert/example.com/fullchain.cer
uci set nginx._ssl.ssl_certificate_key=/root/cert/example.com/example.key
uci commit
/etc/init.d/nginx restart
```

# 群晖证书路径

```shell
/usr/syno/etc/certificate/_archive
```
