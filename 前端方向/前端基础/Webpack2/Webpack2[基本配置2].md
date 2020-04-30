# Webpacket

## install

- npm install -g webpack //进行webpacket命令的全局安装[**不要进行全局安装**]，应在项目目录下进行安装，否则在使用插件时将会出错
- npm install xx --registry=https://registry.npm.taobao.org/ 使用淘宝镜像
- npm install -g cnpm //使用cnpm

> 最简单的基础配置

文件名：webpack.config.js

配置：

	module.exports = {
		//指定入口文件
	    entry:'./src/script/main.js',
		//指定输出路径以及目标文件名
	    output:{
	        path:'./dist/js',
			//此处的路径，webpack 2.0+版本需要使用下面的配置
	        filename:'main.bundle.js'
	    }
	}

	>>>> webpack 2.0+ <<<<

	var path = require("path");
	module.exports = {
	    entry:'./src/script/main.js',
	    output:{
	        path:path.resolve(__dirname,'./dist/js'),
	        filename:'main.bundle.js'
	    }
	}

然后在同级目录直接执行webpack即可应用配置信息执行打包

**附加：可以使用附加 --config 配置文件名 来指定配置文件**

例如： 
	
	webpack --config webpack-dev.config.js

还可以在package.json中配置预执行脚本，将将要执行的脚本命令定义在script下即可，然后在bash中执行 npm run 指令名 即可。



## webpack 基本配置

	module.export = {
		//entry : ['./app1.js', './app2.js']  //多个不相干的入口文件时使用这种写法
	    entry: 'app.js',
	    output: {
	        path: 'assets/',
	        filename: '[name].bundle.js'
	    },
	    module: {
	        loaders: [ // 使用babel-loader解析js或者jsx模块 
	            {
	                test: /\.js\.jsx$/,
	                loader: 'babel'
	            }, // 使用css-loader解析css模块 
	            {
	                test: /\.css$/,
	                loader: 'style!css'
	            }, // or another way 
	            {
	                test: /\.css$/,
	                loader: ['style', 'css']
	            }]
	    }
	};

- entry对应需要打包的入口js文件
- output对应输出的目录以及文件名
- module中的loaders对应解析各个模块时需要的加载器

## 打包指令

	webpack entry.js [**入口文件名**] main.bundle.js [**打包生成的目标文件名**]

## 文件监视

在文件改变时，自动执行命令对其进行处理，只需要在命令后面添加 **--watch** 附加指令即可

## 附加指令

- --progress 显示打包进度
- --display-modules 显示所引用的所有模块
- --display-reasons 显示所有模块的引用位置

## loader

打包CSS时候需要CSS loader以及Style loader,切需要在打包时指定使用的loader，或者在打包命令后指定loader，或者在配置文件中指定loader

安装命令：

	npm install css-loader style-loader --save-dev

require形式：

	require('style-loader!css-loader!./main.css');

指令形式：

	webpack entry.js bundle.js --module-bind 'css=style-loader!css-loader'

采用以上形式指定对应的文件使用的预处理loader，否则无法进行处理，loader的执行顺序为逆序，写在前面的后执行，具备依赖关系，不能交换顺序

**Tips：**使用以上打包指令生成的目标js会在html文档的head插入一个style标签将引入的css文件内容插入其中

## 多入口输入打包

filename处不能直接写死，否则将出现覆盖情况，需要使用占位符：name、hash[webpackethash值]、chunkhash[文件hash值]

	var path = require("path");
	module.exports = {
	    entry:{
	        page1:'./src/script/main1.js',
	        page2:'./src/script/main2.js'
	    },
	    output:{
	        path:path.resolve(__dirname,'./dist'),//此处一般定义为dist作为基地址，为了使生成的HTML文件与JS文件分开
	        filename:'js/[name]-[hash].js'//JS使用单独的相对地址
	    }
	}


## 文件名替换[html-webpack-plugin] HTML生成

1. 先按装html-webpack-plugin
2. 使用如下方式配置

		var htmlWebpackPlugin = require('html-webpack-plugin');
		module.exports = {
			...
			plugins:[new htmlWebpackPlugin(
				filename:'index-[hash].html',//目标文件名
				template:"index.html",  //使用的html模板
				chunks:['main','a'],//需要插入的js模块，不指定时默认全部插入
				//excludeChunks:['b'],//指定不需要的模块，其余模块将被全部载入,与chunks选项相反
				inject:"head" //script插入位置 body 等取值
				minify:{/*压缩选项*/
				//常用附加选项：
					removeComments 移除HTML注释
					collapseWhitespace 移除空白节点
				}
				//参考地址：https://github.com/kangax/html-minifier#options-quick-reference

				//附加自定义参数
				description:'This is desc text .',
				time:new Date();
			),...]//如果多页面生成只需要再次调用htmlWebpackPlugin构造新的配置对象即可
			...
		}

**附加参数在HTML模板中使用方式：**

	<%= htmlWebpackPlugin.options.字段名 %>

	<%= htmlWebpackPlugin.options.time %>



**此处的模板实例引用必须使用htmlWebpackPlugin来引用，不管配置文件中的插件实例是什么命名**


> 模板中直接引入，而不是用插件inject插入script

	<%= htmlWebpackPlugin.files.chunks.模块名.entry %>

	inject:false //配置文件停用inject

模板路径：htmlWebpackPlugin.files.chunks.模块名.entry 会定位到生成的文件路径,使用手动指定script插入时，一般来说停用jniect

## 内联JavaScript

默认插件是不支持内联JS的，在模板中使用如下方式读取文件进行插入

	<%= compilation.assets[
		htmlWebpackPlugin.files.chunks.main.entry.substr
		(htmlWebpackPlugin.files.publicPath.length)
	].source() %>



	<% for(v in htmlWebpackPlugin.files.chunks) { %>
        <% if(v=='main') { %>
            <script>
                <%= compilation.assets[
					htmlWebpackPlugin.files.chunks[v].entry
				].source() %>
            </script>
        <% } %>
    <% } %>

chunks对象：

	{
	    "main": {
	        "size": 42,
	        "entry": "js/main.bundle.b9ad804ae33f5499cddc.js",
	        "hash": "b9ad804ae33f5499cddc",
	        "css": []
	    },
	    "a": {
	        "size": 53,
	        "entry": "js/a.bundle.f43441d6ec07501ddb85.js",
	        "hash": "f43441d6ec07501ddb85",
	        "css": []
	    }
	}

## publicPath
	
上线时，更改为前台域名即可，生成的引用路径会变为以域名开头的相对路径