## Package.json 文件说明

```json
{
  // CLI项目标明入口文件所在位置
  "bin": {
    "spg": "./dist/spg.js"
  },
  // npm快捷脚本定义
  "scripts": {
    "dev": "rollup -c -w",
    "build": "rollup -c",
    "test": "jest --watch"
  },
  // 当前项目名
  "name": "search-page-generator",
  // 项目版本
  "version": "1.0.0",
  // 项目描述
  "description": "自动生成SearchPage调用",
  // 项目入口文件，如果当前项目为CLI项目，则无意义，如果是模块库项目，则标明模块入口位置
  "main": "./dist/spg.js",
  // 作者
  "author": "JulyWind",
  // 协议许可
  "license": "MIT",
  // 项目依赖，如果没有配置peerDependencies的话，这些引入的项目将会打包进入目标代码
  "dependencies": {
    "axios": "^0.21.1",
    "prettier": "^2.2.1"
  },
  // 开发依赖，仅在构建时需要的依赖，不会进入目标代码
  "devDependencies": {
    "typescript": "^4.1.3"
  },
  // 前置依赖，配置在这里的依赖标明，当前项目依赖这些库，但是作为外部依赖，生成的目标代码不会包含这些库的代码
  // 配置了这个项后，目标代码将显著减小，打包速度也将得到大幅加快，建议将没必要打入目标代码的模块均配置在此处
  "peerDependencies": {
    "prettier": "^2.2.1"
  }
}
```
