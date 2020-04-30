# 类

	class Greeter {
	    greeting: string;
	    constructor(message: string) {
	        this.greeting = message;
	    }
	    greet() {
	        return "Hello, " + this.greeting;
	    }
	}
	
	let greeter = new Greeter("world");

## 继承

	class Animal {
	    name: string;
	    constructor(theName: string) { this.name = theName; }
	    move(distanceInMeters: number = 0) {
	        console.log(`${this.name} moved ${distanceInMeters}m.`);
	    }
	}
	
	class Snake extends Animal {
	    constructor(name: string) { super(name); }
	    move(distanceInMeters = 5) {
	        console.log("Slithering...");
	        super.move(distanceInMeters);
	    }
	}
	
	class Horse extends Animal {
	    constructor(name: string) { super(name); }
	    move(distanceInMeters = 45) {
	        console.log("Galloping...");
	        super.move(distanceInMeters);
	    }
	}
	
	let sam = new Snake("Sammy the Python");
	let tom: Animal = new Horse("Tommy the Palomino");
	
	sam.move();
	tom.move(34);

如同C++的类型继承，

## 属性修饰符

 在TypeScript里，成员都默认为public

> 类型兼容

TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

**注意：类型兼容检查时，会检查类型名，类型，和声明处是否一致，均一致时才通过**

## readonly修饰符

你可以使用readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

	class Octopus {
	    readonly name: string;
	    readonly numberOfLegs: number = 8;
	    constructor (theName: string) {
	        this.name = theName;
	    }
	}
	let dad = new Octopus("Man with the 8 strong legs");
	dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.

## 参数属性
	
	class Animal {
	    constructor(private name: string) { }
	    move(distanceInMeters: number) {
	        console.log(`${this.name} moved ${distanceInMeters}m.`);
	    }
	}

**仅在构造函数里使用private name: string参数来创建和初始化name成员。 我们把声明和赋值合并至一处**

## 存取器[getter setter]

	let passcode = "secret passcode";
	
	class Employee {
	    private _fullName: string;
	
	    get fullName(): string {
	        return this._fullName;
	    }
	
	    set fullName(newName: string) {
	        if (passcode && passcode == "secret passcode") {
	            this._fullName = newName;
	        }
	        else {
	            console.log("Error: Unauthorized update of employee!");
	        }
	    }
	}
	
	let employee = new Employee();
	employee.fullName = "Bob Smith";
	if (employee.fullName) {
	    alert(employee.fullName);
	}

注意：

1. 存取器要求你将编译器设置为输出ECMAScript 5或更高
2. 只带有get不带有set的存取器自动被推断为readonly

## 静态属性

	class Grid {
	    static origin = {x: 0, y: 0};
	    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
	        let xDist = (point.x - Grid.origin.x);
	        let yDist = (point.y - Grid.origin.y);
	        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
	    }
	    constructor (public scale: number) { }
	}
	
	let grid1 = new Grid(1.0);  // 1x scale
	let grid2 = new Grid(5.0);  // 5x scale
	
	console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
	console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

## 抽象类

类声明为抽象类，定义抽象方法

abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}


抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含abstract关键字并且可以包含访问修饰符

	abstract class Department {
	
	    constructor(public name: string) {
	    }
	
	    printName(): void {
	        console.log('Department name: ' + this.name);
	    }
	
	    abstract printMeeting(): void; // 必须在派生类中实现
	}
	
	class AccountingDepartment extends Department {
	
	    constructor() {
	        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
	    }
	
	    printMeeting(): void {
	        console.log('The Accounting Department meets each Monday at 10am.');
	    }
	
	    generateReports(): void {
	        console.log('Generating accounting reports...');
	    }
	}
	
	let department: Department; // 允许创建一个对抽象类型的引用
	department = new Department(); // 错误: 不能创建一个抽象类的实例
	department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
	department.printName();
	department.printMeeting();
	department.generateReports(); // 错误: 方法在声明的抽象类中不存在

**注意：上栗存在与C++多态表现一致的行为，即子类实例赋值给基类引用，将作为父类实例使用，也就是对象上转，对象下转一般不被允许，不知道类型断言可不可以**

## 高级技巧

> 把类当做接口使用

如上一节里所讲的，类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类

	class Point {
	    x: number;
	    y: number;
	}
	
	interface Point3d extends Point {
	    z: number;
	}
	
	let point3d: Point3d = {x: 1, y: 2, z: 3};

















