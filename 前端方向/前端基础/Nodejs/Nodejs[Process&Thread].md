# Nodejs 进程与线程

创建子进程

```javascript
const fork = require("child_process").fork;
fork("./demo.js");
```

child_process 提供了四个方法来开启子进程：

- fork
- spawn
- exec 可以获取子进程信息 可以设置运行超时时间
- execFile 执行可执行文件 可以设置运行超时时间

#### 进程间通讯

使用上述方法创建进程后返回的对象为类似 webWork 的对象，直接使用 send 以及 on 方法发送或监听事件即可，用法参考 webWorker

> 句柄传递

进程间可以传递 socket 句柄，实现非代理式的多进程抢占式服务模式，父子进程均有机会抢到服务机会

```javascript
# parent process
const childProcess = require('child_process').fork('./child.js');
const server = require('http').createServer();

server.on('connect',()=>{
  // do something...
})

server.listen(2222,()=>{
  childProcess.send('server',server);
})

# child process
process.on('server',ser=>{
  server.on('connect',()=>{
    // do something...
  })
})
```

**重点：实际上多进程的使用，直接使用node官方提供的模块Cluster即可，他维护了相关的错误重启机制，更加稳定**
