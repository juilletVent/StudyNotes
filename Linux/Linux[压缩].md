# Linux 下常用压缩命令 tar, tar.gz(tgz), tar.bz2,zip

* [tar命令](#tar)
* [tar.gz与tgz打包压缩](#tar.gz&tgz)
* [tar.bz 压缩比最高](#tar.bz)
* [gz](#gz)
* [zip](#zip)
* [rar](#rar)


## tar

打包调用规则：

	tar -cvf examples.tar files|dir

释放调用规则：

	tar -xvf examples.tar （解压至当前目录下）
	tar -xvf examples.tar  -C /path (/path 解压至其它路径)

参数说明：

- -c, --create  create a new archive 创建一个归档文件
- -v, --verbose verbosely list files processed 显示创建归档文件的进程
- -f, --file=ARCHIVE use archive file or device ARCHIVE  后面要立刻接被处理的档案名,比如--file=examples.tar
- -x, --extract, extract files from an archive 从一个归档文件中提取文件

举例：
	
	# 打包
	tar -cvf file.tar file1       #file1文件
	tar -cvf file.tar file1 file2 #file1，file2文件
	tar -cvf file.tar dir         #dir目录
	# 释放
	tar -xvf file.tar
	tar -xvf file.tar -C /temp  #解压到temp目录下

## tar.gz&tgz

创建：

	tar -zcvf examples.tgz examples (examples当前执行路径下的目录)

释放：

	tar -zxvf examples.tar （解压至当前执行目录下）
	tar -zxvf examples.tar  -C /path (/path 解压至其它路径)
	
说明[其他参数为tar命令参数]：

- -z, --gzip filter the archive through gzip 通过gzip压缩的形式对文件进行归档
	
举例：

	# 打包压缩
	tar -zcvf file.tgz dir #dir目录
	# 拆包释放
	tar -zcvf file.tgz
	tar -zcvf file.tgz -C /temp


## tar.bz

适用于网络情况较差的环境，牺牲本地计算性能力求减小网络传输体积

创建调用：

	tar -jcvf examples.tar.bz2 examples   (examples为当前执行路径下的目录)

释放调用：
	
	tar -jxvf examples.tar.bz2 （解压至当前执行目录下）
	tar -jxvf examples.tar.bz2  -C /path (/path 解压至其它路径)

说明：

- -j, --bzip2 filter the archive through bzip2 通过bzip2压缩的形式对文件进行归档

举例：
	
	# 创建
	tar -jcvf file.tar.bz2 dir #dir目录
	# 释放
	tar -jxvf file.tar.bz2
	tar -jxvf file.tar.bz2 -C /temp

## gz

压缩：
gzip -d examples.gz examples

解压：
gunzip examples.gz

## zip

zip 格式是开放且免费的，所以广泛使用在 Windows、Linux、MacOS 平台，要说 zip 有什么缺点的话，就是它的压缩率并不是很高，不如 rar及 tar.gz 等格式。
压缩：
zip -r examples.zip examples (examples为目录)

解压：
zip examples.zip

## rar

压缩：
rar -a examples.rar examples

解压：
rar -x examples.rar

> 总结

综上结果，初步结论：

综合起来，在压缩比率上： tar.bz2>tgz>tar
占用空间与压缩比率成反比： tar.bz2<tgz<tar
耗费时间（打包，解压）
打包：tar.bz2>tgz>tar
解压： tar.bz2>tar>tgz
从效率角度来说，当然是耗费时间越短越好

因此，Linux下对于占用空间与耗费时间的折衷多选用tgz格式，不仅压缩率较高，而且打包、解压的时间都较为快速，是较为理想的选择。

结论：

再一次印证了物理空间与时间的矛盾（想占用更小的空间，得到高压缩比率，肯定要牺牲较长的时间；反之，如果时间较为宝贵，要求快速，那么所得的压缩比率一定较小，当然会占用更大的空间了）。

**原文链接：[https://www.cnblogs.com/joshua317/p/6170839.html](https://www.cnblogs.com/joshua317/p/6170839.html)**
