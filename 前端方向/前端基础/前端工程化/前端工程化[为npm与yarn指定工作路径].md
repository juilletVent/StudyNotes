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
