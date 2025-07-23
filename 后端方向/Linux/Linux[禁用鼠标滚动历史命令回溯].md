<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [禁用鼠标滚动应用历史命令](#%E7%A6%81%E7%94%A8%E9%BC%A0%E6%A0%87%E6%BB%9A%E5%8A%A8%E5%BA%94%E7%94%A8%E5%8E%86%E5%8F%B2%E5%91%BD%E4%BB%A4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 禁用鼠标滚动应用历史命令

一般情况下鼠标滚动是查看历史命令的输出，Openwrt 下这一行为是加载历史命令，导致无法滚动，使用如下方法还原鼠标滚动功能。

```bash
echo "bind -r '\e[5~'" >> ~/.bashrc && . ~/.bashrc
```
