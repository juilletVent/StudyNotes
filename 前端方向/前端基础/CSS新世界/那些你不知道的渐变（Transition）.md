<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [你不知道特性](#%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%89%B9%E6%80%A7)
- [常用过渡差值函数（贝塞尔曲线）](#%E5%B8%B8%E7%94%A8%E8%BF%87%E6%B8%A1%E5%B7%AE%E5%80%BC%E5%87%BD%E6%95%B0%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF)
- [transition 与 visibility](#transition-%E4%B8%8E-visibility)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 你不知道特性

- trandition 简写中的两个时间，如果有一个是负值，则两个值的位置可以无序（因为负值只能给到 transition-delay）
- transition-delay 可以小于 0，表示从某个已经开始的位置进行过渡，可以省略部分动画进程

## 常用过渡差值函数（贝塞尔曲线）

```css
:root {
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  --ease-in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
  --ease-in-out-expo: cubic-bezier(1, 0, 0, 1);
  --ease-in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
```

## transition 与 visibility

visibility 控制隐藏的元素，虽然**占据布局空间**，但是**不显示、也不响应、不阻挡用户事件**，并且**支持 Transition**，因此用来做遮罩非常合适
