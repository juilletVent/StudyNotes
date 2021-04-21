<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [webpack](#webpack)
- [mode 运行模式](#mode-%E8%BF%90%E8%A1%8C%E6%A8%A1%E5%BC%8F)
- [Vue-loader](#vue-loader)
  - [单文件组件样式解析](#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E8%A7%A3%E6%9E%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## webpack

在 Webpack4 中，webpack 拆分为两个包，用法为，局部安装 webpack webpack-cli，不要全局安装 webpack，容易出现依赖包找不到的问题。

## mode 运行模式

在新版的 webpack 编译环境中需要指定编译模式 --mode，development/production

    "start": "webpack-dev-server --mode development",
    "dev": "webpack --config webpack.config.js --mode development",
    "build": "webpack --config webpack.config.js --mode production"

在 webpack 配置文件中如果需要获取 mode 参数可以使用如下方式：

    const config = (env, argv) => {
        const isDev = argv.mode == 'development' ? true : false;
        if (isDev) {
    		...
        } else {
    		...
        }
        return config;
    };

将 config 转换为一个函数，env 为环境变量，argv 为命令参数

## Vue-loader

新版（15 及以上）的 vue-loader 需要配置 VueLoaderPlugin 才能正确解析 Vue 文件

    const VueLoaderPlugin = require('vue-loader/lib/plugin.js');

    plugins: [
        new VueLoaderPlugin()
    ],

如果不想配置请使用 14 版本

### 单文件组件样式解析

如果在单文件组件中使用了 css 预处理语言，需要在 loader 配置中进行配置，例如使用了 stylus，在需要在 loader 配置中进行如下配置

    {
    	test:/\.stylus$/,
    	use:[
    		'style-loader',
    		'css-loader',
    		'stylus-loader'
    	]
    }

以上配置与匹配.styl 文件的配置不共用，如果不写将会报错
