## 证书部分

1、生成key文件

	openssl genrsa -aes256 -out https.key

2、生成SCR证书请求文件

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