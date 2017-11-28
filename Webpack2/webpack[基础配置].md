# webpack 总体流程

## 前置操作[常用插件]

- http-server  	web中间件
- rimraf		目标旧文件删除
- loader
	- css-loader 
	- style-loader 
	- less-loader
	- url-loader
	- file-loader
- less
- webpack
- http-server
- html-webpack-plugin
- cnpm i layui-layer --save **layer弹层**


## 命令配置

- build：rimraf dist && webpack		清除旧文件 && 执行webpack打包
- "watch": "rimraf dist && webpack --watch",	清楚旧文件 && webpack && 监视
- "dev": "webpack-dev-server"	开启开发服务器

**Tips：命令执行方式 npm run scriptItem**

**Tips：启动服务器 http-server -p 8080**



## 加载Bootstrap & Jquery

1. 安装 
	
		cnpm i bootstrap jquery --save

2. 入口文件添加引入
	
		require('bootstrap/dist/css/bootstrap.css');
	
	**Tips：引入第三方库文件时，如果使用的npm安装，则直接使用根路径引用即可，webpack会自动处理**

3. 配置loader

	由于bootstrap使用了字体图片等文件，所以要配置附加loader

		{ test:/\.(css|less)$/,use:['style-loader','css-loader?importLoaders=1','less-loader']},
		{ test: /\.(png|jpg)$/,use:['url-loader?limit=8192']},
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,use:['file-loader'] },
        { test: /\.(woff|woff2)$/,use:['url-loader?prefix=font/&limit=5000'] },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,use:['url-loader?limit=10000&mimetype=application/octet-stream'] },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,use:['url-loader?limit=10000&mimetype=image/svg+xml'] },

4. 默认载入jQuery

		plugins:[
	        new webpack.ProvidePlugin({
	            $: "jquery",
	            jQuery: "jquery"
	        })
	    ]

## 处理html中的图片引用

	{ test: /\.html$/,use:['html-withimg-loader']},

**ps：此方式不能处理内嵌/内联style的URL引用**

## 独立css文件

1. 安装 extract-text-webpack-plugin
2. 配置webpack.config.js
	
		module.exports = {
		  module: {
		    rules: [
		      	{ test: /\.(css|less)$/,use:ExtractTextPlugin.extract({
	                fallback: 'style-loader', 
	                use: 'css-loader?importLoaders=1!less-loader' 
	            })},
		    ],
		  },
		  plugins: [
		    new ExtractTextPlugin({
	            filename:'css/[name]-[chunkhash:6].css'
	        })
		  ],
		};

		publicPath:'http://localhost:8080/dist/',

**PS:css|less文件中如果使用了路径引入则需要配置output.publicPath选项**