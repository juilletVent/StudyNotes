<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [转换命令](#%E8%BD%AC%E6%8D%A2%E5%91%BD%E4%BB%A4)
- [Git 配置](#git-%E9%85%8D%E7%BD%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 转换命令

项目根目录下执行：

    find ./ -type f -print0 | xargs -0 dos2unix

转换所有 CRLF 为 LF

## Git 配置

配置 git 针对 CRLF 的配置

```
[core]
	# 开启提交检查，发现混合换行时直接拒绝提交
	safecrlf = true
	# 指定转换模式：input 原样拉取，CRLF转LF提交
	autocrlf = input
	# 其他值的解释：true （拉取时LF 转CRLF，提交时CRLF转LF）
	# 其他值的解释：false （拉取时LF 转CRLF，提交时原样提交）
```
