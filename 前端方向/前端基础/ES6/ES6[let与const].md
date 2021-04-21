<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [let 与 const](#let-%E4%B8%8E-const)
  - [let](#let)
  - [const](#const)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# let 与 const

## let

**一、let 用于定义局部变量，for循环中的循环变量具备独立作用域**

	for(let i=1;i<10;i++){
		let i='a';//并不会报错
	}

> JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算[我把它理解为闭包类似的东西]

**二、不存在变量提升 声明的变量一定要在声明后使用，否则报错**

**三、暂时性死区（TDZ - TEMPORAL DEAD ZONE）**

果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错

*即使是typeof这类操作符在TDZ情景下依然会报错*

	let x = x;

使用let声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这个情况，在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。

**四、作用域内禁止重复定义**

**五、具备块级作用域**

**六、局部作用域定义函数的行为**

ES5行为：函数声明会提前至函数作用域

ES6标准行为：遵从LET块级作用域

浏览器实际行为：类似var定义一样，提前声明，但不定义

示例代码：

	(function () {
		if (false) {
			// 重复声明一次函数f
			function f() { console.log('I am inside!'); }
		}
		f();
	}());

ES5表现：

	(function () {
		function f() { console.log('I am inside!'); }
		if (false) {
		}
		f();
	}());

ES6表现：

	(function () {
		var f = undefined;//声明提前，定义不提前，类似var表现一致
		if (false) {
			function f() { console.log('I am inside!'); }
		}
		f();
	}());

> Tips：考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句

> ES6 的块级作用域允许声明函数的规则，只在使用大括号的情况下成立，如果没有使用大括号，就会报错

	// 不报错
	'use strict';
	if (true) {
	  function f() {}
	}
	
	// 报错
	'use strict';
	if (true)
	  function f() {}

*do提案 使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上do，使它变为do表达式，然后就会返回内部最后执行的表达式的值*

	let x = do {
	  let t = f();
	  t * t + 1;
	};

*上面代码中，变量x会得到整个块级作用域的返回值（t * t + 1）尚未被实现，chrom不认识这样的写法，VsCode也不认识，node执行环境也不认识，仅仅处于提案状态*

## const

只读，不可更改、立即赋值、块级作用域、不存在提升、存在TDZ现象、不可重复声明

本质：const保持的是当前变量的值，当变量索引的是复合对象时，符合对象不可控

	const foo = {};
	// 为 foo 添加一个属性，可以成功
	foo.prop = 123;
	foo.prop // 123
	// 将 foo 指向另一个对象，就会报错
	foo = {}; // TypeError: "foo" is read-only

**Tips:let、const、class声明恩全局变量不在顶层对象下，而是独立存在的**

