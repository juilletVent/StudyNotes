## SRPM

指令：rpmbuild

配合参数主要有两个：`--rebuild --recompile` 前者将会便已打包源码生成rpm安装包，但是不会安装，后者则是一条龙服务，编译、打包、安装一气呵成

栗子：

 	rpmbuild --rebuild rp-pppoe-3.5-32.1.src.rpm


*SRPM可以打包自己发布程序，很好用，有兴趣可以了解一下，差不多也和编译的makefile一样需要编写编译文件然后打包发布即可*