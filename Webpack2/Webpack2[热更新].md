# Webpack2 热更新

1. 安装webpack-dev-server 
	
		cnpm i webpack-dev-server --save-dev

2. webpack配置文件添加DevServer配置

		devServer: {
			contentBase: './dist',  服务器基本地址
			hot: true,				热更新
			inline:true,			更新模式
			port: 8080				端口
	    },

3. 添加插件配置  **强烈建议不要配置此选项，改用CLI参数形式 --hot，配置了此参数极有可能导致webpack指令打包出错**

		plugins:[
			new webpack.HotModuleReplacementPlugin()
		]

4. 添加执行脚本命令

		"scripts": {
			"start": "webpack-dev-server --color --progress "	颜色展示&编译进度
			//如果没有配置HotModuleReplacementPlugin，则CLI 添加 --hot
		},

**Tips:使用Ctrl+C结束服务器CLI后，node的服务器进程并未停止，需要手动关闭，否则会再次执行时会出现端口占用错误**

**Tips:热更新不会生成目标文件，编译后的目标文件存在于内存中，所以dist夹子下不会看到文件更新**

**防坑1**：webpack的热加载配置似乎依赖npm安装的vue路径，所以使用热更新时vue必须使用npm安装

**防坑2**：webpack热加载配置如果配置了plugin相应的参数，将导致webpack指令打包相关问题，所以建议使用CLI参数形式指定`--hot`