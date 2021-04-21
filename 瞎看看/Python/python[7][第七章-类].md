<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [第七章](#%E7%AC%AC%E4%B8%83%E7%AB%A0)
    - [创建类](#%E5%88%9B%E5%BB%BA%E7%B1%BB)
    - [继承](#%E7%BB%A7%E6%89%BF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 第七章

api:

callable(obj):判断是否可调用【py 2】
hasattr(obj,name):类似callable py3可用
getattr(obj,name[,defValue])：安全去值，与lodash的getValue类似
isinstance(obj,class):判断类是不是属于目标类
issubclass(A,B):判断a是不是b的子类
random.choice(seq):从非空序列中随机抽取值
setattr(obj,name,val):给对象设定值
type(pbj):返回对象的类型

#### 创建类

  __metaclass__ = type # 确定使用新式类
  
  class Person:

      def setName(self,name):
        self.name = name

      def getName(self):
        return self.name

      def greet(self):
        print "Hello world! I'm %s." % self.name

> 私有属性&方法

使用双下划线定义成员变量与函数即可，函数与变量在类外将被添加前缀`_类名`，但是实际上在外部添加上前缀后仍可访问

单下划线定义，类似protect，外部可以访问，但是import * 不会将其导入，可能与protect的权限控制不太一样

#### 继承

  class Fatcher:
    def Whoami(self):
      print 'fatcher'

  class child(Father):
    def Whoami(self):
      print 'child'

> 类似原型链的属性 __bases__

这个属性可以获取已知类型的父类型，类似js的__proto__

> 多继承

  class A(B,C):
    pass

