<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [子元素撑满不定高父级元素的方法](#%E5%AD%90%E5%85%83%E7%B4%A0%E6%92%91%E6%BB%A1%E4%B8%8D%E5%AE%9A%E9%AB%98%E7%88%B6%E7%BA%A7%E5%85%83%E7%B4%A0%E7%9A%84%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 子元素撑满不定高父级元素的方法

> 子元素设置百分比高度无效原因

父元素没有被设置高度（height）的时候，子元素的高度（height）设置百分比是无效的，其核心原因在于这时候他并不知道参照物是谁，这时候浏览器就默认不做任何计算。

> 解决办法

使用position解决参照对象问题即可

1. 为父元素指定
		
		position: relative;

2. 子元素指定如下属性即可
	
		position: absolute;
        height: 100%;