## 基础

### 变量声明、引用

	$highlight-color: #F90;
	$basic-border: 1px solid black;

**Tips：具备会计作用域**

使用的例子

	//全局变量
	$nav-color: #F90;
	nav {
		//局部变量
	  $width: 100px;
	  width: $width;
	  color: $nav-color;
	}
	
	//编译后
	
	nav {
	  width: 100px;
	  color: #F90;
	}

**注：sass中变量命名的中划线下划线是互通的**

具体含义就是：

	@min-width:1100px;
	@min_width:1100px:

实际上是一样的，任意定义上面两种中的任何一种，在引用时，也可以使用上面任意一种，都可以，但是这种特性仅仅在变量上面可行，css不具备这样的特性.

### 嵌套规则

基本和Less一致，&代表父级选择器，似乎具备简单的函数判断功能

> 群组嵌套

	.container {
	  h1, h2, h3 {margin-bottom: .8em}
	}
	
	nav, aside {
	  a {color: blue}
	}

都是ok的

> &gt;、+和~

样例：

	article {
	  ~ article { border-top: 1px dashed #ccc }
	  > section { background: #eee }
	  dl > {
	    dt { color: #333 }
	    dd { color: #555 }
	  }
	  nav + & { margin-top: 0 }
	}

结果：

	article ~ article { border-top: 1px dashed #ccc }
	article > footer { background: #eee }
	article dl > dt { color: #333 }
	article dl > dd { color: #555 }
	nav + article { margin-top: 0 }

> 嵌套属性

嵌套属性的规则是这样的：把属性名从中划线-的地方断开，在根属性后边添加一个冒号:，紧跟一个{ }块，把子属性部分写在这个{ }块中

	nav {
	  border: {
	  style: solid;
	  width: 1px;
	  color: #ccc;
	  }
	}

结果：

	nav {
	  border-style: solid;
	  border-width: 1px;
	  border-color: #ccc;
	}

**根属性也可以有自己的属性**

	.funky {
	  font: 20px/24px {
	    family: fantasy;
	    weight: bold;
	  }
	}

**指明例外规则进行反向排除书写**

具体的含义就是在使用缩写形式的样式时，使用排除的方式指定某些样式

例子：

	nav {
	  border: 1px solid #ccc {
	  left: 0px;
	  right: 0px;
	  }
	}

结果：

	nav {
	  border: 1px solid #ccc;
	  border-left: 0px;
	  border-right: 0px;
	}

### 导入规则

@import "main.scss"

导入规则同css

> 局部sass文件

sass局部文件的文件名以下划线开头。这样，sass就不会在编译时单独编译这个文件输出css，而只把这个文件用作导入。当你@import一个局部文件时，还可以不写文件的全名，即省略文件名开头的下划线

> 默认值

如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值

	$fancybox-width: 400px !default;
		.fancybox {
		width: $fancybox-width;
	}

> 嵌套导入

导入的位置就是渲染的位置，子文件的内容将会直接渲染在导入的位置


> 静默注释

使用双斜线 // 这类注释不会出现在css中 /**/这类的注释会出现在css中


### 混合器

定义混合器

	@mixin rounded-corners {
	  -moz-border-radius: 5px;
	  -webkit-border-radius: 5px;
	  border-radius: 5px;
	}

引用混合器

	notice {
	  background-color: green;
	  border: 2px solid #00aa00;
	  @include rounded-corners;
	}

最终生成

	.notice {
	  background-color: green;
	  border: 2px solid #00aa00;
	  -moz-border-radius: 5px;
	  -webkit-border-radius: 5px;
	  border-radius: 5px;
	}

> 代参混合

使用@mixin定义混合器，指定混合器名称，参数表，引用时，使用@include指令引用，指定混合器名称，实参列表

定义

	@mixin link-colors($normal, $hover, $visited) {
	  color: $normal;
	  &:hover { color: $hover; }
	  &:visited { color: $visited; }
	}

使用

	a {
	  @include link-colors(blue, red, green);
	}
	
	//Sass最终生成的是：
	
	a { color: blue; }
	a:hover { color: red; }
	a:visited { color: green; }

**参数顺序问题，使用实参命名即可，无需对应顺序**

实参命名调用

	a {
	    @include link-colors(
	      $normal: blue,
	      $visited: green,
	      $hover: red
	  );
	}

**默认参数混合**

参数默认值使用$name: default-value的声明形式，默认值可以是任何有效的css属性值，甚至是其他参数的引用

	@mixin link-colors(
	    $normal,
	    $hover: $normal,
	    $visited: $normal
	  )
	{
	  color: $normal;
	  &:hover { color: $hover; }
	  &:visited { color: $visited; }
	}

如果像下边这样调用：@include link-colors(red) $hover和$visited也会被自动赋值为red


### 继承

通过@extend语法实现

	//通过选择器继承继承样式
	.error {
	  border: 1px solid red;
	  background-color: #fdd;
	}
	.seriousError {
	  @extend .error;
	  border-width: 3px;
	}

**需要注意的是，继承的属性不仅仅是继承直接属性，所有与被继承属性有关的组合，均会被继承**

.error a{  //应用到.seriousError a
  color: red;
  font-weight: 100;
}
h1.error { //应用到hl.seriousError
  font-size: 1.2rem;
}

如果seriousError继承error，则会发生想上面所说的情况


