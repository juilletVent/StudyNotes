<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [为 Git Bash 设置代理](#%E4%B8%BA-git-bash-%E8%AE%BE%E7%BD%AE%E4%BB%A3%E7%90%86)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
