## Shell基础

#### 语法声明

开头必须是`#!/bin/bash`指定该shell运行所使用的环境

#### 简单交互

read 指令，可以输出获取用户输入，并给出提示信息

栗子：

	read -p "提示信息" valName
	echo -e "您的输入为：$valName"

![变量替换规则](./img/bash-img-1.png)
![变量规则2](./img/bash-img-2.png)

