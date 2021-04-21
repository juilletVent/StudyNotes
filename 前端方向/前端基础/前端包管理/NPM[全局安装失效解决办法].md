<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [npm 全局安装无效的解决办法](#npm-%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85%E6%97%A0%E6%95%88%E7%9A%84%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## npm 全局安装无效的解决办法

查看当前npm全局安装目录：

	npm config get prefix

一般情况下node安装在

	C:\Program Files\nodejs

npm会使用

	C:\Users\gmsoft\AppData\Roaming\npm


如果出现全局安装后命令不能使用，则可以通过更换全局安装目录进行修复。

Direative：

	npm config set prefix 切换的目标路径
	cnpm config set prefix 切换的目标路径

然后将目标路径配置进入系统环境变量即可解决文件

一般情况下是不需要进行更改，全局安装就能直接使用，如果出现问题则可以使用上述方法进行修复，npm、cnpm均需要修改

