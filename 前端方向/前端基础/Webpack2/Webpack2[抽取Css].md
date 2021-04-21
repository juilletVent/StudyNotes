<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Webpack 抽取 Css](#webpack-%E6%8A%BD%E5%8F%96-css)
  - [抽取引入的Css|Less等样式模块](#%E6%8A%BD%E5%8F%96%E5%BC%95%E5%85%A5%E7%9A%84cssless%E7%AD%89%E6%A0%B7%E5%BC%8F%E6%A8%A1%E5%9D%97)
  - [抽取Vue单文件组件中的样式](#%E6%8A%BD%E5%8F%96vue%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6%E4%B8%AD%E7%9A%84%E6%A0%B7%E5%BC%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Webpack 抽取 Css

## 抽取引入的Css|Less等样式模块

1. 安装并引入 extract-text-webpack-plugin
	
		var extractTextPlugin = require('extract-text-webpack-plugin');

2. 配置rules规则

		{
            test: /\.(css|less)$/,
            loader: extractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", 'less-loader']
            })
        },

3. 添加plugins插件选项

		new extractTextPlugin({ filename: 'css/[name]-bundle.css', allChunks: true }),

## 抽取Vue单文件组件中的样式

		{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                extractCSS: true
            }
        }

**Tips：虽然Css成功写出到文件中，但是根据打包生成后js文件大小和搜索来看，单文件组件中的样式依然被写入到js文件中，还未找到处理方法**