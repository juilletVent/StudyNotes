<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CSS3 动画/渐变 三次贝塞尔曲线](#css3-%E5%8A%A8%E7%94%BB%E6%B8%90%E5%8F%98-%E4%B8%89%E6%AC%A1%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# CSS3 动画/渐变 三次贝塞尔曲线

cubic-bezier 又称三次贝塞尔，主要是为 animation 生成速度曲线的函数。

格式：cubic-bezier(\<x1\>, \<y1\>, \<x2\>, \<y2\>)

用在动画 或 渐变的插值函数处，

栗子：

transition: all .5 cubic-bezier(0.68, -0.55, 0.27, 1.55);

说明：三次贝塞尔曲线由两个线上点以及两个控制点构成，函数的两个线上点已经确定，分别为(0,0)、(1,1),函数传入的参数只需要确定两个控制点即可确定曲线样式，x取值不能超出(0,1)开区间，否则函数无效