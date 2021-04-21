<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [JavaScript OOP](#javascript-oop)
  - [定义](#%E5%AE%9A%E4%B9%89)
  - [继承](#%E7%BB%A7%E6%89%BF)
  - [获取实例对象的对象原型](#%E8%8E%B7%E5%8F%96%E5%AE%9E%E4%BE%8B%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%AF%B9%E8%B1%A1%E5%8E%9F%E5%9E%8B)
  - [获取对象本身是否具备某个属性](#%E8%8E%B7%E5%8F%96%E5%AF%B9%E8%B1%A1%E6%9C%AC%E8%BA%AB%E6%98%AF%E5%90%A6%E5%85%B7%E5%A4%87%E6%9F%90%E4%B8%AA%E5%B1%9E%E6%80%A7)
  - [调用父类被覆盖的方法](#%E8%B0%83%E7%94%A8%E7%88%B6%E7%B1%BB%E8%A2%AB%E8%A6%86%E7%9B%96%E7%9A%84%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# JavaScript OOP

## 定义

> 类的创建

类在JS中的定义相较于强类型语言的直接定义有很大的区别，在JS中函数也用类描述，创建一个函数的普通定义，使用new关键字加上函数调用即可创建一个以函数的prototype属性为原型[基类]的类的实例

栗子1[使用构造函数的方式]：
~~~
function a(){
	this.x = 1
}

var x = new a()
console.log(x.x) //输出1
~~~

栗子2[使用更改函数prototype属性的方式]：
~~~
function b(){}
b.prototype.x = 1//实际上b.x等效

var x = new b()
console.log(x.x) //输出1
~~~

**栗子1的属性直接添加在对象本身上，而栗子2的属性则添加在对象的原型上**

使用new进行调用的时候，函数将作为构造函数使用，函数内this的指向转变为将要返回的实例对象，普通调用时，this指向window对象[因为普通调用时，函数调用上下文为全局上下文，其this指向window]

使用函数创建对象时，函数自身的prototype将作为创建的对象的对象原型，也就是实例对象的__proto__属性

## 继承

1. 正常定义父类构造函数，搭配使用 func.prototype.attr进行属性配置
2. 创建子类构造函数，函数中调用父类构造函数
	~~~
	function Child(a,b,c){
		Parent.call(this,a,b)
		this.c = c
	}
	Child.prototype = Object.create(Parent.ptototype);
	Chile.prototype.constructor = Child;
	~~~
3. 指定对象原型为父类
4. 指定构造函数

> 函数覆盖

直接使用函数名 = 函数表达式即可实现函数复写

~~~
Child.walk = function(){do somthing...}
~~~

> 新方法的加入

- 直接在构造函数中赋值函数表达式
- 使用Chiid.prototype.函数名 = 函数表达式

## 获取实例对象的对象原型

1. 使用 obj.__ptroto__  [chorm可用]
2. 使用Object.getPrototypeOf(obj)返回prototype原型

## 获取对象本身是否具备某个属性

pbj.hasOwnProperty('attr'),返回true表示具备，返回FALSE表示不具备

## 调用父类被覆盖的方法

Parent.prototype.方法名.apply(this,arguments);

