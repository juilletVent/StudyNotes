<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [多阴影](#%E5%A4%9A%E9%98%B4%E5%BD%B1)
  - [层叠顺序](#%E5%B1%82%E5%8F%A0%E9%A1%BA%E5%BA%8F)
- [性能优化](#%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 多阴影

box-shadow 支持多阴影，配合上扩展距离，可以渲染任意图形

骚气的彩虹边框：

```css
.gradient-border {
  height: 100px;
  border-radius: 10px;
  background-color: deepskyblue;
  box-shadow: 0 0 0 1px #07b9fb, 0 0 0 2px #17aef4, 0 0 0 3px #27a4ee, 0 0 0 4px
      #3799e7, 0 0 0 5px #478ee0, 0 0 0 6px #5784d9, 0 0 0 7px #6779d3, 0 0 0
      8px #776ecc, 0 0 0 9px #8764c5, 0 0 0 10px #9759be, 0 0 0 11px #a74eb8, 0
      0 0 12px #b744b1, 0 0 0 13px #c739aa, 0 0 0 14px #d72ea3,
    0 0 0 15px #e7249d, 0 0 0 16px #f71996;
}
```

### 层叠顺序

多背景层叠顺序，越靠前层级越高，前面的遮盖后面的

## 性能优化

直接使用 box-shadow 进行动画，开销是相对较高的，可以使用 opacity+伪类实现进行优化（如果很卡的话）
