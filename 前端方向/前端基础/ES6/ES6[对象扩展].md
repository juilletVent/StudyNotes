<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [对象扩展](#%E5%AF%B9%E8%B1%A1%E6%89%A9%E5%B1%95)
  - [Object.assign()](#objectassign)
  - [属性的可枚举性和遍历](#%E5%B1%9E%E6%80%A7%E7%9A%84%E5%8F%AF%E6%9E%9A%E4%B8%BE%E6%80%A7%E5%92%8C%E9%81%8D%E5%8E%86)
  - [对象原型](#%E5%AF%B9%E8%B1%A1%E5%8E%9F%E5%9E%8B)
  - [super](#super)
  - [Object.keys()，Object.values()，Object.entries()](#objectkeysobjectvaluesobjectentries)
  - [扩展运算符](#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 对象扩展

## Object.assign()

Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

	const target = { a: 1 };
	
	const source1 = { b: 2 };
	const source2 = { c: 3 };
	
	Object.assign(target, source1, source2);
	target // {a:1, b:2, c:3}

Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。

注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

**Tips：浅拷贝，同名属性覆盖，数组按下标进行覆盖**

> 应用场景

1. 为对象添加属性

		class Point {
		  constructor(x, y) {
		    Object.assign(this, {x, y});
		  }
		}	

2. 为对象添加方法

		Object.assign(SomeClass.prototype, {
		  someMethod(arg1, arg2) {
		    ···
		  },
		  anotherMethod() {
		    ···
		  }
		});
		
		// 等同于下面的写法
		SomeClass.prototype.someMethod = function (arg1, arg2) {
		  ···
		};
		SomeClass.prototype.anotherMethod = function () {
		  ···
		};

## 属性的可枚举性和遍历

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。

	let obj = { foo: 123 };
	Object.getOwnPropertyDescriptor(obj, 'foo')
	//  {
	//    value: 123,
	//    writable: true,
	//    enumerable: true,
	//    configurable: true
	//  }

目前，有四个操作会忽略enumerable为false的属性

- for...in循环：只遍历对象自身的和继承的可枚举的属性。
- Object.keys()：返回对象自身的所有可枚举的属性的键名。
- JSON.stringify()：只串行化对象自身的可枚举的属性。
- Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

**Tips:for...in会返回继承的属性**

> 属性遍历

ES6 一共有 5 种方法可以遍历对象的属性。

（1）for...in

for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

（2）Object.keys(obj)

Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

（3）Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

（4）Object.getOwnPropertySymbols(obj)

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

（5）Reflect.ownKeys(obj)

Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

1. 首先遍历所有数值键，按照数值升序排列。
2. 其次遍历所有字符串键，按照加入时间升序排列。
3. 最后遍历所有 Symbol 键，按照加入时间升序排列。

## 对象原型

使用如下方法进行读取与配置对象原型，而不是使用__proto__

- Object.setPrototypeOf 
- Object.setPrototypeOf

## super

ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。 **只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法**。也就是说，super只能用于对象中简写定义的方法内，其他地方均不能使用。

JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。

## Object.keys()，Object.values()，Object.entries()

ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

ES2017 引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。

	let {keys, values, entries} = Object;
	let obj = { a: 1, b: 2, c: 3 };
	
	for (let key of keys(obj)) {
	  console.log(key); // 'a', 'b', 'c'
	}
	
	for (let value of values(obj)) {
	  console.log(value); // 1, 2, 3
	}
	
	for (let [key, value] of entries(obj)) {
	  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
	}

Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

	const obj = { foo: 'bar', baz: 42 };
	Object.entries(obj)
	// [ ["foo", "bar"], ["baz", 42] ]

## 扩展运算符

对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

	let z = { a: 3, b: 4 };
	let n = { ...z };
	n // { a: 3, b: 4 }

拷贝对象实例

	// 写法一
	const clone1 = {
	  __proto__: Object.getPrototypeOf(obj),
	  ...obj
	};
	
	// 写法二
	const clone2 = Object.assign(
	  Object.create(Object.getPrototypeOf(obj)),
	  obj
	);
	
	// 写法三
	const clone3 = Object.create(
	  Object.getPrototypeOf(obj),
	  Object.getOwnPropertyDescriptors(obj)
	)

Tips:推荐使用二三写法，写法一存在兼容性问题

> 合并对象

	let ab = { ...a, ...b };
	// 等同于
	let ab = Object.assign({}, a, b);

> 注意

**扩展运算符（...）内部使用for...of循环**