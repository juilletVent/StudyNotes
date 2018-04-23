# 泛型

> 最简单的栗子

	function identity<T>(arg: T): T {
	    return arg;
	}

	//显示声明类型
	let output = identity<string>("myString");

	// type of output will be 'string' 类型推断
	let output = identity("myString");  
	

可以看到TS中的泛型与C++模板泛型非常类似，使用T进行泛型声明，实际使用时也可以使用尖括号语法进行明确的类型声明

	function loggingIdentity<T>(arg: T[]): T[] {
	    console.log(arg.length);  // Array has a .length, so no more error
	    return arg;
	}

## 泛型类型

	function identity<T>(arg: T): T {
	    return arg;
	}
	
	let myIdentity: <T>(arg: T) => T = identity;

我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。也就是说T可以改为其他的字母

	function identity<T>(arg: T): T {
	    return arg;
	}
	
	let myIdentity: {<T>(arg: T): T} = identity;

## 泛型接口

为接口中的类型指定泛型

	interface GenericIdentityFn {
	    <T>(arg: T): T;
	}
	
	function identity<T>(arg: T): T {
	    return arg;
	}
	
	let myIdentity: GenericIdentityFn = identity;

为整个接口指定泛型类型

	interface GenericIdentityFn<T> {
	    (arg: T): T;
	}
	
	function identity<T>(arg: T): T {
	    return arg;
	}
	
	let myIdentity: GenericIdentityFn<number> = identity;


## 泛型类

泛型类仍然与C++语法基本一致
	
	class GenericNumber<T> {
	    zeroValue: T;
	    add: (x: T, y: T) => T;
	}
	
	let myGenericNumber = new GenericNumber<number>();
	myGenericNumber.zeroValue = 0;
	myGenericNumber.add = function(x, y) { return x + y; };

**注意：类有两部分，静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型**

## 泛型约束

相比于操作any所有类型，我们想要限制函数去处理任意带有.length属性的所有类型。 只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。 为此，我们需要列出对于T的约束要求。

为此，我们定义一个接口来描述约束条件。 创建一个包含.length属性的接口，使用这个接口和extends关键字还实现约束：

	interface Lengthwise {
	    length: number;
	}
	
	function loggingIdentity<T extends Lengthwise>(arg: T): T {
	    console.log(arg.length);  // Now we know it has a .length property, so no more error
	    return arg;
	}

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

	loggingIdentity(3);  // Error, number doesn't have a .length property

	loggingIdentity({length: 10, value: 3}); // 正确调用

> 在泛型约束中使用类型参数





