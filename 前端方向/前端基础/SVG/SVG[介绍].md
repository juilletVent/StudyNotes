## SVG 入门介绍

> 基本属性

fill、stroke、stroke-widt、transform

### 基本型

- rect - x,y ：定义矩形位置 - width、height：宽高 - rx、ry：圆角半径

- circle - cx、cy：圆心位置 - r：半径

- ellipse - cx、cy：圆心 - rx、ry：椭圆半径

- line - x1、x2 - y1、y2

- polygon 多边形

  ```

  ```

- polyline 折线 - points：x1 y1 x2 y2...

### 样式

- fill：填充
- stroke：描边
- stroke-width：描边宽度
- stroke-dasharray:虚线描边每一段的长度（这两个属性常用来做 SVG 路径动画）
- stroke-dashoffset：虚线描边起始偏移距离（这两个属性常用来做 SVG 路径动画）
- transform：变换

### 动态生成

> 创建 SVG 元素

    document.createElementNS(SVG_NS/*SVG命名空间固定写法*/,tagName)

> 添加图形

    appendChild(child)

### 定义引用元素

使用标签 defs 标签包裹被定义的元素，可以实现后向引用
举个栗子：

    <defs>
    	<g id="coord">
    		...
    	</g>
    <defs>

引用时使用 use 标签进行引用

    <use xlink:href="#coord"/>

这种方式避免元素的重复书写

##视口 viewport 与 viewBox

viewBox = "x y width height"

preserveAspectRatio:

    preserveAspectRatio="xMidYMid meet"

第一个参数由两个参数组合而来

|:-值|:- 含义-:|
|xMin viewport 和 viewBox 左边对齐
|xMid viewport 和 viewBox x 轴中心对齐
|xMax viewport 和 viewBox 右边对齐
|YMin viewport 和 viewBox 上边缘对齐。注意 Y 是大写。
|YMid viewport 和 viewBox y 轴中心点对齐。注意 Y 是大写。
|YMax viewport 和 viewBox 下边缘对齐。注意 Y 是大写。

第二个参数：

值 含义
meet 保持纵横比缩放 viewBox 适应 viewport，受
slice 保持纵横比同时比例小的方向放大填满 viewport，攻
none 扭曲纵横比以充分适应 viewport，变态
