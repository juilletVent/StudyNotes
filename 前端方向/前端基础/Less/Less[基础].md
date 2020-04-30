# Less[基础语法]

## 注释

- /**/多行注释，并且在CSS文件中会出现
- // 单行注释，且不会再CSS文件中出现

## 文档头

	@charset "utf-8";

## 变量

定义：@varName:Value单位

栗子：@width:300px;

## 混合

已定义的CSS样式直接嵌入至其他样式中

栗子：

~~~
.a{
	backgroud-color:#fff;
	.b;//直接引用
}

.b{
	font-size:1.5em;
}

输出效果：
.a{
	backgroud-color:#fff;
	font-size:1.5em;
}
.b{
	font-size:1.5em;
}
~~~

带参数混合

定义：

~~~
.border(@width){
	border:@width solid red;
}

.div{
	.border(2px);
}
~~~

所有的参数，类似JavaScript函数，arguments参数

	.box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
	  box-shadow: @arguments;
	  -moz-box-shadow: @arguments;
	  -webkit-box-shadow: @arguments;
	}
	//调用
	.box-shadow(2px, 5px);
	

带默认值的

~~~
.border(@width:10px){
	border:@width solid red;
}

.div{
	.border();
}
~~~

不带参数的集合，这种定义方法，CSS将不会出现，在需要使用的时候引入即可

	.border(){
		border:@width solid red;
	}
	//引入
	p{
		.border;
	}

## 匹配模式

模式匹配通过参数莫得字符串的不同甄别不同的CSS样式

~~~
根据模式字符串的不同，匹配不同的CSS样式
.mode1(top,@parm){
	border-width:@parm;
	border-color:black transparent transparent transparent;
}

.mode1(bottom,@parm){
	border-width:@parm;
	border-color:transparent transparent black transparent;
}

//携带的默认样式，参数列表不能省略，且为固定写法
.mode1(@_,@parm){
	width:100px;
	height:100px;
}

//使用top模式，且应用默认模式
.a{
	mode1(top,3px);
}

执行结果：
.a{
	border-width:3px;
	border-color:black transparent transparent transparent;
	width:100px;
	height:100px;
}

~~~

## 嵌套

~~~
.list{
	width:500px;
	height:100px;
	list-style:none;
	li{
		height:100px;
		width:300px;
		margin-bottom:5px;
		float:left;
	}
	a{
		float:right;
	}
}

对应生成：
.list{
	...
}

.list li{
	...
}

.list a{
	...
}
~~~

**&符号：代表当前选择器的上一级选择器**

应用：
~~~
a{
	color:#fff;
	//为a标签加上hover样式
	&:hover{
		color:red;
	}
}
~~~

## 避免编译

使用如下格式：

~~~
width：~'避免编译的代码'
width：~"避免编译的代码"
~~~

## 强调样式

在less调用后面跟上 !important即可

栗子：
~~~
.a{
	b() !important;
}
生成结果：
.a{
	width:100px !important;
	height:100px !important;
}
~~~

## after元素特殊注意

不能直接书写,应使用父选择器进行书写
~~~
.clearFix{
	&::after{
		content:"";
		display:block;
		clear:both;	
	}
}
~~~