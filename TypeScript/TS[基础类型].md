##基础类型

> 基础类型

	let name: string = `Gene`;
	let age: number = 37;
	let sentence: string = `Hello, my name `

> 数组类型

	let list: number[] = [1, 2, 3];
	let list: Array<number> = [1, 2, 3];

> 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。	

	// Declare a tuple type
	let x: [string, number];
	// Initialize it
	x = ['hello', 10]; // OK
	// Initialize it incorrectly
	x = [10, 'hello']; // Error

当访问一个已知索引的元素，会得到正确的类型：

	console.log(x[0].substr(1)); // OK
	console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'

当访问一个越界的元素，会使用联合类型替代：

	x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
	console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
	x[6] = true; // Error, 布尔不是(string | number)类型

> 枚举

	enum Color {Red, Green, Blue}
	let c: Color = Color.Green;

默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：

	enum Color {Red = 1, Green, Blue}
	let c: Color = Color.Green;

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

	enum Color {Red = 1, Green, Blue}
	let colorName: string = Color[2];
	
	alert(colorName);  // 显示'Green'因为上面代码里它的值是2

> Never

never类型表示的是那些永不存在的值的类型

	// 返回never的函数必须存在无法达到的终点
	function error(message: string): never {
	    throw new Error(message);
	}
	
	// 推断的返回值类型为never
	function fail() {
	    return error("Something failed");
	}
	
	// 返回never的函数必须存在无法达到的终点
	function infiniteLoop(): never {
	    while (true) {
	    }
	}

> 类型断言 
	
	let someValue: any = "this is a string";
	let strLength: number = (<string>someValue).length;
	let strLength: number = (someValue as string).length;