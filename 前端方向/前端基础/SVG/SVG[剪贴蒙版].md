<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [clipPath创建剪贴蒙版](#clippath%E5%88%9B%E5%BB%BA%E5%89%AA%E8%B4%B4%E8%92%99%E7%89%88)
    - [剪贴蒙版](#%E5%89%AA%E8%B4%B4%E8%92%99%E7%89%88)
    - [普通蒙版](#%E6%99%AE%E9%80%9A%E8%92%99%E7%89%88)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## clipPath创建剪贴蒙版

#### 剪贴蒙版

> define

	<clipPath id="clip-light">
		定义蒙版形状，此处的形状讲作为剪贴蒙版的显示区域
	</clipPath>

> use

	<ellipse clip-path="url(#clip-light)">

	</ellipse

#### 普通蒙版

> define

	<mask id="mask">
		在此处绘制图形，使用黑白两色，黑色为蒙版遮盖的部分，白色为显示的部分
	</mask>

> use
	
	<circle mask="url(#mask)"></circle>

PS:mask不能加到use上
	