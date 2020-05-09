## Nodejs 网络

### TCP 服务

createServer 的最后一个参数为 connection 的监听器

socket 上具备的事件：

- data：客户端发起 write 时触发
- end：客户端离开时触发
- connect：客户端事件，建立连接成功时触发
- drain：调用 write 时调用端会触发本事件
- error：异常回调，如果不侦听将会导致异常退出
- close：套接字关闭后触发
- timeout：当一段时间后，连接不活跃时，被触发，告知连接闲置

```javascript
const net = require("net");
const server = net.createServer(socket => {
  socket.write("Echo server .\r\n");
  socket.on("error", error => console.log(error));
  socket.on("data", val => {
    socket.write(`\r\n你好 Client.\r\n`);
  });
  socket.on("end", val => {
    console.log("客户端离开");
  });
});
server.on("error", err => console.log(err));
server.on("connect", socket => console.log("客户端进入"));
server.listen(9999, "127.0.0.1");
```

_Tips:TCP 针对网络上的小数据包会进行优化：Nagle 算法，如果每次发送的数据包足够小，则会通过此算法进行合并发送，也就意味着一次 write 并不一定对应一次 data 事件的触发，**可以通过设置：`socket.setNoDelay(true)`来强制发送数据，write 方法的数据将会被立即发送**，node 中默认启用 Nagle 算法_

_Tips2：即使发送端禁用了 Nagle 算法，实时发送了数据给客户端，但是客户端仍有可能会将多次接受到的数据进行合并，然后仅触发一次 data 事件，所以不能依赖 write 与 data 事件的一对一关系，这是不稳定的_

### UDP 服务

udp 服务套接字上具备的事件：

- message：客户端发送数据时触发
- listening：服务端开始监听时触发一次
- close：调用 close 时触发，标注套接字关闭
- error：异常回调，如果不侦听将会导致异常退出

```javascript
// server
const dgram = require("dgram");
const server = dgram.createServer("udp4");
server.on("message", (msg, rinfo) => {
  console.log(`server got:${msg}  from ${rinfo.address} : ${rinfo.port}`);
});

// 开始监听后会触发一次这个事件
server.on("listening", () => {
  console.log("server is listening.");
});
server.bind(12345);

// client
const str = "hello udp server";
const dgram = require("dgram");
const client = dgram.createSocket("udp4");
// 发送的数据、起始发送位置、数据长度、服务端端口、服务端地址，回调
client.send(str, 0, str.length, 12345, "localhost", (err, bytes) => {
  client.close();
});
```

### Http 服务

httpserver 支持的事件：

- connection：客户端进入
- request：请求进入
- close：关闭时触发
- checkContinue：客户端上传较大数据之前会先发送一个头部带有 Expect：100-continue 的请求到服务器，此时会触发该事件，如果没有注册这个事件，则会默认回应一个 100 continue 给客户端，如果想拒绝上传，响应一个 400 回去就行了
- connect：一般用不到，代理的时候使用

一个简单的 Http 服务实例

```javascript
const http = require("http");
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello Nodejs.");
  })
  .listen(8080, "0.0.0.0");
console.log("server is running at http://127.0.0.1:8080");
```

### Http 请求

```javascript
const option = {
  hostname: "127.0.0.1",
  port: 8080,
  path: "/",
  method: "GET"
};

const req = http.request(option, res => {
  res.setEncoding("utf8");
  res.on("data", chunk => {
    console.log(chunk);
  });
});

req.end();
```
