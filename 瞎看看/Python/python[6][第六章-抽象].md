<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [第六章 抽象](#%E7%AC%AC%E5%85%AD%E7%AB%A0-%E6%8A%BD%E8%B1%A1)
    - [局部作用域全局变量获取](#%E5%B1%80%E9%83%A8%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E8%8E%B7%E5%8F%96)
    - [匿名函数](#%E5%8C%BF%E5%90%8D%E5%87%BD%E6%95%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 第六章 抽象

api：

- map
- filter
- reduce
- sum
- apply

> 函数定义

使用def或者函数定义完成函数定义

    def sayHello(name):
        printf 'hello,' + name

    sayHello('chenan')

    # 命名实参,指定实际参数的对应关系
    sayHello(name='chenan')

> 可变参数

    def fun(*args):
        print(args)

    fun(1,2,3,4,5,6) // (1,2,3,4,5,6)

    # 命名可变形式参数
    def fun(x,y,*args,**args_name):
        print x,y
        print args
        print args_name

    fun(1,2,3,4,name='chenan')
    # 1,2
    # (3,4)
    # { 'name' : 'chenan' }


#### 局部作用域全局变量获取

    # 非重名的全局变量可以直接引用
    globals()['全局变量名']

    全局变量定义：

    global val_name = 1

#### 匿名函数

    lambda arg1,arg2:arg1+arg2
    // 等价于：(arg1,qrg2) => arg1+arg2

