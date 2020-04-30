<!--
 * @Author: Gmsoft - WeiHong Ran
 * @Date: 2019-09-02 10:52:04
 * @LastEditors: Gmsoft - WeiHong Ran
 * @LastEditTime: 2019-09-02 11:12:14
 * @Description: Nothing
 -->
## Reflect Method 成员方法

API：

- getDeclaredMethords:获取全部方法
- getMethords:获取所有的公开方法
- getDeclaredMethord:获取指定方法
- getMethord:获取公开的指定方法
- invoke:执行方法

*Tips:私有方法同私有属性，需要设置访问属性才可以使用*

#### 栗子：

~~~
Class clazz = Class.forName("xxxxx");
// 获取私有方法
Methord methord = clazz.getDeclareMethord("methordName");
// 设置访问权限
methord.setAccessible(true);
// 执行私有方法,返回值为Object类型，有需要的话可以转型为具体的返回值类型
Object result = methord.invoke(obj,arg1,arg2........);
~~~