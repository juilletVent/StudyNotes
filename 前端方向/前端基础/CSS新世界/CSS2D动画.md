<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [可用性](#%E5%8F%AF%E7%94%A8%E6%80%A7)
- [顺序](#%E9%A1%BA%E5%BA%8F)
- [clip、clip-path 与 变换的联动](#clipclip-path-%E4%B8%8E-%E5%8F%98%E6%8D%A2%E7%9A%84%E8%81%94%E5%8A%A8)
- [层级](#%E5%B1%82%E7%BA%A7)
- [固定定位失效问题](#%E5%9B%BA%E5%AE%9A%E5%AE%9A%E4%BD%8D%E5%A4%B1%E6%95%88%E9%97%AE%E9%A2%98)
- [裁剪](#%E8%A3%81%E5%89%AA)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 可用性

内联元素不支持 transform 变换（替换元素除外）

## 顺序

记住一点，所有的变换都是在操作元素的空间坐标轴，基于矩阵运算的法则，矩阵乘法不满足交换律，因此多个变换顺序有严格要求，交换顺序之后表现并不一样

## clip、clip-path 与 变换的联动

一句话：先裁剪，再变换

## 层级

transform 不为 none 的元素会创建新的 CSS 上下文，与 opacity 不为 1 的元素表现类似

## 固定定位失效问题

相对于屏幕固定的元素如果同时应用 transform 变换动画，则固定定位会失效

解决方案：嵌套元素，外层元素定位，内层元素实现动画

## 裁剪

- 设置了 transform 变换的的父级元素，会导致其内的绝对定位子元素响应上层的 overflow 裁剪行为
- **设置了 transform 变换的的父级元素现在也作为绝对定位的包含块**
