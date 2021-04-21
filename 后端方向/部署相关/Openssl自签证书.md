<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Openssl 自签证书](#openssl-%E8%87%AA%E7%AD%BE%E8%AF%81%E4%B9%A6)
  - [生成私钥](#%E7%94%9F%E6%88%90%E7%A7%81%E9%92%A5)
  - [生成 CSR（证书签名请求）](#%E7%94%9F%E6%88%90-csr%E8%AF%81%E4%B9%A6%E7%AD%BE%E5%90%8D%E8%AF%B7%E6%B1%82)
  - [删除私钥中的密码](#%E5%88%A0%E9%99%A4%E7%A7%81%E9%92%A5%E4%B8%AD%E7%9A%84%E5%AF%86%E7%A0%81)
  - [创建 extfile,为证书添加使用者，不然浏览器不认](#%E5%88%9B%E5%BB%BA-extfile%E4%B8%BA%E8%AF%81%E4%B9%A6%E6%B7%BB%E5%8A%A0%E4%BD%BF%E7%94%A8%E8%80%85%E4%B8%8D%E7%84%B6%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%8D%E8%AE%A4)
  - [生成自签名证书](#%E7%94%9F%E6%88%90%E8%87%AA%E7%AD%BE%E5%90%8D%E8%AF%81%E4%B9%A6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Openssl 自签证书

### 生成私钥

    openssl genrsa -des3 -out server.key 2048

### 生成 CSR（证书签名请求）

    # 说明：需要依次输入国家，地区，城市，组织，组织单位，Common Name和Email。其中Common Name，可以写自己的名字或者域名，如果要支持https，Common Name应该与域名保持一致，否则会引起浏览器警告。

    # Country Name (2 letter code) [AU]:国家
    # State or Province Name (full name) [Some-State]:地区
    # Locality Name (eg, city) []:城市
    # Organization Name (eg, company) [Internet Widgits Pty Ltd]:组织
    # Organizational Unit Name (eg, section) []:组织单位
    # Common Name (e.g. server FQDN or YOUR name) []:你的域名
    # Email Address []:邮件地址

    openssl req -new -key server.key -out server.csr

### 删除私钥中的密码

在第 1 步创建私钥的过程中，由于必须要指定一个密码。而这个密码会带来一个副作用，那就是在每次 Apache 启动 Web 服务器时，都会要求输入密码，这显然非常不方便。要删除私钥中的密码，操作如下：

    cp server.key server.key.org
    openssl rsa -in server.key.org -out server.key

### 创建 extfile,为证书添加使用者，不然浏览器不认

    # 创建文件v3.ext，内容如下

    subjectAltName = @alt_names
    [alt_names]
    DNS.1 = 你的域名

### 生成自签名证书

    openssl x509 -req -days 365 -in server.csr -signkey server.key -sha256 -extfile v3.ext -out server.crt

将生成的crt证书导入本地计算机的受信任的根证书颁发机构就可以了
