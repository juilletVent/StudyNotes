<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [一些需要注意的点](#%E4%B8%80%E4%BA%9B%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E7%9A%84%E7%82%B9)
- [animation-direction 动画播放方向](#animation-direction-%E5%8A%A8%E7%94%BB%E6%92%AD%E6%94%BE%E6%96%B9%E5%90%91)
- [animation-iteration-count 动画播放次数](#animation-iteration-count-%E5%8A%A8%E7%94%BB%E6%92%AD%E6%94%BE%E6%AC%A1%E6%95%B0)
- [深入理解插值函数（steps）](#%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E6%8F%92%E5%80%BC%E5%87%BD%E6%95%B0steps)
- [复合动画、Transform 占用得到处理方法](#%E5%A4%8D%E5%90%88%E5%8A%A8%E7%94%BBtransform-%E5%8D%A0%E7%94%A8%E5%BE%97%E5%88%B0%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 一些需要注意的点

- 复合动画拆分定义，便于复用(与函数式编程思路一样，定义原子操作，然后进行组合)

> Bad

```css
.element {
  animation: fadeInSlideInRight 0.2s;
}
@keyframes fadeInSlideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX (0%);
  }
}
```

> Good

```css
.element {
  animation: fadeIn 0.2s, slideInRight 0.2s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  t o {
    transform: translateX(0%);
  }
}
```

- keyframes 重复定义的关键帧，属性是合并覆盖，并不是直接完全替换
- 关键帧中的样式可以不连续（前一个关键具备的属性，后一个关键帧可以没有）
- !important 无效，当 CSS 动画执行的时候，关键帧中定义的 CSS 优先级就是最高的
- keyframes 中定义的关键帧 CSS 属性优先级最高，甚至超过`!important`

## animation-direction 动画播放方向

- animation-direction: normal; 正常播放
- animation-direction: reverse; 所有轮次均反转播放
- animation-direction: alternate; 动画执行的方向是 0%→100%、100%→0%，每 2n+1 轮的动画方向是相反的。
- animation-direction: alternate-reverse; 动画执行的方向是 100%→0%，0%→100%，每 2n 轮的动画方向是相反的。

## animation-iteration-count 动画播放次数

**Tips：非常重要的特点，支持小数，可以将动画播放到小数指定的某个关键帧**

## 深入理解插值函数（steps）

语法：step(分段数量,阶跃函数表型形式)

<img src="../../../img/steps阶跃函数表现.png" />

实用的函数简写：

- step-start：steps(1,start)
- step-end：steps(1,end)

## 复合动画、Transform 占用得到处理方法

**Tips：嵌套标签即可解决**
