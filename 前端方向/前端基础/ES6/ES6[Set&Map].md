<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Set & Map结构](#set--map%E7%BB%93%E6%9E%84)
  - [Set 结构](#set-%E7%BB%93%E6%9E%84)
      - [keys()，values()，entries()](#keysvaluesentries)
      - [forEach()](#foreach)
      - [注意](#%E6%B3%A8%E6%84%8F)
  - [WeakSet](#weakset)
  - [Map 结构](#map-%E7%BB%93%E6%9E%84)
      - [含义与基本用法](#%E5%90%AB%E4%B9%89%E4%B8%8E%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
      - [实例的属性和操作方法](#%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%B1%9E%E6%80%A7%E5%92%8C%E6%93%8D%E4%BD%9C%E6%96%B9%E6%B3%95)
      - [遍历方法](#%E9%81%8D%E5%8E%86%E6%96%B9%E6%B3%95)
      - [与其他数据结构的互相转换](#%E4%B8%8E%E5%85%B6%E4%BB%96%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%9A%84%E4%BA%92%E7%9B%B8%E8%BD%AC%E6%8D%A2)
      - [WeakMap](#weakmap)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Set & Map结构

## Set 结构

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

> 数组去重

	let arr = [...(new Set([1,1,2]))]

> 方法

- Set.prototype.size：返回Set实例的成员总数。
- add(value)：添加某个值，返回 Set 结构本身。
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。

Set.prototype.size：返回Set实例的成员总数。

Array.from方法可以将 Set 结构转为数组,去除数组重复成员的另一种方法。

	function dedupe(array) {
	  return Array.from(new Set(array));
	}
	
	dedupe([1, 1, 2, 3]) // [1, 2, 3]

> 遍历操作

#### keys()，values()，entries()

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

		let set = new Set(['red', 'green', 'blue']);
		
		for (let item of set.keys()) {
		  console.log(item);
		}
		// red
		// green
		// blue
		
		for (let item of set.values()) {
		  console.log(item);
		}
		// red
		// green
		// blue
		
		for (let item of set.entries()) {
		  console.log(item);
		}
		// ["red", "red"]
		// ["green", "green"]
		// ["blue", "blue"]

**需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用**

Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。

	Set.prototype[Symbol.iterator] === Set.prototype.values
	// true

这意味着，可以省略values方法，直接用for...of循环遍历 Set

	let set = new Set(['red', 'green', 'blue']);
	
	for (let x of set) {
	  console.log(x);
	}
	// red
	// green
	// blue

Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值

#### forEach()

Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值

	set = new Set([1, 4, 9]);
	set.forEach((value, key) => console.log(key + ' : ' + value))
	// 1 : 1
	// 4 : 4
	// 9 : 9

**Tips:forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。**

#### 注意

在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。

	// 方法一
	let set = new Set([1, 2, 3]);
	set = new Set([...set].map(val => val * 2));
	// set的值是2, 4, 6
	
	// 方法二
	let set = new Set([1, 2, 3]);
	set = new Set(Array.from(set, val => val * 2));
	// set的值是2, 4, 6

Array.from 第二参用于对每个表项进行处理，第三个参数用于指定this上下文

## WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象，而不能是其他类型的值。其次，WeakSet 中的对象都是弱引用，对象引用计数，不记载WeakSet中的引用

WeakSet没有size属性，无法遍历，没有foreach属性


## Map 结构

#### 含义与基本用法

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构） Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

	const m = new Map();
	const o = {p: 'Hello World'};
	
	m.set(o, 'content')
	m.get(o) // "content"
	
	m.has(o) // true
	m.delete(o) // true
	m.has(o) // false

Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

	const map = new Map([
	  ['name', '张三'],
	  ['title', 'Author']
	]);
	
	map.size // 2
	map.has('name') // true
	map.get('name') // "张三"
	map.has('title') // true
	map.get('title') // "Author"

Map构造函数接受数组作为参数，实际上执行的是下面的算法。

	const items = [
	  ['name', '张三'],
	  ['title', 'Author']
	];
	
	const map = new Map();
	
	items.forEach(
	  ([key, value]) => map.set(key, value)
	);

事实上，不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。

**注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。如下：**

	const map = new Map();
	
	map.set(['a'], 555);
	map.get(['a']) // undefined

同理，同样的值的两个实例，在 Map 结构中被视为两个键

	const map = new Map();
	
	const k1 = ['a'];
	const k2 = ['a'];
	
	map
	.set(k1, 111)
	.set(k2, 222);
	
	map.get(k1) // 111
	map.get(k2) // 222

#### 实例的属性和操作方法

- size属性
- set get delete clear方法 

所有属性同Java的数据结构HashMap一致，不做赘述

#### 遍历方法

Map 结构原生提供三个遍历器生成函数和一个遍历方法

- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach()：遍历 Map 的所有成员。

**需要特别注意的是，Map 的遍历顺序就是插入顺序。**

	const map = new Map([
	  ['F', 'no'],
	  ['T',  'yes'],
	]);
	
	for (let key of map.keys()) {
	  console.log(key);
	}
	// "F"
	// "T"
	
	for (let value of map.values()) {
	  console.log(value);
	}
	// "no"
	// "yes"
	
	for (let item of map.entries()) {
	  console.log(item[0], item[1]);
	}
	// "F" "no"
	// "T" "yes"
	
	// 或者
	for (let [key, value] of map.entries()) {
	  console.log(key, value);
	}
	// "F" "no"
	// "T" "yes"
	
	// 等同于使用map.entries()
	for (let [key, value] of map) {
	  console.log(key, value);
	}
	// "F" "no"
	// "T" "yes"

> Map 转 数组

Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。

	const map = new Map([
	  [1, 'one'],
	  [2, 'two'],
	  [3, 'three'],
	]);
	
	[...map.keys()]
	// [1, 2, 3]
	
	[...map.values()]
	// ['one', 'two', 'three']
	
	[...map.entries()]
	// [[1,'one'], [2, 'two'], [3, 'three']]
	
	[...map]
	// [[1,'one'], [2, 'two'], [3, 'three']]

> Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历

	map.forEach(function(value, key, map) {
	  console.log("Key: %s, Value: %s", key, value);
	});

forEach方法还可以接受第二个参数，用来绑定this。

	const reporter = {
	  report: function(key, value) {
	    console.log("Key: %s, Value: %s", key, value);
	  }
	};
	
	map.forEach(function(value, key, map) {
	  this.report(key, value);
	}, reporter);

#### 与其他数据结构的互相转换

> 转数组

	const myMap = new Map()
	  .set(true, 7)
	  .set({foo: 3}, ['abc']);
	[...myMap]
	// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

> 数组转Map

	new Map([
	  [true, 7],
	  [{foo: 3}, ['abc']]
	])
	// Map {
	//   true => 7,
	//   Object {foo: 3} => ['abc']
	// }

> Map 转对象

	function strMapToObj(strMap) {
	  let obj = Object.create(null);
	  for (let [k,v] of strMap) {
	    obj[k] = v;
	  }
	  return obj;
	}
	
	const myMap = new Map()
	  .set('yes', true)
	  .set('no', false);
	strMapToObj(myMap)
	// { yes: true, no: false }

> 对象 转Map

	function objToStrMap(obj) {
	  let strMap = new Map();
	  for (let k of Object.keys(obj)) {
	    strMap.set(k, obj[k]);
	  }
	  return strMap;
	}
	
	objToStrMap({yes: true, no: false})
	// Map {"yes" => true, "no" => false}

	// 键名非字符串

	function mapToArrayJson(map) {
	  return JSON.stringify([...map]);
	}
	
	let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
	mapToArrayJson(myMap)
	// '[[true,7],[{"foo":3},["abc"]]]'


#### WeakMap

基本同WeakSet一致，不做阐述