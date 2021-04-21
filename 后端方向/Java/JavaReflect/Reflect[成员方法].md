<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Reflect Method 成员方法](#reflect-method-%E6%88%90%E5%91%98%E6%96%B9%E6%B3%95)
    - [栗子：](#%E6%A0%97%E5%AD%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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