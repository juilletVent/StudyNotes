<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [基础部分](#%E5%9F%BA%E7%A1%80%E9%83%A8%E5%88%86)
    - [指定源文件编码格式](#%E6%8C%87%E5%AE%9A%E6%BA%90%E6%96%87%E4%BB%B6%E7%BC%96%E7%A0%81%E6%A0%BC%E5%BC%8F)
    - [运算部分](#%E8%BF%90%E7%AE%97%E9%83%A8%E5%88%86)
- [字符串部分](#%E5%AD%97%E7%AC%A6%E4%B8%B2%E9%83%A8%E5%88%86)
    - [编码问题](#%E7%BC%96%E7%A0%81%E9%97%AE%E9%A2%98)
    - [字符串拼接](#%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%8B%BC%E6%8E%A5)
    - [跨行字符串](#%E8%B7%A8%E8%A1%8C%E5%AD%97%E7%AC%A6%E4%B8%B2)
    - [原始字符串](#%E5%8E%9F%E5%A7%8B%E5%AD%97%E7%AC%A6%E4%B8%B2)
    - [Unicode 字符串](#unicode-%E5%AD%97%E7%AC%A6%E4%B8%B2)
    - [获取用户输入](#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E8%BE%93%E5%85%A5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 基础部分

#### 指定源文件编码格式

    # coding=utf-8

#### 运算部分

全局浮点数运算标示：`from __future__ import division`

ps：运算可以通过设置全局标示变更为浮点运算而不是普通的运算，某些时候会用到，在此模式下如果怕需要时整数运算，除法的 / 变为 //

// 为整除运算

> 幂运算

    2**3 含义为 2 的三次方

运算优先级高于！属于高优先级运算符

> 长整型

数字后添加l 即可 建议使用大写L 避免与1弄混

> 十六进制 & 八进制

    十六进制 0xAF
    八进制 055
    

> 获取用户输入

    a = input("提示语句：")
    print a

> 引入模块

    import 模块名称

    # 解构导入
    from 模块名 import fn1 fn2

## 字符串部分

*重点：设置默认字符编码格式 sys.setdefaultencoding('utf-8')，否则所有的字符串默认使用ascii编码，中文解析就会出错*

常用api:

* len:获取字串长度
* 


#### 编码问题

在原文件头部需要添加编码说明，指定编码类型，默认为ASCII编码，不支持中文，需要变更为utf-8

    添加如下注释到文件头部
    #coding=UTF-8

#### 字符串拼接

字符串与变量、数字不能直接拼接、相加，需要使用函数或者反引号进行处理才能相加

    name='chenan'
    print 'hello' 'name'
    print 'hello' + str(name) // hellochenan
    print 'hello' + repr(name) + repr(123) // hello'chenan'
    print 'hello'+`name` // hello'chenan'

ps:repr 与 反引号 会输出带有引号的实际内容，如果需要连接字符串需要使用str进行转换,repr 转换出来的显示效果带有变量类型信息，而str则转为友好的字符串形式

#### 跨行字符串

> 三引号 单引号 双引号均可以

    '''line 1
    line2 "引号也可以使用"'无需转译'
    结束了'''

> 转译换行符

    str = 'place enter \
        something'

#### 原始字符串

在字符串之前添加r标示此字符串为原始字符串,这将会使转移字符失效，但是边界字符串仍需要进行转译，切输出的结果将包含转译字符，所以不推荐在原始字符串中嵌套边界定义字符

    str = r'raw str \n\r'
    print str // raw str \n\r

#### Unicode 字符串

前缀为u开头

    str = u'hello 这是一段Unicode编码的字符串'

#### 获取用户输入

    # 非安全输入，会解析表达式
    data = input('place input something')
    # 安全输入
    data = raw_input('place enter something')

