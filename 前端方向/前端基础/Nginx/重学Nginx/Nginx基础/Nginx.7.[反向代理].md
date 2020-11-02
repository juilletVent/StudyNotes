## 反向代理

```nginx
location / {
  proxy_redirect off;
  proxy_set_header Host $host;
  # 访问的直接发起者IP，如果客户端与服务器之间不存在正向或反向代理，则这个IP等同于客户端IP，否则会被设置为最近的代理服务器IP
  proxy_set_header X-Real-IP $remote_addr;
  # 当客户机与服务器之间存在正向或反向代理时，代理服务器会将客户端至服务器之间的所有代理的地址写到这个头上：
  # X-Forwarded-For: 1.1.1.1(客户IP), 2.2.2.2（第一层代理）, 3.3.3.3（第二层代理）
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  # 尾巴上的斜线不要忘记
  proxy_pass https://www.google.com/;
  proxy_connect_timeout 5s;
}
```
