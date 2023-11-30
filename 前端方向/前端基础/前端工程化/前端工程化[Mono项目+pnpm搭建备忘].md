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
