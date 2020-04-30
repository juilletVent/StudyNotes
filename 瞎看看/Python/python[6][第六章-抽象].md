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

