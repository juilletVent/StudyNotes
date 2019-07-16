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

