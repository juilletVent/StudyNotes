<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [控制指令 Control Directives](#%E6%8E%A7%E5%88%B6%E6%8C%87%E4%BB%A4-control-directives)
  - [@if](#if)
  - [@for](#for)
  - [@each](#each)
  - [@while](#while)
- [混合指令](#%E6%B7%B7%E5%90%88%E6%8C%87%E4%BB%A4)
  - [参数](#%E5%8F%82%E6%95%B0)
  - [关键词参数](#%E5%85%B3%E9%94%AE%E8%AF%8D%E5%8F%82%E6%95%B0)
  - [可变参数变量](#%E5%8F%AF%E5%8F%98%E5%8F%82%E6%95%B0%E5%8F%98%E9%87%8F)
  - [像混合样式中导入内容](#%E5%83%8F%E6%B7%B7%E5%90%88%E6%A0%B7%E5%BC%8F%E4%B8%AD%E5%AF%BC%E5%85%A5%E5%86%85%E5%AE%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 控制指令 Control Directives

### @if

当 @if 的表达式返回值不是 false 或者 null 时，条件成立，输出 {} 内的代码：

	p {
	  @if 1 + 1 == 2 { border: 1px solid; }
	  @if 5 < 3 { border: 2px dotted; }
	  @if null  { border: 3px double; }
	}

	$type: monster;
	p {
	  @if $type == ocean {
	    color: blue;
	  } @else if $type == matador {
	    color: red;
	  } @else if $type == monster {
	    color: green;
	  } @else {
	    color: black;
	  }
	}

### @for

语法：

	@for $var from <start> through <end>
	
	@for $var from <start> to <end>

**区别在于 through 与 to 的含义：当使用 through 时，条件范围包含 <start> 与 <end> 的值，而使用 to 时条件范围只包含 <start> 的值不包含 <end> 的值.另外，$var 可以是任何变量，比如 $i；<start> 和 <end> 必须是整数值。**

	@for $i from 1 through 3 {
	  .item-#{$i} { width: 2em * $i; }
	}

build

	.item-1 {
	  width: 2em; }
	.item-2 {
	  width: 4em; }
	.item-3 {
	  width: 6em; }

### @each

@each 指令的格式是 $var in <list>, $var 可以是任何变量名，比如 $length 或者 $name，而 <list> 是一连串的值，也就是值列表。

src

	@each $animal in puma, sea-slug, egret, salamander {
	  .#{$animal}-icon {
	    background-image: url('/images/#{$animal}.png');
	  }
	}

build

	.puma-icon {
	  background-image: url('/images/puma.png'); }
	.sea-slug-icon {
	  background-image: url('/images/sea-slug.png'); }
	.egret-icon {
	  background-image: url('/images/egret.png'); }
	.salamander-icon {
	  background-image: url('/images/salamander.png'); }

**多参数调用：**

each支持多组参数同时使用，也就是多维数组一起遍历，语法如下：

	@each $animal, $color, $cursor in (puma, black, default),
	                                  (sea-slug, blue, pointer),
	                                  (egret, white, move) {
	  .#{$animal}-icon {
	    background-image: url('/images/#{$animal}.png');
	    border: 2px solid $color;
	    cursor: $cursor;
	  }
	}

build

	.puma-icon {
	  background-image: url('/images/puma.png');
	  border: 2px solid black;
	  cursor: default; }
	.sea-slug-icon {
	  background-image: url('/images/sea-slug.png');
	  border: 2px solid blue;
	  cursor: pointer; }
	.egret-icon {
	  background-image: url('/images/egret.png');
	  border: 2px solid white;
	  cursor: move; }

src：
	
	//配合字符串插值与each多维遍历进行构建
	@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
	  #{$header} {
	    font-size: $size;
	  }
	}

build

	h1 {
	  font-size: 2em; }
	h2 {
	  font-size: 1.5em; }
	h3 {
	  font-size: 1.2em; }

### @while

@while 指令重复输出格式直到表达式返回结果为 false。这样可以实现比 @for 更复杂的循环，只是很少会用到

	$i: 6;
	@while $i > 0 {
	  .item-#{$i} { width: 2em * $i; }
	  $i: $i - 2;
	}

build

	.item-6 {
	  width: 12em; }
	
	.item-4 {
	  width: 8em; }
	
	.item-2 {
	  width: 4em; }

## 混合指令

定义混合指令就是Less中的混入概念

定义

	@mixin large-text {
	  font: {
	    family: Arial;
	    size: 20px;
	    weight: bold;
	  }
	  color: #ff0000;
	}

引用

	.page-title {
	  @include large-text;
	  padding: 4px;
	  margin-top: 10px;
	}

**也可以在最外层引用混合样式，不会直接定义属性，也不可以使用父选择器。**

### 参数

参数用于给混合指令中的样式设定变量，并且赋值使用。在定义混合指令的时候，按照变量的格式，通过逗号分隔，将参数写进圆括号里。引用指令时，按照参数的顺序，再将所赋的值对应写进括号：

	@mixin sexy-border($color, $width) {
	  border: {
	    color: $color;
	    width: $width;
	    style: dashed;
	  }
	}
	p { @include sexy-border(blue, 1in); }

build

	p {
	  border-color: blue;
	  border-width: 1in;
	  border-style: dashed; }

定义默认参数，只需要参数后面使用冒号，然后跟默认值即可

	@mixin sexy-border($color, $width: 1in) {
	  border: {
	    color: $color;
	    width: $width;
	    style: dashed;
	  }
	}
	p { @include sexy-border(blue); }
	h1 { @include sexy-border(blue, 2in); }

### 关键词参数

混合指令也可以使用关键词参数;意思就是给实参指定形参名，这样的调用形式稍显复杂，不过好处是，不用记住参数表的参数顺序。

	p { @include sexy-border($color: blue); }
	h1 { @include sexy-border($color: blue, $width: 2in); }

### 可变参数变量

与c、JavaScript可变参数意义相同，用法相同

	@mixin box-shadow($shadows...) {
	  -moz-box-shadow: $shadows;
	  -webkit-box-shadow: $shadows;
	  box-shadow: $shadows;
	}
	.shadows {
	  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
	}

引用传入值序列时需要进行展开：

	@mixin colors($text, $background, $border) {
	  color: $text;
	  background-color: $background;
	  border-color: $border;
	}
	$values: #ff0000, #00ff00, #0000ff;
	.primary {
	//展开语法实在后面加上...，这与JavaScript的展开语法相反
	  @include colors($values...);
	}

build

	.primary {
	  color: #ff0000;
	  background-color: #00ff00;
	  border-color: #0000ff;
	}

### 像混合样式中导入内容

大概意思就是，在include的时候，include指令可以额外携带样式，这些额外样式将会应用在@content的位置，选择器也会与@content的上级同级添加

	@mixin apply-to-ie6-only {
	  * html {
	    @content;
	  }
	}
	@include apply-to-ie6-only {
	  #logo {
	    background-image: url(/logo.gif);
	  }
	}

build

	\* html #logo {
	  background-image: url(/logo.gif);
	}

**重点：为便于书写，@mixin 可以用 = 表示，而 @include 可以用 + 表示**

**注意： 当 @content 在指令中出现过多次或者出现在循环中时，额外的代码将被导入到每一个地方。**



