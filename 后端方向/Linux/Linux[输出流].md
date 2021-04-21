<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [输入输出流](#%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E6%B5%81)
- [指令返回值与指令关联性](#%E6%8C%87%E4%BB%A4%E8%BF%94%E5%9B%9E%E5%80%BC%E4%B8%8E%E6%8C%87%E4%BB%A4%E5%85%B3%E8%81%94%E6%80%A7)
- [管道命令](#%E7%AE%A1%E9%81%93%E5%91%BD%E4%BB%A4)
- [Bash中的正则](#bash%E4%B8%AD%E7%9A%84%E6%AD%A3%E5%88%99)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 输入输出流

- > 标准输出流，覆盖方式
- >> 标准输出流 追加
- < 标准输入流
- 2> 标准错误输出流
- 1> 标准正确输出流

## 指令返回值与指令关联性

- && :`cmd1 && cmd2` 如果cmd1正确执行并且$?=0，则开始执行cmd2
- || :`cmd1 || cmd2` 如果cmd1执行失败或者$?!=0，则开始执行cmd2

Tips:**系统变量$i指示最近一条指令执行的情况，非零为失败/错误，0标识成功**

## 管道命令

- cut 主要用于单行输出分割
- grep 主要用于多行输出过滤，十分常用 参数:a 以文本搜索二进制文件 c 统计次数 i 忽略大小写 n 行号 v 反向寻找[不包含目标关键字的行]

*Tips：nl命令取代cat命令*

## Bash中的正则

注意点：

- 需要添加引号进行界定
- 与通用的正则表达式不同，不能使用诸如\d \s之类的特殊含义符，linux定义了一套自己的规则，类似[:lower:]代表小写
- *号代表重复前面的字符0-无数次
- {}由于在bash中具有特殊含义，所以使用时需要进行转义

**注意：配合sed指令[通篇处理]、awk[单行处理]会很常用，在shell script中也经常使用**

> 如果要使用正则匹配诸如分组、+、|、？这些特性可以使用egrep,他是grep指令的扩展版本