<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [基础](#%E5%9F%BA%E7%A1%80)
  - [read、array、declare/typeset 的使用](#readarraydeclaretypeset-%E7%9A%84%E4%BD%BF%E7%94%A8)
      - [](#)
      - [array](#array)
      - [declare/typeset](#declaretypeset)
  - [变量内容变更](#%E5%8F%98%E9%87%8F%E5%86%85%E5%AE%B9%E5%8F%98%E6%9B%B4)
  - [变量默认值](#%E5%8F%98%E9%87%8F%E9%BB%98%E8%AE%A4%E5%80%BC)
  - [echo](#echo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 基础

## read、array、declare/typeset 的使用

####

read

用于在 console 获取用户输入，在脚本执行中与用户进行交互，使用方法如下：

    read -p '确定格式化硬盘吗？（y/n）:' confirm
    echo $confirm

参数：

- -p：显示的输入提示
- -t：等待时间，如果超时，叫忽略用户输入，以空输入作为变量值

#### array

定义：

    var=("1" "2" 3 4)
    var[0]=0
    var[2]=2

使用：

    echo ${var[0]}

Tips:允许稀疏数组存在

#### declare/typeset

用于指定变量数据类型，语法如下

    declare [-aixr] variable

参数含已解释：

- -a：定义类型为数组
- -i：定义类型为整数
- -x：转换变量为环境变量 [+x 语法可以用于取消导出]
- -r：设置 readonly
- -p：显示当前变量的定义情况[理解为输出定义当前变量的字符串]

举个栗子：

    # 默认为字符串类型
    sum=100+200
    echo $sum  >> 100+22

    declare -i sum=100+200
    echo $sum  >> 300

    # 取消导出的环境变量
    sum=100
    # 导出环境变量
    declare -x sum
    # 取消导出
    declare +x sum

    # 多个参数连用
    declare -ixr sum="300" // 定义sum为整数且是不可变更的环境变量

## 变量内容变更

头匹配模式[#]：

    variable=/test1/aaa/test/bin:/test2/aaa/test/bin:/root/wwwroot

    # 会输出variable变量删除了从开头到test/bin结尾的最短匹配之后的内容[非贪婪模式，匹配最短的规则]
    echo ${variable#/*test/bin:}  -->>  /test2/aaa/test/bin:/root/wwwroot

    # 同上，不过是贪婪模式，区别在于使用了两个sharp
    echo ${variable##/*test/bin:}  -->>  /root/wwwroot

尾匹配模式[%]：

    variable=/root/wwwroot:/test1/aaa/test/bin:/test2/aaa/test/bin

    # 会输出variable变量删除了从结尾最短匹配之后的内容[非贪婪模式，匹配最短的规则]
    echo ${variable%:*bin}  -->>  /root/wwwroot:/test1/aaa/test/bin
    # 同上，贪婪模式，尽可能长的匹配，进行删除
    echo ${variable%%:*bin}  -->>  /root/wwwroot

替换： # 部分替换
${var/pattern/targetStr}
	# 全部替换
	${var//pattern/targetStr}

| 语法                          | 含义                         |
| ----------------------------- | ---------------------------- |
| \${变量#匹配模式}             | 从开头匹配并删除，非贪婪模式 |
| \${变量##匹配模式}            | 从开头匹配并删除，贪婪模式   |
| \${变量%匹配模式}             | 从结尾匹配并删除，非贪婪模式 |
| \${变量%%匹配模式}            | 从结尾匹配并删除，贪婪模式   |
| \${变量/匹配模式/目标字符串}  | 字符串替换，非贪婪模式       |
| \${变量//匹配模式/目标字符串} | 字符串替换，贪婪模式         |

## 变量默认值

设定变量默认值，在 shell 中很有用

    val=defVal;
    # 默认为字符串
    echo ${invalid-defaultVal}  -->> defaultVal
    echo ${invalid-$val}  -->> defVal

    invalid=	// 赋值空串
    #空字符串默认问题
    echo ${invalid-defaultVal}  -->> 空串
    echo ${invalid:-defaultVal}  -->> defaultVal

Tips：空字符串替换时语法为添加一个冒号

## echo

echo 如果需要输出转义字符，需要添加 `-e`参数
