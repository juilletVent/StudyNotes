<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [指定 yarn 与 npm 的工作路径](#%E6%8C%87%E5%AE%9A-yarn-%E4%B8%8E-npm-%E7%9A%84%E5%B7%A5%E4%BD%9C%E8%B7%AF%E5%BE%84)
  - [npm](#npm)
  - [yarn](#yarn)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 指定 yarn 与 npm 的工作路径

借助这两个参数，我们可以将多个子工作空间的命令全部集成到顶层的 package.json 集中编写，集中执行

### npm

```cmd
npm --prefix=./subdir run build
```

### yarn

```cmd
yarn --cwd=./subdir build
```
