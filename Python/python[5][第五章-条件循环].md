## 第五章 条件、循环与其他语句

#### 倒入模块

    import moduleName
    from moduleName import funName
    from moduleName import fun1,fun2...
    from moduleName import * // 全部倒入

    import moduleName as alias // 为模块取别名
    from moduleName import funName as alias // 为函数取别名

如果多个模块内存在函数命名重复，则应使用第一种倒入方式，然后使用moduleName.funName的形式来调用


#### 解构赋值

a,b,c = 1,2,4
// a:1 b:2 c:4
a,b = b,a // 交换a b的值

#### 块语句

缩紧创建块语句，冒号标示块语句开始【:】

ps：Flase None 0 "" () [] {} 在python中都被解释为假值，其他所有值都被解释为真值

分支语句栗子：

    if user.find('admin')!=-1:
        print '包含admin'
    else:
        printf '不包含'

> else if子句

    if ...:
        # do something...
    elif ...:
        # do something...
    else:
        # do something...


> 判断表达式运算法

常用的与一般编程语言一致，不再赘述，一下为py特有：

- 判断是不是同一个对象： a is b
- 是否是同一个对象 逆操作 ：a is not b
- 容器中是否包含某个值： a in b
- 逆向：a not in b

py中 == 可以判断list中的值是否一致，如果两个list的值一样则返回true，非常nb

py中 比较运算符可以连接使用形如 0 < a < 3 或者 0 < a != 3 双条件定义边界时非常好用,js中会将连接的比较运算符自左向右依次运算，取得之前的比较结果代入后继续运算，所以不能得到预期值，py则为整体解释，不能混淆

##### 连接运算符  and or not 

not 取反



#### 循环控制语句

> while

> for

迭代list对象：

    list = [1,2,3,4]
    for item in list:
         print item

ps:快速生成某个范围的数字list：

    range(0,10) // 包含下限，但是不会包含上限
    // 输出 [0,1,....9]

    for number in range(0,10)
        print number

> 循环处理字典所有的键

    for key in obj:
        print obj[key]

    for key,val in obj.items():
        print key,val
    
> 便利数组

    for i in range(len(array)):
        print array[i]

ps: for-in 便利的时候可以对特定元组list进行解构循环：
    list = [('user','chenan'),('password','hhsjkhfjds')]

    for key,val in list:
        print key,val 
        // user chenan
        // password hhsjkhfjds

    list1 = ['user','pass']
    list2 = ['chenan','123']
    zip(list1,list2) // [('user','chenan'),('pass','123')]
    // zip 有一个特性，当最短的list结束的时候就会结束

便利的时候提供索引：

    list = [1,2,3]
    for index,item in enumerate(list):
        print index,item
        if(index==2):
            break


> 占位语句

pass ，用于在py中进行占位，因为在py中空的块语句是非法的

> del 删除运算符

del会删除引用的变量本身，如果如果该索引是其引用的值的唯一索引，那么那个值也会被删除

#### 动态py代码

exec函数会将字符串以py代码的形式进行解释，类似于js中的eval