# 高级类型

## 交叉类型

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性

	Person & Serializable & Loggable同时是Person和Serializable和Loggable

交叉类型包含了所有类型额特性

## 联合类型

	string | number

联合类型，表达为匹配任意一种类型即可通过编译，**如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员**



## 类型保护与区分类型

在使用联合类型时，如果需要区分类型，需要使用类型断言
	
	let pet = getSmallPet();
	
	if ((<Fish>pet).swim) {
	    (<Fish>pet).swim();
	}
	else {
	    (<Bird>pet).fly();
	}

## typeof类型保护

TypeScript可以将它识别为一个类型保护。 也就是说我们可以直接在代码里检查类型了

	function padLeft(value: string, padding: string | number) {
	    if (typeof padding === "number") {
	        return Array(padding + 1).join(" ") + value;
	    }
	    if (typeof padding === "string") {
	        return padding + value;
	    }
	    throw new Error(`Expected string or number, got '${padding}'.`);
	}


这些typeof类型保护只有两种形式能被识别：typeof v === "typename"和typeof v !== "typename"，"typename"必须是"number"，"string"，"boolean"或"symbol"。 但是TypeScript并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护


## instanceof类型保护

instanceof类型保护是通过构造函数来细化类型的一种方式

	function getRandomPadder() {
	    return Math.random() < 0.5 ?
	        new SpaceRepeatingPadder(4) :
	        new StringPadder("  ");
	}
	
	// 类型为SpaceRepeatingPadder | StringPadder
	let padder: Padder = getRandomPadder();
	
	if (padder instanceof SpaceRepeatingPadder) {
	    padder; // 类型细化为'SpaceRepeatingPadder'
	}
	if (padder instanceof StringPadder) {
	    padder; // 类型细化为'StringPadder'
	}

instanceof的右侧要求是一个构造函数，TypeScript将细化为：

此构造函数的prototype属性的类型，如果它的类型不为any的话

构造签名所返回的类型的联合


> null 与 undefined

一般数据类型不允许直接赋予null 与 undefined 值，在TypeScript中 如果需要为变量赋予这两个值，必须为变量指定相应的联合类型，也就是 typename | null | undefined


> 可选参数和可选属性

**使用了--strictNullChecks，可选参数会被自动地加上| undefined**

	function f(x: number, y?: number) {
	    return x + (y || 0);
	}
	f(1, 2);
	f(1);
	f(1, undefined);
	f(1, null); // error, 'null' is not assignable to 'number | undefined'

可选属性也会有同样的处理:

	class C {
	    a: number;
	    b?: number;
	}
	let c = new C();
	c.a = 12;
	c.a = undefined; // error, 'undefined' is not assignable to 'number'
	c.b = 13;
	c.b = undefined; // ok
	c.b = null; // error, 'null' is not assignable to 'number | undefined'

## 类型别名

为类型取别名

	type Name = string;
	type NameResolver = () => string;
	type NameOrResolver = Name | NameResolver;
	function getName(n: NameOrResolver): Name {
	    if (typeof n === 'string') {
	        return n;
	    }
	    else {
	        return n();
	    }
	}


## 字符串字面量类型

可以实现类似枚举类型的字符串

	type Easing = "ease-in" | "ease-out" | "ease-in-out";
	class UIElement {
	    animate(dx: number, dy: number, easing: Easing) {
	        if (easing === "ease-in") {
	            // ...
	        }
	        else if (easing === "ease-out") {
	        }
	        else if (easing === "ease-in-out") {
	        }
	        else {
	            // error! should not pass null or undefined.
	        }
	    }
	}
	
	let button = new UIElement();
	button.animate(0, 0, "ease-in");
	button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here

你只能从三种允许的字符中选择其一来做为参数传递，传入其它值则会产生错误。

## 数字字面量类型

	function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
	    // ...
	}
















