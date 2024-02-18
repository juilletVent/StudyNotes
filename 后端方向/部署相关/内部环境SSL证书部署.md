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
