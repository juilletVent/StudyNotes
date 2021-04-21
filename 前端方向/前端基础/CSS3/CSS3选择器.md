<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CSS3选择器](#css3%E9%80%89%E6%8B%A9%E5%99%A8)
  - [CSS3选择器 属性选择器](#css3%E9%80%89%E6%8B%A9%E5%99%A8-%E5%B1%9E%E6%80%A7%E9%80%89%E6%8B%A9%E5%99%A8)
  - [CSS3 结构性伪类选择器—root](#css3-%E7%BB%93%E6%9E%84%E6%80%A7%E4%BC%AA%E7%B1%BB%E9%80%89%E6%8B%A9%E5%99%A8root)
  - [CSS3 结构性伪类选择器—not](#css3-%E7%BB%93%E6%9E%84%E6%80%A7%E4%BC%AA%E7%B1%BB%E9%80%89%E6%8B%A9%E5%99%A8not)
  - [CSS3 结构性伪类选择器—empty](#css3-%E7%BB%93%E6%9E%84%E6%80%A7%E4%BC%AA%E7%B1%BB%E9%80%89%E6%8B%A9%E5%99%A8empty)
  - [CSS3 结构性伪类选择器—target](#css3-%E7%BB%93%E6%9E%84%E6%80%A7%E4%BC%AA%E7%B1%BB%E9%80%89%E6%8B%A9%E5%99%A8target)
  - [子代选择器](#%E5%AD%90%E4%BB%A3%E9%80%89%E6%8B%A9%E5%99%A8)
      - [特殊筛选器](#%E7%89%B9%E6%AE%8A%E7%AD%9B%E9%80%89%E5%99%A8)
      - [状态选择器](#%E7%8A%B6%E6%80%81%E9%80%89%E6%8B%A9%E5%99%A8)
  - [CSS样式选择器](#css%E6%A0%B7%E5%BC%8F%E9%80%89%E6%8B%A9%E5%99%A8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# CSS3选择器

## CSS3选择器 属性选择器

属性选择器具备通配概念

![](http://img.mukewang.com/56653eba0001b07004610215.jpg)

~~~
a[class^="column"]{
    background:red;
}
a[href$="doc"]{
    background:green;
}
a[title*="box"]{
    background:blue;
}
~~~

- [attr]:匹配所有具备attr属性的元素
- [attr=val]:匹配所有attr属性=val的元素
- [attr!=val]：匹配没有attr属性或者attr属性不为val的元素
- [attr^=val]:匹配attr属性以val开头的元素
- [attr$=val]:匹配attr属性以val结尾的元素
- [attr*=val]:匹配attr属性含有val的元素
- [attr~=val]:匹配attr属性包含val的元素，attr属性值必须为空格分割的单词列表
- [attr|=val]:匹配attr属性以val开头且其后没有其他字符，或者其他字符是以连字符开头的元素

## CSS3 结构性伪类选择器—root

HTML中 “:root”选择器等同于<html>元素，简单点说：

	:root{background:orange}
	html {background:orange;}

得到的效果等同，建议使用:root方法。

## CSS3 结构性伪类选择器—not

:not选择器称为否定选择器，和jQuery中的:not选择器一模一样，可以选择除某个元素之外的所有元素

~~~
//选中除了页脚外其余部分
div:not([id="footer"]){
  background: orange;
}
~~~

## CSS3 结构性伪类选择器—empty

空选择器，筛选内容为空的元素
~~~
div:empty{
  border: 1px solid green;
}
~~~

## CSS3 结构性伪类选择器—target

:target选择器称为目标选择器，用来匹配文档(页面)的url的某个标志符的目标元素

~~~
//设定锚点连接，当锚点触发时应用该样式，可以携带子类选择器
#brand:target p{
  background: orange;
  color: #fff;
}
~~~

## 子代选择器

####同级元素需要一致不能有其他元素，否则出错

- first-child 第一个子元素
- last-child 最后一个子元素
- nth-child(n) 表达式筛选，n为可变值，使用n可以完成不规则筛选[可以根据n进行多项筛选，也可以传入数值进行单项筛选]
- nth-last-child(n)同上，区别在于n从后往前计数，反向筛选

####同级元素不要求，根据条件进行筛选

- first-of-type 指定类型选择第一个[选择第一个子代DIV之类的]
- last-of-type 指定类型 最后一个
- nth-of-type(n) 筛选类型 然后根据n进行二次筛选
- nth-last-of-type(n) 同上，n从尾部计次[逆行计数]

**Tips：涉及使用n的选择器均为函数调用形式**

#### 特殊筛选器

- only-child 匹配的元素的父元素中仅有一个子元素，而且是一个唯一的子元素
- only-of-type 选择器就可以选中这个元素中的唯一一个类型子元素

#### 状态选择器

- :enabled
- :disabled
- :checked
- ::selection/-moz-selection[FireFox前缀] 针对文字选择的样式
- :read-only 基本等同于disabled
- :read-write 基本等同于enabled
- ::before和::after这两个主要用来给元素的前面或后面插入内容，这两个常和"content"配合使用，使用的场景最多的就是清除浮动

before与after也常用在特效制作上，如蒙版的添加，与蒙版焦点

**Tips：before与after添加的内容位置为元素内部的实际内容前后**

## CSS样式选择器

- 空格：空格代表所有后代元素
- 大于号:大于号代表下一级元素
- 加号：代表紧跟在后的元素
- 波浪线：代表之后的元素

**波浪线选择器大坑：**

波浪线选择只能从同级开始，层层深入，不能跨越层级，且只能后向，不能向前选择，共同的父元素

~~~
&-radio:nth-of-type(1):checked ~ .banner-cont #cont1 .top,
&-radio:nth-of-type(1):checked ~ .banner-cont #cont1 .bottom{
//		transform: rotateX(0deg);
//		opacity: 1;
	display: none;
}
~~~