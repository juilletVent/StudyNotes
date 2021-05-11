## 为 Git Bash 设置代理

```bash
# 全局执行设置，不需要引号，如果不需要全局代理，去掉global标记就行了
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
# 取消
git config --global --unset http.proxy
git config --global --unset https.proxy
```
