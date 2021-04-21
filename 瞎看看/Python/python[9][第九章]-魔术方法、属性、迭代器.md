<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [第九章 魔术方法、属性、迭代器](#%E7%AC%AC%E4%B9%9D%E7%AB%A0-%E9%AD%94%E6%9C%AF%E6%96%B9%E6%B3%95%E5%B1%9E%E6%80%A7%E8%BF%AD%E4%BB%A3%E5%99%A8)
    - [魔术方法](#%E9%AD%94%E6%9C%AF%E6%96%B9%E6%B3%95)
    - [静态方法和成员方法](#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95%E5%92%8C%E6%88%90%E5%91%98%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 第九章 魔术方法、属性、迭代器

#### 魔术方法

> 构造方法 __init__

与常见编程语言表现一致，只是名字特殊化而已

    class A:
        def __init__(self,name):
            self.name = name
        def myprint(self):
            print self.name
    objA = A('chenan');
    objA.myprint()

*父类init函数：SuperClassName.__init__(self,args,args2)*

使用super初始化父类：

    super(ChildClassName,self).__init__()

#### 静态方法和成员方法

静态方法：

    @staticmethod
    def smeth():
        print 'this is static method'

    def cmeth():
        print 'this is memeber method'

