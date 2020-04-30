# 响应式设计[Responsive]

## Responsive布局技巧

> 在Responsive布局中，可以毫无保留的丢弃：
	
	第一， 尽量少用无关紧要的div；
	
	第二，不要使用内联元素（inline）；
	
	第三，尽量少用JS或flash；
	
	第四，丢弃没用的绝对定位和浮动样式；
	
	第五，摒弃任何冗余结构和不使用100%设置。

> 有哪些东东能帮助Responsive确定更好的布局呢？

	第一，使用HTML5 Doctype和相关指南；
	
	第二，重置好你的样式（reset.css）；
	
	第三，一个简单的有语义的核心布局；
	
	第四，给重要的网页元素使用简单的技巧，比如导航菜单之类元素。

使用这些技巧，无非是为了保持你的HTML简单干净，而且在你的页面布局中的关键部分（元素）不要过分的依赖现代技巧来实现，比如说CSS3特效或者JS脚本

## Responsive设计——meta标签

一个meta标签被称为可视区域meta标签，其使用方法如下：
	
	<meta name=”viewport” content=”” />

在content属性中主要包括以下属性值，用来处理可视区域

![](http://img.mukewang.com/53660f2c0001190005270386.jpg)

## 自由缩放属性resize

	resize: none | both | horizontal | vertical | inherit

取值：

|-------|:------------------------------|
|属性	|取值							|
|none	|不能修改尺寸						|
|both	|允许修改宽高						|
|horizontal|允许水平，不允许垂直方向		|
|vertical|允许垂直，不允许水平				|
|inherit|继承父元素						|

example:

	/*注意携带浏览器前缀*/
	textarea{
	  -webkit-resize: both;
	  -moz-resize: both;
	  -o-resize: both;
	  -ms-resize: both;
	  resize: both;
	}
	div{
	  resize: both;
	  overflow:auto;
	  width:100px;
	  border:2px solid gray;
	}
	//普通元素携带此属性时，不设置表框将不会显示角标，也就无法拖拽

## CSS3外轮廓属性

外轮廓outline在页面中呈现的效果和边框border呈现的效果极其相似，但和元素边框border完全不同，外轮廓线不占用网页布局空间，不一定是矩形，外轮廓是属于一种动态样式，只有元素获取到焦点或者被激活时呈现

outline属性的基本语法如下：

~~~
outline: [outline-color] || [outline-style] || 
		 [outline-width] || [outline-offset] || inherit
~~~

|-----------|:--------------|
|属性值		|说明			|
|outline-color|	定义轮廓线的颜色|
|outline-style|轮廓样式|
|outline-width|轮廓线宽|
|outline-offset|定义轮廓边框的偏移位置的数值，此值可以取负数值。当此参数的值为正数值，表示轮廓边框向外偏离多少个像素；当此参数的值为负数值，表示轮廓边框向内偏移多少个像素|
|inherit|基础|

**example：**

	outline:red solid 2px;
















