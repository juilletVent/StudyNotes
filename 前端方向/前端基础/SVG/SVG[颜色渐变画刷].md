<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [颜色、渐变、画刷](#%E9%A2%9C%E8%89%B2%E6%B8%90%E5%8F%98%E7%94%BB%E5%88%B7)
    - [颜色](#%E9%A2%9C%E8%89%B2)
    - [渐变](#%E6%B8%90%E5%8F%98)
    - [笔刷](#%E7%AC%94%E5%88%B7)
    - [patternUnits patternContentUnits](#patternunits-patterncontentunits)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 颜色、渐变、画刷

#### 颜色

	<rect fill="rgb(255,0,0)" opacity="0.5"/>
	<rect stroke="hsla(0,50%,60%,0.5)"/>

#### 渐变

- 线性渐变
	
	四个点描述起始位置、终止位置
	<linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
	offset描述中间点 
	<stop offset="0.15" stop-color="#ff00ff">
	
渐变定义放入defs中

- 镜像渐变

	<radialGradient id="grad2" cx="0.5" cy="0.5" r="0.5" fx="0.68" fy="0.5">
		<stop offset="0.15" stop-color="#ffffff"/>
	</radialGradient>

- 引用

	<rect fill="url(#gradl)"...>


#### 笔刷

#### patternUnits patternContentUnits

patternUnits默认值下宽高使用容器百分比，容器坐标系宽高
如果使用userSpaceOnUse则使用原始坐标系作为参考坐标系进行定位

patternContentUnits 默认使用userSpaceOnUse
可选项为objectBoundingBox
