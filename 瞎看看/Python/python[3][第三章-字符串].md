<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [第三章 字符串](#%E7%AC%AC%E4%B8%89%E7%AB%A0-%E5%AD%97%E7%AC%A6%E4%B8%B2)
    - [常用api](#%E5%B8%B8%E7%94%A8api)
    - [格式化](#%E6%A0%BC%E5%BC%8F%E5%8C%96)
    - [保持字符串不被转译 & 跨行字符串](#%E4%BF%9D%E6%8C%81%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B8%8D%E8%A2%AB%E8%BD%AC%E8%AF%91--%E8%B7%A8%E8%A1%8C%E5%AD%97%E7%AC%A6%E4%B8%B2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 第三章 字符串

#### 常用api

- find: str.find('subStr' [,startIndex,endIndex]) 返回索引位置，未找到返回-1
- join: strs.join(',') // 数组元素必须都是字符串，否则将会失败
- lower
- replace: str.replace('targetStr','contentStr') // 替换函数
- split: '1,2'.split(',') // ['1','2'] 字符串分割函数
- strip 去除字符串两边的空格





#### 格式化

使用%做为运算符号

    formatSTr = 'hello %s or %s'
    vals = ('val1', 'val2') // 应使用元组而不是list，list会被解释为一个值，而不是一组值
    print formatStr % vals // hello val1 or val2

> 模板替换

预定义模板，进行指定替换即可

    from string import Template
    s = Template('$x, or $x !')
    s.substitute(x='slurm')
    // slurm, or slurm !

键值对形式替换：

    tpl = Template('$key1,$key2')
    vals = {}
    vals['key1'] = 'hello'
    vals['key2'] = 'world'
    tpl.substitute(vals) // hello,world

ps:对应的拓展函数safe_substitute函数不会因为输入不正确而报错


#### 保持字符串不被转译 & 跨行字符串

1、字符串前的 r 告诉解释器，不要对字符串内的反斜线进行反转译
2、''' 三个英文单引号告诉解释器这是一个跨行字符串

str = r'''
    hello world .
    \r\n
    hello
'''




