## 基本编译

直接编译就好，如果使用了动态链接库添加-l参数指名动态链接库即可

	gcc hello.c lib.c

## makefile

	# 变量定义
	targetFile = hello.o lib.o
	# 命令区段
	main:hello.o lib.o
	#指令部分必须以tab开头
		gcc -o hello ${targetFile} -lm
	clean:
		rm -f ${targetFile}

	# 执行时使用如下命令即可执行指定区段
	make main
	make clean


## makefile衍生

目前makefile不是简单的执行编译，清理编译中间文件那么简单了，添加了环境监测、特性检测、编译优化等很多选项，所以使用了工具进行makefile的生成，makefile生成流程大致如下图

![](./img/makefile.gif)

一般下载的软件都会提供configure.in Makefile.am aclocal.m4 Makefile.in configure,或者在解压后会有INSTALL文件，查看该文件，跟随引导进行编译安装即可

值得注意的是configure执行时添加参数 --prefix=安装目录 可以指定软件安装目录，推荐这样做，卸载比较方便，不然软件将按照默认路径安装，文件散布在系统的各个目录，清理比较麻烦