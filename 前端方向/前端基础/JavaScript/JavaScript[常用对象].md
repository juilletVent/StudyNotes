<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [定时器](#%E5%AE%9A%E6%97%B6%E5%99%A8)
- [历史记录](#%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95)
- [窗口位置对象[location]](#%E7%AA%97%E5%8F%A3%E4%BD%8D%E7%BD%AE%E5%AF%B9%E8%B1%A1location)
- [Navigator对象](#navigator%E5%AF%B9%E8%B1%A1)
- [screen对象](#screen%E5%AF%B9%E8%B1%A1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

#### 定时器

![](http://img.mukewang.com/56976e1700014fc504090143.jpg)

#### 历史记录

window.history.$item

$item取值：

- length:历史记录URL个数
- forward():回退页面后，使用此方法可返回之前页面等价于下面一项
- go(parm):回退页面，使用此方法可返回指定，parm指定的位置是相对于当前页面的，当前页面为0，返回为负数，前进为正数

#### 窗口位置对象[location]

属性：![](http://img.mukewang.com/5354b1d00001c4ec06220271.jpg)
方法：![](http://img.mukewang.com/5354b1eb00016a2405170126.jpg)

#### Navigator对象

Navigator 对象包含有关浏览器的信息，通常用于检测浏览器与操作系统的版本。

属性：![](http://img.mukewang.com/5354cff70001428b06880190.jpg)

#### screen对象

window.screen.属性
screen对象用于获取用户的屏幕信息。

属性：![](http://img.mukewang.com/5354d2810001a47706210213.jpg)