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
