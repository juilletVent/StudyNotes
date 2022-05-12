<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [原始背景渲染区域的定义（注意与 background-clip 的区别）](#%E5%8E%9F%E5%A7%8B%E8%83%8C%E6%99%AF%E6%B8%B2%E6%9F%93%E5%8C%BA%E5%9F%9F%E7%9A%84%E5%AE%9A%E4%B9%89%E6%B3%A8%E6%84%8F%E4%B8%8E-background-clip-%E7%9A%84%E5%8C%BA%E5%88%AB)
- [背景渲染区域裁剪（background-clip）](#%E8%83%8C%E6%99%AF%E6%B8%B2%E6%9F%93%E5%8C%BA%E5%9F%9F%E8%A3%81%E5%89%AAbackground-clip)
- [background-size 缩写](#background-size-%E7%BC%A9%E5%86%99)
- [CSS 多背景](#css-%E5%A4%9A%E8%83%8C%E6%99%AF)
- [PS 相似的透明背景样例](#ps-%E7%9B%B8%E4%BC%BC%E7%9A%84%E9%80%8F%E6%98%8E%E8%83%8C%E6%99%AF%E6%A0%B7%E4%BE%8B)
- [背景重复（background-repeat）](#%E8%83%8C%E6%99%AF%E9%87%8D%E5%A4%8Dbackground-repeat)
- [背景图定位（background-position）](#%E8%83%8C%E6%99%AF%E5%9B%BE%E5%AE%9A%E4%BD%8Dbackground-position)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 原始背景渲染区域的定义（注意与 background-clip 的区别）

背景渲染区域由 background-origin 属性决定的，取值：

- content-box
- padding-box (默认)
- border-box

这个属性定义了最原始的背景渲染区域，不考虑 repeat 的情况下

## 背景渲染区域裁剪（background-clip）

通过这个属性，我们可以限定背景仅渲染在某些特定的范围内

主要取值：

- content-box
- padding-box
- border-box (默认)

## background-size 缩写

background-size 属性值只能写在 background-position 属性值的后面，并且使用斜杠分隔，其他写法都是无效的

取值：

- cover （填充）
- contain （包含）
- 数值百分比、像素值 (拉伸)
- auto （依据资源的内在尺寸、内在比例进行渲染）

_Tips：background-size 缩写兼容性并不好，建议拆分书写_

## CSS 多背景

可以设置多背景，如果多背景使用到了纯色背景，则需要使用多背景语法，**且将颜色值放到最后**：

```css
.multi-bg {
  background: linear-gradient(deepskyblue, deeppink), deepskyblue;
}
```

## PS 相似的透明背景样例

主要利用多背景，加视觉错位重合实现，非常巧妙：

```css
.bg {
  background-color: #fff;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%
    ), linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee
        75%);
  background-size: 16px 16px;
  /* 此处的position设置为size的一半即可 */
  background-position: 0 0, 8px 8px;
}
```

## 背景重复（background-repeat）

- space 在不裁剪的情况下尽量重复，多出来的空间使用 space 进行填充（均分，与 flex 布局的 space-between 表现一致）
- round 尽可能重复填充，不足一张背景时压缩其他背景图均匀分布，保证不裁剪
- repeat 重复填充，边界裁剪
- no-repeat 不重复

```css
/* 单值语法 */
background-repeat: repeat-x;
background-repeat: repeat-y;
background-repeat: repeat;
background-repeat: space;
background-repeat: round;
background-repeat: no-repeat;

/* 双值语法: 水平horizontal | 垂直vertical */
background-repeat: repeat space;
background-repeat: repeat repeat;
background-repeat: round space;
background-repeat: no-repeat round;

background-repeat: inherit;
```

## 背景图定位（background-position）

除了一般用法，还可以指定偏移的起始方向：

```css
/* 设定背景图距离底部10px，右侧20px */
background-position: bottom 10px right 20px;
```

_Tips：background-position 四个值的语法模式，对 x、y 的解析没有位置限定，left/right+数值始终被解释为 background-position-x，bottom/top+数值始终被解释为 background-position-y，三个值的语法不是很友好，理解起来也不方便，不推荐使用（详细可以查阅 MDN 文档）_

默认：

```css
background-position: 0% 0%;
background-position: left top;
```
