## Rollup 基础

默认配置：`rollup.config.js`

### 常用 CLI 参数

- o:输出文件名
- w:监视文件是否变化(需要配合 rollup-watch 插件使用)
    
    如果不想监听某些文件：

        watch: {
            exclude: ['path/to/file/which/you/want/to/ignore']
        }

### 与 npm 包协作

- rollup-plugin-node-resolve：解析 npm 安装的 CommonJs 模块，打包时将代码引入进来，而不是使用 require（不会将代码打包进目标文件）
- rollup-plugin-commonjs：将 CommonJS 模块转换为 ES2015 规范公 Rollup 处理（**该插件应处于其他插件之前**）

### 外部引用

在配置文件中添加 external，rollup 将会把他们视为外部引用，而不会打包进目标文件：

    external:['lodash','jquery']

### 使用 Babel

安装插件：rollup-plugin-babel、babel-preset-latest、babel-plugin-external-helpers、babel-core

Tips:注意 babel-core 在 7.0+版本规划到了@babel-core，7.0 之前的版本名称为 babel-core，我们需要的是 6.x 版本， 7.0+版本由于移除了对 external-helpers 的支持，将导致编译出错

添加配置文件：

```javascript
// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "cjs"
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**" // 只编译我们的源代码
    })
  ]
};
```

创建.babelrc：

```babelrc
{
  "presets": [
    ["latest", {
      "es2015": {
        // 设置成False禁止Babel将模块转换成CommonJS
        // 否则 Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS ，导致 Rollup 的一些处理失败
        "modules": false
      }
    }]
  ],
  "plugins": ["external-helpers"]
}
```
