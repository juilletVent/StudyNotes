<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Webpack 模块打包](#webpack-%E6%A8%A1%E5%9D%97%E6%89%93%E5%8C%85)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Webpack 模块打包

在使用Webpack进行模块打包时，如果遭遇到非模块化设计的库、插件时需要格外小心

场景一：Jquery，如果模块内部使用显示的全局模块定义，则在打包时直接引入相关的js文件即可，无需附加操作

```javascript
// jquery.min.js 假设模块内部有如下逻辑
window.$ = window.Jquery = window.jquery = ()=>{}

// 打包时直接引入即可
import 'jquery.min.js'
```

场景二：模块内部使用类隐式全局声明，这种模块如果不经过处理，是无法打包成功的

```javascript
//  模块内部逻辑
// 本意：向全局window挂载一个工具对象
var TestUtils = {...}

// 打包时引入
import './lib/TestUtils.js';
```

场景二的引入就会失败，由于webpack会为引入的模块创建局部上下文，所以TestUtils被挂载到局部作用域上了，在全局作用域上就访问不到，这类的模块一般存在于老旧的项目，处理方法可能就需要修改模块代码，将导出语句处理：

1、显示挂载到window顶级作用域
2、使用模块化语法导出