<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [2D图形变换原理[矩阵]](#2d%E5%9B%BE%E5%BD%A2%E5%8F%98%E6%8D%A2%E5%8E%9F%E7%90%86%E7%9F%A9%E9%98%B5)
  - [概念](#%E6%A6%82%E5%BF%B5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 2D图形变换原理[矩阵]

## 概念

> 变换矩阵

~~~
--			   --
|	a	c	e	|
|	b	d	f	|
|	0	0	1	|
--			   --

a:水平缩放 b:水平倾斜 c:垂直倾斜 d:垂直缩放 e:水平位移 f:垂直位移

默认矩阵[单位矩阵]
--			   --
|	1	0	0	|
|	0	1	0	|
|	0	0	1	|
--			   --

~~~

> 线性变换方程

	X' = aX + cY + e
	Y' = bX + dY + f


旋转实际上就是直角坐标系与极坐标系的坐标系统互相转换的问题

> 注意

假设现在执行N此变换，则目标变换矩阵M应采用如下计算方式：
	
	M = Mn * Mn-1 * ... M0

也就是变换矩阵需要逆序书写

且不满足交换律，此为线性代数自身的结论