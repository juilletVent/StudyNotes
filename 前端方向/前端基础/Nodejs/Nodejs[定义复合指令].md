## 配置package.json 使一次自定义指令，执行两个指令或者多个指令

1. 安装`concurrently`插件，此插件用于解析我们定义的多指令命令
2. 定义复合指令，类似：
	
		"scripts": {
			"start:app": "yarn workspace app run start",
			"start:c": "yarn workspace components run start",
			"start:anc": "concurrently \"yarn start:c\" \"yarn start:app\""
		},

3. 启动指令时运行复合指令即可`start:anc`