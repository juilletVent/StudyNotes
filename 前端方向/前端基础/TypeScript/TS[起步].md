<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [开始](#%E5%BC%80%E5%A7%8B)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 开始

> 安装

	npm install -g typescript

> 配置

我们需要创建一个tsconfig.json文件，它包含了输入文件列表以及编译选项。 在工程根目录下新建文件 tsconfig.json文件，添加以下内容：

	{
	    "compilerOptions": {
	        "outDir": "./dist/",
	        "sourceMap": true,
	        "noImplicitAny": true,
	        "module": "commonjs",
	        "target": "es5",
	        "jsx": "react"
	    },
	    "include": [
	        "./src/**/*"
	    ]
	}

config配置地址：
[https://www.tslang.cn/docs/handbook/tsconfig-json.html](https://www.tslang.cn/docs/handbook/tsconfig-json.html "config Link")

> 编译

	tsc greeter.ts


