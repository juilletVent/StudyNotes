<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CSS 特效制作-三角形边线](#css-%E7%89%B9%E6%95%88%E5%88%B6%E4%BD%9C-%E4%B8%89%E8%A7%92%E5%BD%A2%E8%BE%B9%E7%BA%BF)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# CSS 特效制作-三角形边线

次特效一般用于弹层标识作用位置，类似气泡的小尾巴

主要核心原理为使用before+after两个伪类叠加做出的效果

实现思路：

1、将before绝对定位至框线边缘，并编写三角形样式，颜色赋予框线相同的颜色

2、将after绝对定位至before同样位置，施加三角形样式，高度下降框线宽度的高度，颜色赋予面板背景色

样例style：

	&::before{
        content: "";
        display: block;
        position: absolute;
        top: -8px;
        left: 20px;
        border: 8px solid transparent;
        border-width: 0 8px 8px;
        border-bottom-color: #ccc;
    }
    &::after{
        content: "";
        display: block;
        position: absolute;
        top: -7px;
        left: 20px;
        border: 8px solid transparent;
        border-width: 0 8px 8px;
        border-bottom-color: #fff;
    }