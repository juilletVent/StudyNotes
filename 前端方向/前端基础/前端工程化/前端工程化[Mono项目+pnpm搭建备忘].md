<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [相关命令](#%E7%9B%B8%E5%85%B3%E5%91%BD%E4%BB%A4)
- [在子项目中安装依赖](#%E5%9C%A8%E5%AD%90%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%AE%89%E8%A3%85%E4%BE%9D%E8%B5%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 相关命令

- lerna init: 初始化 lerna 项目
- lerna clear: 清除所有包的 node_modules
- lerna bootstrap: 安装所有包的依赖
- lerna run --scope main start : 执行某个子项目的命令

## 在子项目中安装依赖

```bash
# 安装
pnpm add moment -w workspaceName
```
