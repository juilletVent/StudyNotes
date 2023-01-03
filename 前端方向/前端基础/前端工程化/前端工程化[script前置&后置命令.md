<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [package.json 中定义命令的前置与后置命令](#packagejson-%E4%B8%AD%E5%AE%9A%E4%B9%89%E5%91%BD%E4%BB%A4%E7%9A%84%E5%89%8D%E7%BD%AE%E4%B8%8E%E5%90%8E%E7%BD%AE%E5%91%BD%E4%BB%A4)
- [npm 其他生命周期钩子命令](#npm-%E5%85%B6%E4%BB%96%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90%E5%91%BD%E4%BB%A4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## package.json 中定义命令的前置与后置命令

script 中的命令是可以定义命令的前置运行命令与后置运行命令的，这在运行一些组合式任务时非常有用：

```json
{
  "scripts": {
    "build-app": "cross-env GENERATE_SOURCEMAP=false react-scripts build",
    "build-electron": "tsc ./src/main.ts --outDir ./build",
    "build": "electron-builder",
    // 执行build前，先执行build-app
    "prebuild": "npm run build-app",
    // 执行build-app前，先执行build-electron
    "prebuild-app": "npm run build-electron"
    // build执行完成后执行此命令
    // "postbuild":"clear"
  }
}
```

上面的配置，当运行`npm run build`时就形成了以下的执行流：`npm run build-electron` -> `npm run build-app` -> `npm run build`

## npm 其他生命周期钩子命令

可以利用这些钩子命令，去完成联动初始化（安装了顶层依赖紧接着安装下层依赖之类的），或者其他的需求（发布前进行目标文件整合之类）

- preinstall
- install
- postinstall
- prepublish
- preprepare
- prepare
- postprepare
