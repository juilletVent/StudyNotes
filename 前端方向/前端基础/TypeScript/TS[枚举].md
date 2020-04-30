# 枚举

简单定义

	enum Direction {
	    Up = 1,
	    Down,
	    Left,
	    Right
	}

值与C++枚举表现一致 默认首位为0，其余递增，出现中间值单独定义时，其后的值按照递加规则求值

**若常数枚举表达式求值后为NaN或Infinity，则会在编译阶段报错**

TypeScript中枚举类型有一点不同于C++，在TS中枚举类型可以进行键到值，值到键名的双向映射


## 常数枚举

当访问枚举值时，为了避免生成多余的代码和间接引用，可以使用常数枚举。 常数枚举是在enum关键字前使用const修饰符。

	const enum Enum {
	    A = 1,
	    B = A * 2
	}

**常数枚举只能使用常数枚举表达式并且不同于常规的枚举的是它们在编译阶段会被删除。 常数枚举成员在使用的地方被内联进来。 这是因为常数枚举不可能有计算成员**



> 栗子

	const enum Directions {
	    Up,
	    Down,
	    Left,
	    Right
	}
	
	let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

编译结果:

	var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];


## 外部枚举

外部枚举用来描述已经存在的枚举类型的形状。

	declare enum Enum {
	    A = 1,
	    B,
	    C = 2
	}

外部枚举和非外部枚举之间有一个重要的区别，在正常的枚举里，没有初始化方法的成员被当成常数成员。 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。

> 解释

大概意思就是枚举中包含的对象如果没有赋值构造，则认为他是一个已经存在的变量或对象，需要求值并赋值给枚举成员












