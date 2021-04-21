<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CSS3布局样式相关](#css3%E5%B8%83%E5%B1%80%E6%A0%B7%E5%BC%8F%E7%9B%B8%E5%85%B3)
  - [多列布局](#%E5%A4%9A%E5%88%97%E5%B8%83%E5%B1%80)
  - [CSS3盒子模型](#css3%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# CSS3布局样式相关

## 多列布局

> 列数与宽度

columns:width count

~~~
-webkit-columns:200px 2;
-moz-columns: 200px 2;
-o-columns:200px 2;
-ms-columns: 200px 2;
columns: 200px 2;
~~~

> 间距column-gap

column-gap主要用来设置列与列之间的间距，其语法规则如下：

	column-gap: normal || <length>

length:可使用px、em但不可以使用负数

> 边框 column-rule

column-rule主要是用来定义列与列之间的边框宽度、边框样式和边框颜色。简单点说，就有点类似于常用的border属性。但column-rule是不占用任何空间位置的，在列与列之间改变其宽度不会改变任何列的位置。

语法：

	column-rule:<column-rule-width>|<column-rule-style>|<column-rule-color>

边框样式：

	none、hidden、dotted、dashed、solid、double、groove、ridge、inset、outset

颜色注意：如果不希望显示颜色，也可以将其设置为transparent(透明色)

~~~
-webkit-column-rule:2px solid gray;
-moz-olumn-rule:2px solid gray;
-o-olumn-rule:2px solid gray;
-ms-olumn-rule:2px solid gray;
olumn-rule:2px solid gray;
~~~

**Tips：支持，携带浏览器前缀**

> 跨列显示[标题效果]

语法：

	column-span：none|all

- none 默认不横跨
- all 横跨

~~~
h2,p:nth-child(2n){
  -webkit-column-span:all;
  -moz-column-span:all;
  -o-column-span:all;
  -ms-column-span:all;
  column-span:all;
}
~~~

## CSS3盒子模型

在CSS3中新增加了box-sizing属性，能够事先定义盒模型的尺寸解析方式，其语法规则如下：

	box-sizing: content-box | border-box | inherit

取值说明：

- content-box：默认值，让元素维持W3C的标准盒模型
- border-box：让元素维持IE传统的盒模型（IE6以下版本和IE6-7怪异模式）
- inherit：使元素继承父元素的盒模型模式

content与border区别在于除去内容后的内填充、边框、外边距划归给谁，W3C标准模式单独划归，border模式划归给内容

**阅读理解：使用content-box时，边框填充等，在布局时占据布局位置，而使用border-box时这些属性不占用布局空间**

