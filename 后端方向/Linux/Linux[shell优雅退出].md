<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [优雅退出样例代码](#%E4%BC%98%E9%9B%85%E9%80%80%E5%87%BA%E6%A0%B7%E4%BE%8B%E4%BB%A3%E7%A0%81)
  - [样例一（假设容器启动的应用程序不响应 SIGTERM 信号）最通用](#%E6%A0%B7%E4%BE%8B%E4%B8%80%E5%81%87%E8%AE%BE%E5%AE%B9%E5%99%A8%E5%90%AF%E5%8A%A8%E7%9A%84%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E4%B8%8D%E5%93%8D%E5%BA%94-sigterm-%E4%BF%A1%E5%8F%B7%E6%9C%80%E9%80%9A%E7%94%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
