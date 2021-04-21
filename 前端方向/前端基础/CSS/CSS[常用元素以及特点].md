<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

    - [常用块级元素](#%E5%B8%B8%E7%94%A8%E5%9D%97%E7%BA%A7%E5%85%83%E7%B4%A0)
    - [常用内联元素](#%E5%B8%B8%E7%94%A8%E5%86%85%E8%81%94%E5%85%83%E7%B4%A0)
    - [常用的内联块状元素](#%E5%B8%B8%E7%94%A8%E7%9A%84%E5%86%85%E8%81%94%E5%9D%97%E7%8A%B6%E5%85%83%E7%B4%A0)
  - [下拉选择框](#%E4%B8%8B%E6%8B%89%E9%80%89%E6%8B%A9%E6%A1%86)
- [块级元素特点](#%E5%9D%97%E7%BA%A7%E5%85%83%E7%B4%A0%E7%89%B9%E7%82%B9)
- [内联元素特点](#%E5%86%85%E8%81%94%E5%85%83%E7%B4%A0%E7%89%B9%E7%82%B9)
- [inline-block 元素特点](#inline-block-%E5%85%83%E7%B4%A0%E7%89%B9%E7%82%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

##　CSS元素分类、特点

##### 常用块级元素
~~~
<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>
~~~

##### 常用内联元素
~~~
<a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>
~~~

##### 常用的内联块状元素
~~~
<img>、<input>
~~~

####checkbox radio 文字选中

将input元素放置进lable标签内即可

#### 下拉选择框
~~~
<select name="Select1">
    <option value="0">男</option>
    <option value="1">女</option>
</select>
~~~


### 块级元素特点

1. 每个块级元素都从新的一行开始，并且其后的元素也另起一行。（真霸道，一个块级元素独占一行）
2. 元素的高度、宽度、行高以及顶和底边距都可设置。
3. 元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。

### 内联元素特点

1. 和其他元素都在一行上；
2. 元素的高度、宽度及顶部和底部边距不可设置；
3. 元素的宽度就是它包含的文字或图片的宽度，不可改变。

### inline-block 元素特点
1. 和其他元素都在一行上；
2. 元素的高度、宽度、行高以及顶和底边距都可设置。

