## 优雅退出样例代码

在容器内，使用 shell 脚本启动相关程序，如果不响应 kill 信号，则会导致 stop 命令卡十多秒，不科学

使用下面的方法启动的东西不能是其他脚本，否则无效，只能是二进制可执行程序

### 样例一（假设容器启动的应用程序不响应 SIGTERM 信号）最通用

```shell
# 响应优雅退出，如果不响应，则会影响关机进程，强行卡关机进程一分多钟

# 假设只是一个二进制程序，使用后台挂起的方式进行运行
/myapp/start -c config.json &

# 获取最后一个启动的后台进程PID，也就是上面执行的程序
pid="$!"

# 停止过程定义
_kill() {
  echo "[INFO] Receive sigterm"
  # 结束进程
  kill $pid
  # 等待进程退出
  wait $pid
  # 返回143
  exit 143
}

# 订阅kill信号
trap _kill SIGTERM

# 保持终端运行
wait
```
