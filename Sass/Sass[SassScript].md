# SassScript

## 变量

变量定义使用$作为前缀，引用的时候直接做为CSS属性引用即可，局部变量具备块级作用域

	$width: 5em;

如果需要将局部变量转何为全局变量,可以添加 !global 声明，使用如下写法，但是不推荐这么做：

	#main {
	  $width: 5em !global;
	  width: $width;
	}

## 运算符

SassScript 支持数字的加减乘除、取整等运算 (+, -, *, /, %) 如果必要会在不同单位间转换值
	
	p {
	  width: 1in + 8pt;
	}

关系运算 <, >, <=, >= 也可用于数字运算，相等运算 ==, != 可用于所有数据类型。

> 除法运算

- 如果值，或值的一部分，是变量或者函数的返回值
- 如果值被圆括号包裹
- 如果值是算数表达式的一部分
	
		p {
		  font: 10px/8px;             // Plain CSS, no division
		  $width: 1000px;
		  width: $width/2;            // Uses a variable, does division
		  width: round(1.5)/2;        // Un ses a function, does division
		  height: (500px/2);          // Uses parentheses, does division
		  margin-left: 5px + 8px/2px; // Uses +, does division
		}

**如果需要使用变量，同时又要确保 / 不做除法运算而是完整地编译到 CSS 文件中，只需要用 #{} 插值语句将变量包裹。**

### 颜色运算

	p {
	  color: #010203 * 2;
	}

注意：颜色运算不会对alpha通道进行运算，也就是说，包含有alpha通道的色值运算，两个操作值必须具备相同的alpha值，否则无法运算

### 字符串运算

连接无引号字符串

	p {
	  cursor: e + -resize;
	}

**注意，如果有引号字符串（位于 + 左侧）连接无引号字符串，运算结果是有引号的，相反，无引号字符串（位于 + 左侧）连接有引号字符串，运算结果则没有引号。**

example：

	p:before {
	  content: "Foo " + Bar;
	  font-family: sans- + "serif";
	}

build:

	p:before {
	  content: "Foo Bar";
	  font-family: sans-serif; }

在具备引号的字符串内可以进行插值计算

	p:before {
	  content: "I ate #{5 + 10} pies!";
	}


## 函数

**关键词参数：**可以为实际参数值定参数名称而不用记住具体的参数顺序

函数表：[http://sass-lang.com/documentation/Sass/Script/Functions.html](http://sass-lang.com/documentation/Sass/Script/Functions.html "Sass函数表")

### 插值表达式

使用插值表达式，可以在属性、字符串等位置进行变量替换

 	#{}

example
	
	$name: foo;
	$attr: border;
	p.#{$name} {
	  #{$attr}-color: blue;
	}

build

	p.foo {
	  border-color: blue; }

以下写法可以避免使用运算符从而简化写法

	p {
	  $font-size: 12px;
	  $line-height: 30px;
	  font: #{$font-size}/#{$line-height};
	}

	$name:'Jack';
	$str:'i am #{$name}';		

### &选择器

代表父级选择器，如果写在mixin中，需要判断&取值是否为null，如果为null，则说明调用位置不在选择器内部

&选择器在使用类似hover、after等伪类选择器的时候非常有用

### 变量定义的默认值  !default

可以在变量的结尾添加 !default 给一个未通过 !default 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。

example

	$content: "First content";
	$content: "Second content?" !default;
	$new_content: "First time reference" !default;
	
	#main {
	  content: $content;
	  new-content: $new_content;
	}

build

	#main {
	  content: "First content";
	  new-content: "First time reference"; }

**注：如果变量为null值，则视为未被定义与赋值**



