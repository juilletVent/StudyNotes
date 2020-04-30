# 指令 Directives

## import

如果应用的规则是一下几个，则作为普通css导入

- 文件拓展名是 .css；
- 文件名以 http:// 开头；
- 文件名是 url()；
- @import 包含 media queries。

导入方式：

	@import "foo.scss";
	@import "foo"

使用如下方式将会导入css样式而不是sass

	@import "foo.css";
	@import "foo" screen;
	@import "http://foo.com/bar";
	@import url(foo);


允许多文件同时导入：

	@import "rounded-corners", "text-shadow";

**注意：sass分节文件，如果不希望北碚，呗编译成单独的css文件，文件名前面添加一个下划线，编译系统将不会对其进行编译，import指令导入的时候不需要添加下划线**

	@import "colors";

实际上导入的是_colors.scss 文件。但是带有下划线的文件和不带下划线的文件同事村在的时候，带有下划线的文件将被忽略
**

### 嵌套import

一般情况下import使用在最外层，如果使用在内层，则导入的样式应用在导入的位置。

## media

使用方式不便，添加了额外功能，允许使用在内层，如下

src

	.sidebar {
	  width: 300px;
	  @media screen and (orientation: landscape) {
	    width: 500px;
	  }
	}

build

	.sidebar {
	  width: 300px; }
	  @media screen and (orientation: landscape) {
	    .sidebar {
	      width: 500px; } }

不同的media之前允许互相嵌套，编译时sass自动添加 and

src

	@media screen {
	  .sidebar {
	    @media (orientation: landscape) {
	      width: 500px;
	    }
	  }
	}

build

	@media screen and (orientation: landscape) {
	  .sidebar {
	    width: 500px; } }

@media 甚至可以使用 SassScript（比如变量，函数，以及运算符）代替条件的名称或者值：

src

	$media: screen;
	$feature: -webkit-min-device-pixel-ratio;
	$value: 1.5;
	
	@media #{$media} and ($feature: $value) {
	  .sidebar {
	    width: 500px;
	  }
	}

build

	@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
	  .sidebar {
	    width: 500px; } }

## @extend

样式继承，目标样式会继承原始样式的所有属性，并且所有与原始样式有关联的样式也会被继承

	.error {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	.error.intrusion {
	  background-image: url("/image/hacked.png");
	}

	.seriousError {
	  @extend .error;
	  border-width: 3px;
	}

build

	.error, .seriousError {
	  border: 1px #f00;
	  background-color: #fdd; }
	
	.error.intrusion, .seriousError.intrusion {
	  background-image: url("/image/hacked.png"); }
	
	.seriousError {
	  border-width: 3px; }

以上代码，seriousError继承了error所有属性，且继承了.error.intrusion的样式，意思就是会匹配.seriousError.intrusion元素，应用.error.intrusion的样式，也就是所有与error有关的样式都会被继承

### 延伸复杂的选择器

extend不仅仅可以继承class，也可以继承复杂选择器，类似a:hover之类的选择器也是可以扩展的

	.hoverlink {
	  @extend a:hover;
	}
	.comment a.user:hover {
	  font-weight: bold;
	}

build

	.comment a.user:hover, .comment .user.hoverlink {
	  font-weight: bold; }

### 多重继承

同一个选择器可以延伸给多个选择器，它所包含的属性将继承给所有被延伸的选择器：

	.error {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	.attention {
	  font-size: 3em;
	  background-color: #ff0;
	}
	.seriousError {
		//拆分书写
	  @extend .error;
	  @extend .attention;
		//集中书写
	  @extend .error,.attention;
	  border-width: 3px;
	}

build

	.error, .seriousError {
	  border: 1px #f00;
	  background-color: #fdd; }
	
	.attention, .seriousError {
	  font-size: 3em;
	  background-color: #ff0; }
	
	.seriousError {
	  border-width: 3px; }

由于编译顺序原因，后定义的原始样式具备同属性优先权，因为css样式中具备覆盖特性，sass遵循此特性,extend指令后可以一次性书写多个继承目标，逗号分隔

### 继续继承

	.error {
	  border: 1px #f00;
	  background-color: #fdd;
	}
	.seriousError {
	  @extend .error;
	  border-width: 3px;
	}
	.criticalError {
	  @extend .seriousError;
	  position: fixed;
	  top: 10%;
	  bottom: 10%;
	  left: 10%;
	  right: 10%;
	}

build

	.error, .seriousError, .criticalError {
	  border: 1px #f00;
	  background-color: #fdd; }
	
	.seriousError, .criticalError {
	  border-width: 3px; }
	
	.criticalError {
	  position: fixed;
	  top: 10%;
	  bottom: 10%;
	  left: 10%;
	  right: 10%; }

### extend-only

如果使用普通的 CSS 规则，最后会编译出很多用不到的样式，也容易与其他样式名冲突，所以，Sass 引入了“占位符选择器” (placeholder selectors)，看起来很像普通的 id 或 class 选择器，只是 # 或 . 被替换成了 %。可以像 class 或者 id 选择器那样使用，当它们单独使用时，不会被编译到 CSS 文件中。

	// This ruleset won't be rendered on its own.
	#context a%extreme {
	  color: blue;
	  font-weight: bold;
	  font-size: 2em;
	}

	.notice {
	  @extend %extreme;
	}

build

	#context a.notice {
	  color: blue;
	  font-weight: bold;
	  font-size: 2em; }

**限制：Sass 不可以将 @media 层外的 CSS 规则延伸给指令层内的 CSS，只能引用media层内部的样式**

### at-root

此指令将会在根级创建对应的样式集

	.parent {
	  ...
	  @at-root {
	    .child1 { ... }
	    .child2 { ... }
	  }
	  .step-child { ... }
	}

build

	.parent { ... }
	.child1 { ... }
	.child2 { ... }
	.parent .step-child { ... }

### debug

打印具体debug信息

	@debug 10em + 12em;

build

	Line 1 DEBUG: 22em

### warn

输出警告信息
