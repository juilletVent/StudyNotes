<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Field 成员变量](#field-%E6%88%90%E5%91%98%E5%8F%98%E9%87%8F)
    - [成员变量的获取](#%E6%88%90%E5%91%98%E5%8F%98%E9%87%8F%E7%9A%84%E8%8E%B7%E5%8F%96)
    - [值得获取与设置](#%E5%80%BC%E5%BE%97%E8%8E%B7%E5%8F%96%E4%B8%8E%E8%AE%BE%E7%BD%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Field 成员变量

#### 成员变量的获取

~~~
clazz.getFields(); // 所有公开属性
clazz.getDeclaredFields(); // 取得所有声明的属性
clazz.getField("fieldName"); // 取得某个公开的属性
clazz.getDeclaredField("fieldName") // 获取声明的属性，不论公开与否
~~~

#### 值得获取与设置

取得field后可以使用field调用相关api对某一个对象实例属性进行赋值，如果是私有属性，则需要先设置其可以访问才能进行取值、赋值操作：

~~~
// 设置操作权限
field.setAccessible(true);
Field.setAccessible(fieldObjs,true); //fieldObjs为Field实例数组，同时设置一组field的访问权限
// 取值
filed.get(obj)
// 赋值
filed.set(obj,val)
~~~