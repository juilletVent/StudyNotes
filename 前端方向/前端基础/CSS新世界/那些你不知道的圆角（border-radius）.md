<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [拓展圆角知识边界](#%E6%8B%93%E5%B1%95%E5%9C%86%E8%A7%92%E7%9F%A5%E8%AF%86%E8%BE%B9%E7%95%8C)
- [重叠曲线的渲染机制（解释设置一个超大的半径以及 100%时为什么是那种效果）](#%E9%87%8D%E5%8F%A0%E6%9B%B2%E7%BA%BF%E7%9A%84%E6%B8%B2%E6%9F%93%E6%9C%BA%E5%88%B6%E8%A7%A3%E9%87%8A%E8%AE%BE%E7%BD%AE%E4%B8%80%E4%B8%AA%E8%B6%85%E5%A4%A7%E7%9A%84%E5%8D%8A%E5%BE%84%E4%BB%A5%E5%8F%8A-100%25%E6%97%B6%E4%B8%BA%E4%BB%80%E4%B9%88%E6%98%AF%E9%82%A3%E7%A7%8D%E6%95%88%E6%9E%9C)
- [一些特性](#%E4%B8%80%E4%BA%9B%E7%89%B9%E6%80%A7)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 拓展圆角知识边界

常用的写法：`border-radius: 5px;` 代表了四个角的圆角缩写，但是这不仅仅缩写了四个角，还缩写了圆角定义

四个角的完整语法：

```css
border-radius: 1px 2px 3px 4px / 5px 6px 7px 8px;
/* 等价于 */
border-top-left-radius: 1px 5px;
border-top-right-radius: 2px 6px;
border-bottom-right-radius: 3px 7px;
border-bottom-left-radius: 4px 8px;
```

圆角的实现并不是通过圆形曲线去实现的，而是通过椭圆曲线去实现的，因此，圆角定义其实是需要两个半径的--长半径和短半径；我们平时只写一个值就变成了圆形；

如果需要单独指定长半径和短半径，则需要使用斜线进行分割，斜线前面定义的是横轴半径，后面定义了纵轴半径，参与个数与缩写的格式一致；

## 重叠曲线的渲染机制（解释设置一个超大的半径以及 100%时为什么是那种效果）

定义公式： `f = min( Lh / Sh, Lv / Sv )`

解释:

- f：圆角定值修正倍率值，入这个值小于 1，则所有圆角定义参数实际渲染时，都需要乘上这个倍率
- L:元素宽高
- S:椭圆直径（半径参数值的 2 倍）
- v/h 角标：标识方向(h:水平、v：垂直)

通过下面这个例子进行解释：

```css
width: 150px;
height: 100px;
border-top-left-radius: 30px 100%;
border-bottom-left-radius: 30px 100%;
```

代入上述公式：

```
f = min( 150 / 60 , 100 / 200px ) = 0.5
```

计算出的`f`小于 1，因此，所有的圆角定义参数都乘上`f`,最终渲染结果:

```
border-top-left-radius: 15px 50%;
border-bottom-left-radius: 15px 50%;
```

_Tips:因此，实现圆角矩形时，设定 100%和设定 1000000px 是有区别的_

## 一些特性

- 圆角区域外不响应用户事件
- 没有继承性
- 支持动画
