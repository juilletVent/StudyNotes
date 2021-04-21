<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript基础](#javascript%E5%9F%BA%E7%A1%80)
  - [数据类型](#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)
  - [类型检测](#%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%B5%8B)
  - [变量作用域](#%E5%8F%98%E9%87%8F%E4%BD%9C%E7%94%A8%E5%9F%9F)
  - [严格模式](#%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F)
  - [原型链](#%E5%8E%9F%E5%9E%8B%E9%93%BE)
  - [JSON](#json)
  - [闭包](#%E9%97%AD%E5%8C%85)
        - [弹窗](#%E5%BC%B9%E7%AA%97)
        - [主要事件](#%E4%B8%BB%E8%A6%81%E4%BA%8B%E4%BB%B6)
        - [Date对象](#date%E5%AF%B9%E8%B1%A1)
        - [数组对象常用方法](#%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95)
        - [Window对象方法](#window%E5%AF%B9%E8%B1%A1%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# JavaScript基础

## 数据类型

- 数据类型存在自动装箱拆箱机制
- 五种基本数据类型：string nomber boolean null undefine
- 一种对象数据类型

## 类型检测

- typeof:type 100 返回 'number'这个字符串


## 变量作用域

js中没有块级作用域的概念，也就是说，在块级语句中定义的局部变量，在块级语句结束后依然有效


## 严格模式

执行前添加 'use strict' 在代码开始前

## 原型链

> obj.prototype

- obj.prototype：指向对象自身结构
- obj.prototype.__proto__:指向对象原型

## JSON

- 对象序列化：JSON.stringify(obj)
- 对象反序列化：JSON.parse(str)

**覆盖元素的toJSON方法，返回定制内容即可完成对象序列化的定制过程**

**覆盖valueOf可以实现对象隐式转换为数字时的定制**

## 闭包

内部匿名函数，具备访问外层函数局部变量的能力，致使外层局部变量不能随函数调用的结束而析构的现象称之为闭包




##### 弹窗

~~~
confirm('提示信息') 确认弹窗
alert('提示信息') 提示弹窗
var myname=prompt("请输入你的姓名:");
if(myname!=null)
  {   alert("你好"+myname); }
else
  {  alert("你好 my friend.");  }

//打开窗口
window.open(url,'_self',width=600,height=400,top=100,left=0);
~~~

##### 主要事件

![](http://img.mukewang.com/53e198540001b66404860353.jpg)

##### Date对象
![](http://img.mukewang.com/555c650d0001ae7b04180297.jpg)

##### 数组对象常用方法
![](http://img.mukewang.com/533295ab0001dead05190599.jpg)

##### Window对象方法
![](http://img.mukewang.com/535483720001a54506670563.jpg)

