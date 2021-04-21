<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Webpack 预处理器](#webpack-%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8)
  - [webpack 中的 resource 与 issuer [加载者 and 被加载者]](#webpack-%E4%B8%AD%E7%9A%84-resource-%E4%B8%8E-issuer-%E5%8A%A0%E8%BD%BD%E8%80%85-and-%E8%A2%AB%E5%8A%A0%E8%BD%BD%E8%80%85)
  - [enforce 提升 loader 执行优先级](#enforce-%E6%8F%90%E5%8D%87-loader-%E6%89%A7%E8%A1%8C%E4%BC%98%E5%85%88%E7%BA%A7)
  - [常用loader介绍](#%E5%B8%B8%E7%94%A8loader%E4%BB%8B%E7%BB%8D)
    - [babel-loader](#babel-loader)
    - [ts-loader](#ts-loader)
    - [html-loader](#html-loader)
    - [file-loader](#file-loader)
    - [url-loader](#url-loader)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Webpack 预处理器

loader 的相关配置均在 webpack 配置的 module 键名下，配合一个栗子进行说明

```
module: {
  rules: [
    {
      // 匹配需要loader进行处理的文件名正则或者正则数组
      test: /\.(css|less)/,
      // 正则数组也可以
      test: [/\.(css|less)/,/\.(scss|sass)/],
      // 使用的load链，loader处理顺序为自右向左
      use: ["style-loader", "css-loader", "less-loader"],
      // 如果只有一个loader也可以写成字符串
      use:'css-loader',
      // loader配置项
      options: {
        // loader的配置参数，如果loader需要参数的话，则在此处传入
      },
      // loader 处理文件排除的文件夹匹配正则，或者正则数组
      // 如果同时存在 include，则会在include的基础之上进行exclude排除
      exclude: [],
      // loader 处理文件包含的文件夹匹配正则，或者正则数组
      include:[]
    }
  ]
},
```

## webpack 中的 resource 与 issuer [加载者 and 被加载者]

webpack 中我们认为被加载的模块为 recourse，而加载者被定义为 issuer，上面 rules 的配置默认被解释为对被加载者的配置，实际上我们还可以进行对加载的配置，比如限制只允许某个路径下的 js 文件可以加载 css：

```
module: {
  rules: [
    {
      test: /\.(css|less)/,
      use: ["style-loader", "css-loader", "less-loader"],
      // 此处我们定义只有src/home的js文件加载的css或者less文件会被loader处理，而其他路径的则不会
      issuer:{
        test:/\.js$/,
        include:path.resolve(__dirname, 'src/home')
      }
    }
  ]
},

// 推荐的写法，当然了，一般来说不需要上面和下面的写法，只要使用默认的被加载者匹配规则即可满足大部分需求

module: {
  rules: [
    {
      use: ["style-loader", "css-loader", "less-loader"],

      // 定义被加载者是这些
      resource:{
        test: /\.(css|less)/,
        exclude:/node_modules/,
      },
      // 定义加载者匹配规则
      issuer:{
        test:/\.js$/,
        include:path.resolve(__dirname, 'src/home')
      }
    }
  ]
},

```

## enforce 提升 loader 执行优先级

enforce 用于变更 loader 执行的优先级，enforce在webpack定义中，实际值有4个定义：

- pre 此配置将会使得这个loader最先被执行
- inline 官方已经不推荐使用
- normal 直接定义的loader都属于此范畴
- post 此配置会使loader在所有loader执行完毕之后执行

栗子：

```
rules:[
  {
    test:/\.js$/,
    // enforce接收两个值:pre | post，
    enforce:'pre',
    use:'eslint-loader'
  }
]
```

## 常用loader介绍

### babel-loader

安装：`yarn add babel-loader @babel/core @babel/preset-env`

preset-env将会把es6模块转换为CommonJS模块，这会使tree-shaking特性失效

### ts-loader

用于连接webpack与TypeScript,提供静态语法检查

安装:`yarn add typescript ts-loader`

### html-loader

安装：`yarn add html-loader`

用于将html片段转化为字符串，使得我们可以拆分html

### file-loader

安装：`yarn add file-loader`

用于打包文件类型的资源，返回文件的publicPath,静态资源文件均需要此loader进行静态资源输出

### url-loader

安装：`yarn add url-loader`

作用与file-loader差不多，但是可以设定文件尺寸小于某个大小时，将文件转为base64编码，减少http请求
