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


## 包

所有拓展的模块中包含的api在使用的时候都需要带上模块名，举个🌰：

    # 我需要使用regex进行字符串匹配，那么我可能需要这样操作
    import re
    regex = re.compile('^[0-9a-zA-Z]{1,50}$')
    if re.match(regex,'testString'):
        print 'matched'
    else:
        print 'no match'
    # 其他的模块同理

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

- search 在字符串中查找模式
- match 在字符串开始处匹配模式
- split 根据模式来分割字符串
- findall 寻找所有匹配模式的子串
- sub 替换所有与模式匹配的子串
- escape 将字符串中所有正则表达式字符串进行转译

匹配成功后，py会返回匹配对应的组信息，0代表全部匹配信息，从1开始分别代表模式串中的子模式，举个🌰：

    regex = re.compile('(hello)\W+(world)')
    dtBuffer = re.match(regex,'hello world')

    dtBuffer.group(0) # hello world
    dtBuffer.group(1) # hello
    dtBuffer.groups()
    # ['hello world','hello','world']

创建正则表达式时，添加注释：

    regex = re.compile(r'''
        (hello) # 匹配hello
        \W+     # 匹配空白字符
        (world) # 匹配world
        ''',re.VERBOSE
    )

    这种写法会让正则表达式更好理解，推荐复杂的正则表达式都采用这种写法，不至于让维护好无头绪可言

> 使用组号进行替换

    # 沿用上面创建的正则表达式
    dtBuffer = re.sub(regex,r'\1\2jack','hello world')
    print dtBuffer # hello jack


#### 其他的一些有用的库

- functools 不知道干嘛用的
- difflib 计算序列相似度
- hashlib 计算签名 加密，验签时很有用
- csv 对csv的支持
- timeit 性能测试模块
- profile 性能分析
- trace 总体分析
- datetime time模块的升级版，time不够用时就用这玩意儿
- itertools 迭代器相关模块
- logging 日志模块
- getopt & optparse 处理命令行参数相关问题，程序启动时的args相关
- cmd 命令行解释模块
