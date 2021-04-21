<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [函数指令 Function Directives](#%E5%87%BD%E6%95%B0%E6%8C%87%E4%BB%A4-function-directives)
- [输出格式](#%E8%BE%93%E5%87%BA%E6%A0%BC%E5%BC%8F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 函数指令 Function Directives

Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用

定义：

	$grid-width: 40px;
	$gutter-width: 10px;
	
	@function grid-width($n) {
	  @return $n * $grid-width + ($n - 1) * $gutter-width;
	}
	
	#sidebar { width: grid-width(5); }

build

	#sidebar {
	  width: 240px; }

**自定义的函数也可以使用关键词参数**

**Tips：建议在自定义函数前添加前缀避免命名冲突，其他人阅读代码时也会知道这不是 Sass 或者 CSS 的自带功能**

自定义函数与 mixin 相同，都支持 variable arguments，也就是arguments参数表变量

## 输出格式

sass提供四种编译输出方式

> nested

Nested （嵌套）样式是 Sass 默认的输出格式，能够清晰反映 CSS 与 HTML 的结构关系。选择器与属性等单独占用一行，缩进量与 Sass 文件中一致，每行的缩进量反映了其在嵌套规则内的层数。当阅读大型 CSS 文件时，这种样式可以很容易地分析文件的主要结构。

> expanded

手写风格，Expanded 输出更像是手写的样式，选择器、属性等各占用一行，属性根据选择器缩进，而选择器不做任何缩进。

> compact

一般压缩格式，具备一定的可读性，Compact 输出方式比起上面两种占用的空间更少，每条 CSS 规则只占一行，包含其下的所有属性。嵌套过的选择器在输出时没有空行，不嵌套的选择器会输出空白行作为分隔符

> compressed

生产模式，Compressed 输出方式删除所有无意义的空格、空白行、以及注释，力求将文件体积压缩到最小，同时也会做出其他调整，比如会自动替换占用空间最小的颜色表达方式。