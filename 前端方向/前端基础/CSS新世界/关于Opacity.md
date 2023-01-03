<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [关于性能](#%E5%85%B3%E4%BA%8E%E6%80%A7%E8%83%BD)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 关于性能

opacity 在过渡动画中是一众 CSS 属性中性能最高的，因此某些复杂进出场过渡动画可以改写为 Opacity 实现，而不是原始实现，不然 Hover 之后的元素阴影就可以改写为下面这个样子：

```css
/* 基本实现 */
.item {
  transition: box-shadow 0.3s ease-in-out;
}
.item:hover {
  box-shadow: 0 0 5px deepskyblue;
}

/* 优化实现 */
.item {
  position: relative;
}
.item::before {
  content: "";
  display: block;
  position: absolute;
  inset: 0;
  box-shadow: 0 0 5px deepskyblue;
  transition: box-shadow 0.3s ease-in-out;
  opacity: 0;
}
.item:hover {
  opacity: 1;
}
```
