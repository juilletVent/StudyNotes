<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [接口](#%E6%8E%A5%E5%8F%A3)
  - [可选属性](#%E5%8F%AF%E9%80%89%E5%B1%9E%E6%80%A7)
  - [只读属性](#%E5%8F%AA%E8%AF%BB%E5%B1%9E%E6%80%A7)
  - [额外的属性检查](#%E9%A2%9D%E5%A4%96%E7%9A%84%E5%B1%9E%E6%80%A7%E6%A3%80%E6%9F%A5)
  - [函数类型](#%E5%87%BD%E6%95%B0%E7%B1%BB%E5%9E%8B)
  - [接口](#%E6%8E%A5%E5%8F%A3-1)
  - [接口继承](#%E6%8E%A5%E5%8F%A3%E7%BB%A7%E6%89%BF)
  - [混合类型](#%E6%B7%B7%E5%90%88%E7%B1%BB%E5%9E%8B)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 接口

	interface LabelledValue {
	  label: string;
	}
	
	function printLabel(labelledObj: LabelledValue) {
	  console.log(labelledObj.label);
	}
	
	let myObj = {size: 10, label: "Size 10 Object"};
	printLabel(myObj);

LabelledValue接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个label属性且类型为string的对象。 需要注意的是，我们在这里并不能像在其它语言里一样，说传给printLabel的对象实现了这个接口。我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的

还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以

## 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。

	interface SquareConfig {
	  color?: string;
	  width?: number;
	}
	
	function createSquare(config: SquareConfig): {color: string; area: number} {
	  let newSquare = {color: "white", area: 100};
	  if (config.color) {
	    newSquare.color = config.color;
	  }
	  if (config.width) {
	    newSquare.area = config.width * config.width;
	  }
	  return newSquare;
	}
	
	let mySquare = createSquare({color: "black"});

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。 比如，我们故意将createSquare里的color属性名拼错，就会得到一个错误提示

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用readonly来指定只读属性

	interface Point {
	    readonly x: number;
	    readonly y: number;
	}

你可以通过赋值一个对象字面量来构造一个Point。 赋值后，x和y再也不能被改变了

	let p1: Point = { x: 10, y: 20 };
	p1.x = 5; // error!

TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改

	let a: number[] = [1, 2, 3, 4];
	let ro: ReadonlyArray<number> = a;
	ro[0] = 12; // error!
	ro.push(5); // error!
	ro.length = 100; // error!
	a = ro; // error!

上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写

	a = ro as number[];


> readonly 与 const

最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用const，若做为属性则使用readonly

## 额外的属性检查

对象字面量会被特殊对待而且会经过额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。
	
	// error: 'colour' not expected in type 'SquareConfig'
	let mySquare = createSquare({ colour: "red", width: 100 });

绕开这些检查非常简单。 最简便的方法是使用类型断言：

	let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

然而，最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。 如果SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它

	interface SquareConfig {
	    color?: string;
	    width?: number;
	    [propName: string]: any;
	}

在这我们要表示的是SquareConfig可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓它们的类型是什么

还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为squareOptions不会经过额外属性检查，所以编译器不会报错

	let squareOptions = { colour: "red", width: 100 };
	let mySquare = createSquare(squareOptions);

*要留意，在像上面一样的简单代码里，你可能不应该去绕开这些检查。 对于包含方法和内部状态的复杂对象字面量来讲，你可能需要使用这些技巧，但是大部额外属性检查错误是真正的bug。 就是说你遇到了额外类型检查出的错误，比如“option bags”，你应该去审查一下你的类型声明。 在这里，如果支持传入color或colour属性到createSquare，你应该修改SquareConfig定义来体现出这一点。*

## 函数类型

为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型

	interface SearchFunc {
	  (source: string, subString: string): boolean;
	}

	let mySearch: SearchFunc;
	mySearch = function(source: string, subString: string) {
	  let result = source.search(subString);
	  return result > -1;
	}

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 比如，我们使用下面的代码重写上面的例子：

	let mySearch: SearchFunc;
	mySearch = function(src: string, sub: string): boolean {
	  let result = src.search(sub);
	  return result > -1;
	}

函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。 如果你不想指定类型，TypeScript的类型系统会推断出参数类型

因为函数直接赋值给了SearchFunc类型变量。 函数的返回值类型是通过其返回值推断出来的（此例是false和true）。 如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与SearchFunc接口中的定义不匹配

	let mySearch: SearchFunc;
	mySearch = function(src, sub) {
	    let result = src.search(sub);
	    return result > -1;
	}


## 接口

与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。

	interface ClockInterface {
	    currentTime: Date;
	    setTime(d: Date);
	}
	
	class Clock implements ClockInterface {
	    currentTime: Date;
	    setTime(d: Date) {
	        this.currentTime = d;
	    }
	    constructor(h: number, m: number) { }
	}

**接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。**

## 接口继承

	interface Shape {
	    color: string;
	}
	
	interface Square extends Shape {
	    sideLength: number;
	}
	
	let square = <Square>{};
	square.color = "blue";
	square.sideLength = 10;

一个接口可以继承多个接口，创建出多个接口的合成接口

	interface Shape {
	    color: string;
	}
	
	interface PenStroke {
	    penWidth: number;
	}
	
	interface Square extends Shape, PenStroke {
	    sideLength: number;
	}
	
	let square = <Square>{};
	square.color = "blue";
	square.sideLength = 10;
	square.penWidth = 5.0;

## 混合类型

先前我们提过，接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。

	interface Counter {
	    (start: number): string;
	    interval: number;
	    reset(): void;
	}
	
	function getCounter(): Counter {
	    let counter = <Counter>function (start: number) { };
	    counter.interval = 123;
	    counter.reset = function () { };
	    return counter;
	}
	
	let c = getCounter();
	c(10);
	c.reset();
	c.interval = 5.0;

