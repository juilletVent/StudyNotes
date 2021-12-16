## Nginx 跨域控制

### 相关控制头

- Access-Control-Allow-Origin：允许访问的域
- Access-Control-Allow-Methods：允许跨域的方法
- Access-Control-Allow-Credentials：允许跨域携带 cookie（安全策略：如果此项为 true，则 Access-Control-Allow-Origin 不允许设置成通配符）
- Access-Control-Allow-Headers：允许使用的跨域请求头
- Access-Control-Expose-Headers：允许使用的跨域响应头（只有在配置中的 Header 才能在前端环境获取到）

一个支持分片且支持跨域的静态分发配置样例：

```nginx
# 通过后缀匹配静态资源,由于需要支持资源分片下载，需要使用到响应头：range
# 因此需要将range配置进 Access-Control-Allow-Headers、Access-Control-Expose-Headers
# 加上需要允许跨域，又因为Nginx默认不允许对静态资源文件使用OPTION方法，还需要对跨域预检OPTION请求进行特殊处理
location ~* \.(jpg|jpeg|gif|png|swf|js|css|tpl|bmp|avi|mp4|eot|woff|ttf|svg|html|pdf)$ {
  root $applicationPath;
  expires -1;
  proxy_read_timeout 3s;
  if ($request_method = OPTIONS ) {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,PATCH,OPTIONS;
    add_header Access-Control-Allow-Headers DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,x-total-count,x-frame-options,transfer-encoding,x-application-context,token,Authorization;
    add_header Access-Control-Expose-Headers Accept-Ranges,Range,DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,x-total-count,x-frame-options,transfer-encoding,x-application-context,token,Authorization;
    return 200;
  }
  add_header Access-Control-Allow-Origin *;
  add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,PATCH,OPTIONS;
  add_header Access-Control-Allow-Headers DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,x-total-count,x-frame-options,transfer-encoding,x-application-context,token,Authorization;
  add_header Access-Control-Expose-Headers Accept-Ranges,Range,DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,x-total-count,x-frame-options,transfer-encoding,x-application-context,token,Authorization;
}
```

## 关于简单请求与复杂请求

> 满足以下条件为简单请求，跨域时不需要发起预检请求：

- 请求方法：GET、POST、HEAD
- 除了以下的请求头字段之外，没有自定义的请求头

  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type
  - DPR
  - Downlink
  - Save-Data
  - Viewport-Width
  - Width
  - Content-Type 的值只有以下三种(Content-Type 一般是指在 post 请求中，get 请求中设置没有实际意义)

    text/plain
    multipart/form-data
    application/x-www-form-urlencoded

- 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器 (未验证)

- XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问
  请求中没有使用 ReadableStream 对象 (未验证)
  复杂请求

> 不满足简单请求的条件即复杂请求，发起之前均会先发送一个 OPTIONS 预检请求进行检查
