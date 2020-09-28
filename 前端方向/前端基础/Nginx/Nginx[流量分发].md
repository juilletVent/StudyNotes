## Nginx 流量分发

Nginx 可以按域名进行不同的流量分发，这里指的分发是在 OSI 模型中的第四层(传输层)完成的，不同于使用 proxy_pass（应用层），在第四层完成转发，可以忽视上层协议的相关问题，对上层协议透明，所以在某些场景下有奇效（trojan 代理流量分发场景）

开启方法如下：

1. 确保 nginx 开启了 ngx_stream_ssl_preread_module 模块

   ```
    执行 nginx -V 查看Nginx编译参数
    #如果返回的文字中包含了 --with-stream_ssl_preread_module 即可（大部分Nginx都是有的）
    #如果没有，则需要自行编译添加，百度吧
   ```

2. 添加 Nginx 转发配置如下：

   ```nginx
    # 流量转发核心配置
    stream {
        # 这里就是 SNI 识别，将域名映射成一个配置名
        map $ssl_preread_server_name $backend_name {
            # ==== 分发 Vmess 的流量 ====
            vmess.cn vmess;
            # ==== 分发 Trojan 的流量 ====
            trojan.cn trojan;
            # ==== 其他情况下认为其流量性质为HTTPS，转到约定的HTTPS服务端口：4433（看你怎么约定，需要在HTTPS站点的配置里面统一） ====
            # 站点端口监听示例：listen 4433 http2;
            default https;
        }

        # **** 重点： https流量转发到本机4433端口，相关站点配置的https端口改成4433 ****
        # 解释：nginx配置中listen段会让Nginx直接去该端口侦听，如果有多个站点同时侦听同一个端口，会进行端口复用，但是问题来了
        # 我们已经在OSI7层模型中的第四层使用SNI对443端口进行了侦听，这个动作发生在listen之前，那么如果listen再配置为443，nginx就会
        # 认为443端口已经被别的程序侦听了，启动就会直接报出端口被占用，因为这个操作发生在应用层

        # HTTPS，转发到4433
        upstream https {
            server 127.0.0.1:4433;
        }

        # trojan，配置转发详情
        upstream trojan {
            server 127.0.0.1:9999;
        }

        # vmess，配置转发详情
        upstream vmess {
            server 127.0.0.1:9998;
        }

        # 监听 443 并开启 ssl_preread
        server {
            listen 443 reuseport;
            listen [::]:443 reuseport;
            proxy_pass  $backend_name;
            ssl_preread on;
        }
    }
   ```
