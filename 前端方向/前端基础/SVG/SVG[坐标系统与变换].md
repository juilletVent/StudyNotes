<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [SVG 坐标系统 & 变换](#svg-%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F--%E5%8F%98%E6%8D%A2)
  - [图形分组](#%E5%9B%BE%E5%BD%A2%E5%88%86%E7%BB%84)
  - [坐标系统](#%E5%9D%90%E6%A0%87%E7%B3%BB%E7%BB%9F)
  - [变换执行顺序](#%E5%8F%98%E6%8D%A2%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F)
    - [小技巧](#%E5%B0%8F%E6%8A%80%E5%B7%A7)
  - [注意事项](#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## SVG 坐标系统 & 变换

> 视野 ViewBox

SVG标签中控制视野大小的属性 使用两个点定义视口位置与宽高，等同于矩形
	viewBox = "0 0 400 300"
	width = "400"
	height = "300"


### 图形分组

使用g标签进行分组，可以嵌套使用，属性可以继承**

### 坐标系统

原始坐标系、自身坐标系、前驱坐标系[指的是父元素坐标系]、参考坐标系

### 变换执行顺序

变换具体执行的环境建立在前面的所有的变换基础之上：
如何理解？如：

	1、rotate(30deg) translate(0,50)
	2、translaste(0,50) rotate(30deg)

上面的两个栗子效果不一样，第一个效果为先旋转，然后执行的平移是在旋转后的坐标上执行的
第二个栗子则是先在自身坐标系执行平移，然后抵达目标后在目标当前位置再执行旋转


#### 小技巧

viewBox如果使用非整数倍宽高，将会导致浏览器渲染的线条较为锐利

### 注意事项

所有的操作均是在变换后的坐标系上执行的