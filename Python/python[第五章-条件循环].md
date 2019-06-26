## 第五章 条件、循环与其他语句

#### 倒入模块

    import moduleName
    from moduleName import funName
    from moduleName import fun1,fun2...
    from moduleName import * // 全部倒入

    import moduleName as alias // 为模块取别名
    from moduleName import funName as alias // 为函数取别名

如果多个模块内存在函数命名重复，则应使用第一种倒入方式，然后使用moduleName.funName的形式来调用


#### 结构赋值

a,b,c = 1,2,4
// a:1 b:2 c:4
a,b = b,a // 交换a b的值



