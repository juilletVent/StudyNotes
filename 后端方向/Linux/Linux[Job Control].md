<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Job Control](#job-control)
    - [后台运行](#%E5%90%8E%E5%8F%B0%E8%BF%90%E8%A1%8C)
    - [管理操作](#%E7%AE%A1%E7%90%86%E6%93%8D%E4%BD%9C)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Job Control

### 后台运行

使用 & 将指令放入后台运行，但是输出流还是会打印在终端上，所以使用的时候注意将输出流重定向到文件或者/dev/null舍弃掉

	tar -zcvf test.tgz ./data > /dev/null &

### 管理操作

|操作&指令|参数|意义|
|---|---|---|
|ctrl+z|-|暂停当前任务|
|fg|jobNumber 需使用%标明参数为job编号而非pid|唤醒暂停的工作，进入前台|
|bg|jobNumber 需使用%标明参数为job编号而非pid|激活暂停的工作，但以后台方式继续运行|
|kill|signal标记 %jobNumber 需使用%标明参数为job编号而非pid|移除后台工作|
|jobs |-l 列出工作PID -r 正在运行的工作 -s暂停的工作|当前工作状态。*列表中带有plus的项目表示最近被暂停的工作，直接下达fg指令将会快速切回该工作*|
|nohup|\< something commond\>|脱机执行指令，一般commond都会使用 & 进行后台执行，**nohup不支持直接使用Linux内建指令，需编写bash或自定义的指令**|

一些栗子：

	# 唤醒 
	fg %2   或者 fg 激活最近被暂停的任务
	# 激活
	bg %1
	# 移除
	kill %5
	# 列表信息 
	jobs -lrs
	# 脱机使用
	nohup ./startService.sh &

