<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [函数](#%E5%87%BD%E6%95%B0)
  - [书写完整函数类型](#%E4%B9%A6%E5%86%99%E5%AE%8C%E6%95%B4%E5%87%BD%E6%95%B0%E7%B1%BB%E5%9E%8B)
  - [可选参数](#%E5%8F%AF%E9%80%89%E5%8F%82%E6%95%B0)
  - [可变参数(剩余参数)](#%E5%8F%AF%E5%8F%98%E5%8F%82%E6%95%B0%E5%89%A9%E4%BD%99%E5%8F%82%E6%95%B0)
  - [this 与 Lambda表达式](#this-%E4%B8%8E-lambda%E8%A1%A8%E8%BE%BE%E5%BC%8F)
  - [overload](#overload)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 函数

## 书写完整函数类型

	let myAdd: (x:number, y:number) => number =
    function(x: number, y: number): number { return x + y; };

返回值类型是函数类型的必要部分，如果函数没有返回任何值，你也必须指定返回值类型为void而不能留空

> 推断类型

如果函数类型变量声明+赋值写在同一句，则可以省略左或右任意一侧的类型声明，编译器可以自动进行类型推断

## 可选参数

TypeScript里我们可以在参数名旁使用?实现可选参数的功能

	function buildName(firstName: string, lastName?: string) {
	    if (lastName)
	        return firstName + " " + lastName;
	    else
	        return firstName;
	}

> 默认值

	function buildName(firstName: string, lastName = "Smith") {
	    return firstName + " " + lastName;
	}

在所有必须参数后面的带默认初始化的参数都是可选的，与可选参数一样，在调用函数的时候可以省略。 也就是说可选参数与末尾的默认参数共享参数类型

**注：遵循堆栈原则，可选参数只能出现在参数列表尾部，在TS中如果要在参数列表中部使用可选参数，则可选参数必须带有默认值，且在调用时需明确传入undefined**

	function buildName(firstName = "Will", lastName: string) {
	    return firstName + " " + lastName;
	}
	
	let result1 = buildName("Bob");                  // error, too few parameters
	let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
	let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
	let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"

## 可变参数(剩余参数)

	function buildName(firstName: string, ...restOfName: string[]) {
	  return firstName + " " + restOfName.join(" ");
	}
	
	let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 编译器创建参数数组，名字是你在省略号（...）后面给定的名字，你可以在函数体内使用这个数组

这个省略号也会在带有剩余参数的函数类型定义上使用到
	
	function buildName(firstName: string, ...restOfName: string[]) {
	  return firstName + " " + restOfName.join(" ");
	}
	
	let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;

## this 与 Lambda表达式

箭头函数能保存函数创建时的this值，而不是调用时的值

**注：对象字面量中的this属于Any类型**


## overload

	function pickCard(x: {suit: string; card: number; }[]): number;
	function pickCard(x: number): {suit: string; card: number; };
	function pickCard(x): any {
	    // Check to see if we're working with an object/array
	    // if so, they gave us the deck and we'll pick the card
	    if (typeof x == "object") {
	        let pickedCard = Math.floor(Math.random() * x.length);
	        return pickedCard;
	    }
	    // Otherwise just let them pick the card
	    else if (typeof x == "number") {
	        let pickedSuit = Math.floor(x / 13);
	        return { suit: suits[pickedSuit], card: x % 13 };
	    }
	}

由于上面的函数定义兼容多种调用形式，因此使用准确的声明 可以在具体调用的时候依据类型进行相关判断，返回正确的类型







