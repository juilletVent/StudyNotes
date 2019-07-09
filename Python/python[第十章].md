## 第十章

#### 模块

导入自己的模块：

    # 添加路径，否则解释器无法找到目标文件
    sys.path.append('module path')
    sys.path.expanduser('reltive path') // mac or linux

    import 文件名

#### 包

建立文件夹，在文件夹下建立 `__init__.py` 文件，则这个文件夹就成为一个py包，其他的模块只需要放进来即可，倒入方式如下：

    import packageName # 导入package本身 __init__
    import packageName.otherModule # 导入包下面的其他模块
    import packageName.longName as shortName # 别名




#### sys模块

程序本身相关信息，以及操作

- argv 启动相关参数，脚本本身的信息，以及启动参数
- exit([arg]) 退出当前程序
- modules 映射模块名字到载入模块的字典
- path 查找模块所在目录的目录名列表
- platform 平台标示
- stdin 标准输入流
- stdout 标准输出流
- stderr 标准错误输出流


#### os模块

与操作系统相关的信息以及操作

- environ 对环境变量进行映射
- system(command) 执行shell命令
- sep 路径中的分割
- pathsep 分割路径的分割符
- linesep 行分隔符 \r \n or \r\n
- urandom(n) 返回n字节的加密强随机数据


#### fileinput 文件输入模块

- input 便利多个输入流中的行
- filename 返回当前文件的名称
- lineno 返回当前行
- isfirstline 检查是不是首行
- isstdin 检查最后一行是否来自标准输入
- nextfile 关闭当前文件移动到下一个文件
- close 关闭序列


#### 常用数据结构

- set 集合
- heapq 堆 ：需要引入模块 from heapq import *
- deque 双端队列 需引入

#### time模块

- asctime 时间元组转字符串
- localtime 将秒转换为日期元组
- mktime 将时间元组转换为本地时间
- sleep 休眠n秒
- strptime 将字符串解析为时间元组
- time 当前unix时间戳（秒）

#### random

- random 返回 [0,1)
- getrandbits 以长整型返回n个随机位
- uniform(a,b) 返回 n  a<=n<b
- choice(seq) 从seq随即返回元素
- shuffle ？？？
- sample(seq,n) 队列中随机选取n个独立的元素

#### shelve 文件存储

- open(filename) 创建文件。返回文件句柄，或者说操作对象

#### re 正则表达式

