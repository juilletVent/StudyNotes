## 引导

	.mixin (@a) when (lightness(@a) >= 50%) {
	  background-color: black;
	}
	.mixin (@a) when (lightness(@a) < 50%) {
	  background-color: white;
	}
	.mixin (@a) {
	  color: @a;
	}

导引序列使用逗号‘,’—分割，当且仅当所有条件都符合时，才会被视为匹配成功

	.mixin (@a) when (@a > 10), (@a < -10) { ... }

> 常见的导引判断函数
	
	iscolor
	isnumber
	isstring
	iskeyword
	isurl

	ispixel
	ispercentage
	isem

**与条件**

	.mixin (@a) when (isnumber(@a)) and (@a > 0) { ... }

**或条件**

	.mixin (@b) when not (@b > 0) { ... }


## Color 函数

函数表

	lighten(@color, 10%);     // return a color which is 10% *lighter* than @color
	darken(@color, 10%);      // return a color which is 10% *darker* than @color
	
	saturate(@color, 10%);    // return a color 10% *more* saturated than @color
	desaturate(@color, 10%);  // return a color 10% *less* saturated than @color
	
	fadein(@color, 10%);      // return a color 10% *less* transparent than @color
	fadeout(@color, 10%);     // return a color 10% *more* transparent than @color
	fade(@color, 50%);        // return @color with 50% transparency
	
	spin(@color, 10);         // return a color with a 10 degree larger in hue than @color
	spin(@color, -10);        // return a color with a 10 degree smaller hue than @color
	
	mix(@color1, @color2);    // return a mix of @color1 and @color2

> Example
	
	@base: #f04615;
	
	.class {
	  color: saturate(@base, 5%);
	  background-color: lighten(spin(@base, 8), 25%);
	}

### 数学函数

	round(1.67); // returns `2`
	ceil(2.4);   // returns `3`
	floor(2.6);  // returns `2`

	//百分比转换函数
	percentage(0.5); // returns `50%`


### 命名空间

似乎可以使用嵌套引用并不影响

	#bundle {
	  .button () {
	    display: block;
	    border: 1px solid black;
	    background-color: grey;
	    &:hover { background-color: white }
	  }
	  .tab { ... }
	  .citation { ... }
	}

	#header a {
	  color: orange;
	   //嵌套引用
	  #bundle > .button;
	}

### 导入

可以不携带后缀

	@import "lib.less";
	@import "lib";

引入css，加上cs 后缀即可，less 不会对其进行任何处理

	@import "lib.css";


### 字符串插值
	
	@base-url: "http://assets.fnord.com";
	background-image: url("@{base-url}/images/bg.png");

### 避免编译

此处的值，less不会进行编译，不作任何处理，在使用css函数时尤其有用

	.class {
	  filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
	}

### JS表达式

JavaScript 表达式也可以在.less 文件中使用. 可以**通过反引号的方式使用**

	@var: `"hello".toUpperCase() + '!'`;

可以与避免编译一起使用，不过我没看懂

	@str: "hello";
	@var: ~`"@{str}".toUpperCase() + '!'`;
	//输出
	@var: HELLO!;

**可以访问JavaScript环境，不过这可能需要直接在客户端使用less文件，而不是编译成css（猜测）**


