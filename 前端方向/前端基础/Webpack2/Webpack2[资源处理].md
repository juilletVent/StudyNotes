<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [webpacket 处理资源文件](#webpacket-%E5%A4%84%E7%90%86%E8%B5%84%E6%BA%90%E6%96%87%E4%BB%B6)
    - [loader安装](#loader%E5%AE%89%E8%A3%85)
  - [CSS引入](#css%E5%BC%95%E5%85%A5)
  - [Less文件处理](#less%E6%96%87%E4%BB%B6%E5%A4%84%E7%90%86)
  - [CSS文件中的路径问题](#css%E6%96%87%E4%BB%B6%E4%B8%AD%E7%9A%84%E8%B7%AF%E5%BE%84%E9%97%AE%E9%A2%98)
  - [HTML文件中类似img标签的文件引入](#html%E6%96%87%E4%BB%B6%E4%B8%AD%E7%B1%BB%E4%BC%BCimg%E6%A0%87%E7%AD%BE%E7%9A%84%E6%96%87%E4%BB%B6%E5%BC%95%E5%85%A5)
  - [JS中路径](#js%E4%B8%AD%E8%B7%AF%E5%BE%84)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# webpacket 处理资源文件

### loader安装

> 指令

	// 安装 css相关loader
	cnpm install style-loader css-loader less-loader --save-dev
	cnpm install less --save-dev

> webpack 配置文件示例

	module.exports = {
	    entry:'./src/js/index.js',
	    output:{
	        path:'./dist',
	        filename:'js/[name].bundle.js'
	    },
	    module:{
	        loaders:[{
	            test:/\.js$/,
	            loader:'babel-loader'//需要安装loader
	            query:{
	                presets:['latest']//需要转换的语法格式，这个为全部转换
	            }
	        }]
	    },
	    plugins:[
	        new htmlWebpackPlugin({
	            filename:'index.html',
	            template:'index.html',
	            inject:'body'
	        })
	    ]
	}

## CSS引入

在入口文件引入CSS：

	import './css/common.js';
	require('./css/commen.js');

> css预处理 [postcss-loader & autoprefixer]

安装:

	cnpm i postcss-loader --save-dev
	cnpm i autoprefixer --save-dev

配置loader：

	module:{
        loaders:[{
            test:/\.css$/,//匹配以.css结尾的文件
            loader:'style-loader!css-loader!postcss-loader'//css+style loader
        }]
    },
	postcss:[require('autoprefixer')({
		broswers:['last 5 versions']
	})]

css 文件中使用import时：**?importLoaders=1** 只使用一个CSS loader来处理引入的CSS资源

	 loader:'style-loader!css-loader?importLoaders=1!postcss-loader'

## Less文件处理

文件引入
	
	import './layer.less'

模块配置

	module:{
        loaders:[{
            test:/\.less$/,//匹配以.less结尾的文件
            loader:'style!css!less'
        }]
    },


## CSS文件中的路径问题

如果相对路径生成错误，在Output中指定publicPath即可纠正，但是需要配置本地服务器

## HTML文件中类似img标签的文件引入

安装：

	cnpm i html-webpack-plugin --save-dev

配置：

	{
        test: /\.html$/,
        loader: 'html-withimg-loader'
    },

	new htmlWebpackPlugin({
        template: 'html-withimg-loader!./src/login.html',//此处加与不加 似乎没啥影响
        filename: 'index.html',
        chunks: ['main']
    }),

## JS中路径

Webpack注意：

资源路径不能直接书写，需使用require引入