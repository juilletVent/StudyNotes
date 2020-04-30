## **调试必备**

webpack 指定CLI参数`--display detailed`,提供尽可能多的编译信息，对于定位错误很有帮助

	webpack --progress --color --display detailed




## 配置sourceMap

	devtool:'eval-source-map', //一般就用eval模式就行了

具体模式有：

**source-map**	在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；
**cheap-module-source-map	**在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；

**eval-source-map**	使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；

**cheap-module-eval-source-map**	这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；


## 构建本地服务器

	npm install --save-dev webpack-dev-server

> devserver的配置选项	功能描述

- contentBase	默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
- port	设置默认监听端口，如果省略，默认为”8080“
- inline	设置为true，当源文件改变时会自动刷新页面
- historyApiFallback	在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html

		根节点下顶级选项
		devServer: {
		    contentBase: "./public",//本地服务器所加载的页面所在的目录
		    historyApiFallback: true,//不跳转
		    inline: true//实时刷新
	  	} 

		package.json添加启动命令
		"scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "start": "webpack",
		    "server": "webpack-dev-server --open"
		 },


## Babel 配置

	npm install --save-dev babel-core babel-loader babel-preset-es2015

根节点顶级配置项目

	module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015"
                        ]
                    }
                },
                //exclude: /node_modules/,
				include: ./src/js/
            }
        ]
    }

.babelrc文件 webpack会自动调用.babelrc里的babel配置选项

	{
	  "presets": ["es2015"]
	}


## postcss & autoprefixer 配置

	cnpm i postcss-loader autoprefixer --save-dev

根木目录下添加 postcss.config.js文件,添加如下内容：

	module.exports = {
	    plugins:[
	        require('autoprefixer')
	    ]
	};

webpack.config.js中css-loader前添加postcss-loader即可