<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [配置package.json 使一次自定义指令，执行两个指令或者多个指令](#%E9%85%8D%E7%BD%AEpackagejson-%E4%BD%BF%E4%B8%80%E6%AC%A1%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4%E6%89%A7%E8%A1%8C%E4%B8%A4%E4%B8%AA%E6%8C%87%E4%BB%A4%E6%88%96%E8%80%85%E5%A4%9A%E4%B8%AA%E6%8C%87%E4%BB%A4)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 配置package.json 使一次自定义指令，执行两个指令或者多个指令

1. 安装`concurrently`插件，此插件用于解析我们定义的多指令命令
2. 定义复合指令，类似：
	
		"scripts": {
			"start:app": "yarn workspace app run start",
			"start:c": "yarn workspace components run start",
			"start:anc": "concurrently \"yarn start:c\" \"yarn start:app\""
		},

3. 启动指令时运行复合指令即可`start:anc`