## 第七章

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