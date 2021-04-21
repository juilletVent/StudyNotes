<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [证书部分](#%E8%AF%81%E4%B9%A6%E9%83%A8%E5%88%86)
- [配置部分](#%E9%85%8D%E7%BD%AE%E9%83%A8%E5%88%86)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 证书部分

1、生成key文件

	openssl genrsa -aes256 -out https.key

2、生成CSR证书请求文件

	openssl req -new -key https.key -out https.csr

3、自签名CA证书

	openssl x509 -req -days 3650 -in https.csr -signkey https.key -out https.crt

## 配置部分

需要配置的项目如下：

	ssl on;
	ssl_certificate https.crt // 证书文件
	ssl_certificate_key https.key // 证书key文件


上下文：http，server

	listen 443 // 端口为443

rewrite配置http强制跳转

	rewrite ^(.*)$ https://$host$1 permanent;