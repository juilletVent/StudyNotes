# Webpack 资源输入输出

## 资源输入

### Context 属性

在 config 配置文件中根节点属性 context 用于标识入口的路径前缀，在定义多入口时可以减少书写

```javascript
module.exports = {
  context: path.join(__dirname, "./src"),
  entry: "./index.js"
};
// 等同于
module.exports = {
  entry: path.join(__dirname, "./src/index.js")
};
```

### entry 属性

entry 可以配置成各种类型，字符串，数组，对象，函数

1. 文件路径

   ```
   entry:'./index.js'
   ```

2. 数组类型

   使用说明:数组中最后一个成员被解释为入口文件，前面的其他元素会被预先合并，然后在打包的时候默认引入

   ```
   entry:['lodash','antd','./index.ts']
   # 等价于
   entry:'./index.ts'
   # index.js中
   import 'lodash';
   ```

3. 对象类型

   如果项目为多入口项目，则 entry 必须使用对象配置，对象 key 为 chunk name，属性值为入口文件，非对象、函数形式的 entry，chunk name 默认为 main

   ```
   entry:{
     main:'./main.js',
     shop:'./shop.js',
     # 也支持数组语法
     lib:['lodash','ramda','./lib.js']
   }
   ```

4. 函数类型

   定义为函数型的入口时，函数返回上述任意类型的配置即可，另外，支持函数返回一个 Promise 来实现异步加载配置

   ```
   entry:()=> new Promise(res,rej)=>res('./index.ts')
   ```

### 提取 Vendor

entry 配置对象下属性 vendor 用于抽取公共模块，配置为数组，可将公用的模块抽打包到一起;**需要配置插件进行支持**,CommonsChunkPlugin(4.0 之后的 webpack 已被废弃，改用 optimization.splitChunks)

```
entry:{
  vendor:['lodash','ramda','antd','react']
}
```

## 资源输出

资源输出的配置项为 output,下属很多子项配

### outout.filename

用于配置输出的文件名称（可以带有输出路径），字符串类型，支持一些模板占位符

```
output:{
  # 简单指定
  filename:'./js/bundle.js'
  # 带有模板占位的,如果是多入口项目，则必须配置name模板占位
  filename:'./js/[name]-[chunkhash:4].js'
}
```

| 变量名称    | 功能描述                                     |
| :---------- | :------------------------------------------- |
| [hash]      | webpack 此次打包产生的 hash，是项目级的 hash |
| [chunkhash] | 只带通过当前文件内容生成的 hash 值           |
| [id]        | 指代当前 chunk 的 id                         |
| [query]     | 指代 filename 配置项中的 query               |

**Tips：使用上述模板占位符时可以配合使用如下语法进行截断：`[chunkhash:4]`，这样可以根据需要截取固定长度的hash值，而不会导致hash过长**

### output.path

用于指定文件输出路径，为绝对路径，webpack4之前生成的默认位置为工程根目录，所以需要进行如下配置：

```
output:{
  path:path.join(__dirname,'dist')
}
```

在4.0之后，默认配置就是dist下，除非需要变更，否则可以不写这个配置。

### output.publicPath

用于配置站内文件请求的路径前缀，不要与path混淆，path用于指定文件产出的路径，publicPath则是在项目实际运行起来后，指定项目内部的异步请求的路径前缀,在配置子项目发布时会比较有用。

假设HTML部署路径为：www.example.com/sub 。异步加载的资源名称为：'async.js'

- publicPath:''       // 实际请求路径为：www.example.com/sub/async.js
- publicPath:'./sub'   // 实际请求路径为：www.example.com/sub/sub/async.js
- publicPath:'../ase' // 实际请求路径为：www.example.com/ase/async.js

如果publicPath是使用/开始则代表请求的路径是以当前的host为参照起点：

- publicPath:'/'       // 实际请求路径为：www.example.com/async.js
- publicPath:'/sub'   // 实际请求路径为：www.example.com/sub/async.js

Tips:webpack-dev-server中也有一个publishPath,用于指定开发服务器的文件输出位置，将其配置成output.path相同即可，否则容易造成歧义



















