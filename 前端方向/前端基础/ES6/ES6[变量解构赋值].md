<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [解构赋值](#%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC)
  - [数组解构赋值](#%E6%95%B0%E7%BB%84%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC)
  - [默认值](#%E9%BB%98%E8%AE%A4%E5%80%BC)
  - [对象解构赋值](#%E5%AF%B9%E8%B1%A1%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC)
  - [用途](#%E7%94%A8%E9%80%94)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 解构赋值

## 数组解构赋值

	let [a, b, c] = [1, 2, 3];
	let [foo, [[bar], baz]] = [1, [[2], 3]];

	let [head, ...tail] = [1, 2, 3, 4];
	let [x, y, ...z] = ['a'];

**Tips:事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值**

## 默认值

	let [foo = true] = [];
	foo // true
	
	let [x, y = 'b'] = ['a']; // x='a', y='b'
	let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

**Tips：只有当一个数组成员严格等于undefined，默认值才会生效**

**Tisp：如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值，也就是说：如果默认值判定条件不成立，则表达式不会执行并求值**

**Tips：默认值可以引用解构赋值的其他变量，但该变量必须已经声明。**

	let [x = 1, y = x] = [];     // x=1; y=1
	let [x = 1, y = x] = [2];    // x=2; y=2
	let [x = 1, y = x] = [1, 2]; // x=1; y=2
	let [x = y, y = 1] = [];     // ReferenceError: y is not defined

## 对象解构赋值

	let { foo, bar } = { foo: "aaa", bar: "bbb" };
	foo // "aaa"
	bar // "bbb"


## 用途

- 交换 

		let x = 1;
		let y = 2;
		[x, y] = [y, x];

- 从函数返回多个值

		// 返回一个数组
		
		function example() {
		  return [1, 2, 3];
		}
		let [a, b, c] = example();
		
		// 返回一个对象
		
		function example() {
		  return {
		    foo: 1,
		    bar: 2
		  };
		}
		let { foo, bar } = example();

- 遍历map结构

	如果只想获取键名，或者只想获取键值，可以写成下面这样。

		// 获取键名
		for (let [key] of map) {
		  // ...
		}
		
		// 获取键值
		for (let [,value] of map) {
		  // ...
		}

- 输入模块的指定方法

	加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰

		const { SourceMapConsumer, SourceNode } = require("source-map");