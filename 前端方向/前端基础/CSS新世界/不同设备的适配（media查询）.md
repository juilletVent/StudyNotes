<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [基本用法](#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
  - [媒体查询修饰符](#%E5%AA%92%E4%BD%93%E6%9F%A5%E8%AF%A2%E4%BF%AE%E9%A5%B0%E7%AC%A6)
  - [媒体类型](#%E5%AA%92%E4%BD%93%E7%B1%BB%E5%9E%8B)
  - [媒体条件](#%E5%AA%92%E4%BD%93%E6%9D%A1%E4%BB%B6)
  - [媒体特性](#%E5%AA%92%E4%BD%93%E7%89%B9%E6%80%A7)
- [系统主题（明暗）](#%E7%B3%BB%E7%BB%9F%E4%B8%BB%E9%A2%98%E6%98%8E%E6%9A%97)
  - [利用滤镜实现简单的神色模式](#%E5%88%A9%E7%94%A8%E6%BB%A4%E9%95%9C%E5%AE%9E%E7%8E%B0%E7%AE%80%E5%8D%95%E7%9A%84%E7%A5%9E%E8%89%B2%E6%A8%A1%E5%BC%8F)
- [系统关闭额外的动画效果（prefers-reduced-motion）](#%E7%B3%BB%E7%BB%9F%E5%85%B3%E9%97%AD%E9%A2%9D%E5%A4%96%E7%9A%84%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9Cprefers-reduced-motion)
- [检测是否是移动端（是否支持鼠标 hover、any-hover）](#%E6%A3%80%E6%B5%8B%E6%98%AF%E5%90%A6%E6%98%AF%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E9%BC%A0%E6%A0%87-hoverany-hover)
- [检测是否有设备支持精确点击（pointer、any-pointer）](#%E6%A3%80%E6%B5%8B%E6%98%AF%E5%90%A6%E6%9C%89%E8%AE%BE%E5%A4%87%E6%94%AF%E6%8C%81%E7%B2%BE%E7%A1%AE%E7%82%B9%E5%87%BBpointerany-pointer)
- [env 函数](#env-%E5%87%BD%E6%95%B0)
- [移动端布局适配（vw 与 rem 搭配）最佳实践](#%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%B8%83%E5%B1%80%E9%80%82%E9%85%8Dvw-%E4%B8%8E-rem-%E6%90%AD%E9%85%8D%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
  - [rem 所带来的问题](#rem-%E6%89%80%E5%B8%A6%E6%9D%A5%E7%9A%84%E9%97%AE%E9%A2%98)
- [移动端事件控制](#%E7%A7%BB%E5%8A%A8%E7%AB%AF%E4%BA%8B%E4%BB%B6%E6%8E%A7%E5%88%B6)
  - [取消移动端点击事件 300ms 的延迟](#%E5%8F%96%E6%B6%88%E7%A7%BB%E5%8A%A8%E7%AB%AF%E7%82%B9%E5%87%BB%E4%BA%8B%E4%BB%B6-300ms-%E7%9A%84%E5%BB%B6%E8%BF%9F)
  - [touch-action:none 解决 treated as passive 错误](#touch-actionnone-%E8%A7%A3%E5%86%B3-treated-as-passive-%E9%94%99%E8%AF%AF)
  - [解决报错](#%E8%A7%A3%E5%86%B3%E6%8A%A5%E9%94%99)
- [关于多倍图的加载](#%E5%85%B3%E4%BA%8E%E5%A4%9A%E5%80%8D%E5%9B%BE%E7%9A%84%E5%8A%A0%E8%BD%BD)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 基本用法

```css
@media only screen and (max-width: 480px) {
  aside {
    display: none;
  }
}
```

这个样例由这些部分构成：

- 媒体查询修饰符 only；
- 媒体类型 screen；
- 媒体条件 and；
- 媒体特性 max-width

### 媒体查询修饰符

CSS 媒体查询有两个修饰符，一个是 only，另一个是 not，其中 not 表示否定的意思，not 否定的不是媒体类型，而是后面整个查询语句

举个栗子：

```css
/* 这里的not不是指除了屏幕之外的其他设备，而是指，命中整条规则之外的其他设备：如果是不是彩色屏幕则命中规则 */
@media not screen and (color) {
  /* something... */
}
```

> 关于 only

only 修饰符很有意思，它本身并没有任何效果，将其去掉或加上，最终效果是没有任何变化，在现代浏览器中没有任何理由使用 only，直接删除就行了

_历史背景：在很早的时候，浏览器就已经开始支持@media 规则了，当年它还被用来区分 IE7 浏览器和 IE8 浏览器。这些老旧的浏览器有一个“坏习惯”，它们会忽视无法识别的媒体条件和媒体特性，例如，会把 screen and (color)识别成 screen，这很容易产生致命的样式问题。于是，为了让老旧的浏览器干脆不要识别一些新的查询语句，就设计了 only 修饰符，放在媒体类型的前面。这样 only screen and (color)查询语句中的 CSS 代码就再也不会被老旧的浏览器解析了，因为这些老旧的浏览器认为 only 是非法的。_

### 媒体类型

记住下面这几个值就行了，其他的值用处不大

- screen
- print
- all

**Tips:可以书写多个值（`@media screen, print { ... }`）**

### 媒体条件

媒体条件有 3 个，即 not、and 和 or

not 是针对整条语句起作用，因此这样的写法是非法的:`screen not (color)`

### 媒体特性

- aspect-ratio:可视区域的宽度和高度的比例
- color:0 则表示墨水瓶
- width/height:设备宽高，比较常用
- device-pixel-ratio：屏幕像素密度
- resolution：屏幕像素密度 DPI
- prefers-color-scheme：系统明暗主题查询
- prefers-reduced-motion：关闭额外的动画
- hover/any-hover：用户系统是否有方便支持 hover 的设备
- pointer/any-pointer：用户系统是否有支持精确点击的设备

## 系统主题（明暗）

相关的媒体特性：`prefers-color-scheme`

- no-preference：表示系统没有告知用户使用的颜色方案。
- light：表示系统倾向于使用浅色模式。
- dark：表示系统倾向于使用深色模式。

```css
/* 深色模式 */
@media (prefers-color-scheme: dark) {
  body {
    background: #333;
    color: white;
  }
}
/* 浅色模式 */
@media (prefers-color-scheme: light) {
  body {
    background: white;
    color: #333;
  }
}
```

> 在 JS 中判断颜色模式

```js
// 是否支持深色模式
// 返回true或false
window.matchMedia("(prefers-color-scheme: dark)").matches;
```

### 利用滤镜实现简单的神色模式

```css
@media (prefers-color-scheme: dark) {
  body {
    filter: invert(1) hue-rotate(180deg);
    background-color: #000;
  }
  img {
    /* 图片再度反相，恢复原来的样子 */
    filter: invert(1) hue-rotate(180deg);
  }
}
```

## 系统关闭额外的动画效果（prefers-reduced-motion）

如果用户在系统层面选择关闭额外的动画，则我们的网站是可以根据用户的个性化设置去匹配网站动画效果的。样例：

- reduced：用户已关闭非必要的动画
- no-preference：表示用户没有通知系统任何首选项

```css
@media (prefers-reduced-motion: reduced) {
  .example-1 {
    animation: none;
  }
  .example-2 {
    transition: none;
  }
}
```

## 检测是否是移动端（是否支持鼠标 hover、any-hover）

媒体查询特性使用 any-hover 可以判断当前设备是否具备定点输入设备，决定是否启用 hover 效果，或者常驻 hover 效果，判断是否是移动端；

另外 hover 也具备相同的效果，兼容性也更好，因此可以使用 hover(Edge12+) 替代 any-hover(Edgr16+)

- none 表示没有输入装置可以实现悬停效果，或者没有可以实现指向的输入装置。
- hover 表示一个或多个输入装置可以触发元素的悬停交互效果

样例：

```css
/* 常规hover实现 */
figcaption {
  display: none;
}
figure:hover figcaption {
  display: block;
}
/* 移动端兼容，常驻hover效果 */
@media (any-hover: none) {
  figcaption {
    display: block;
  }
}
```

## 检测是否有设备支持精确点击（pointer、any-pointer）

如果没有设备支持精确点击（一般来说，就是指代的鼠标），则在布局上就应该考虑将相关的操作区、空间的用户去做大，方便用户点击。

- none：没有可点击的设备
- coarse：至少有一个设备点击不精确（手指、触摸笔）
- fine：具备精确点击的设备（通常指代鼠标）

样例：

```css
@media (pointer: coarse) {
  input[type="checkbox"] {
    width: 100px;
    height: 100px;
  }
}
```

## env 函数

针对现在各种异形屏，刘海屏，需要设置网页安全边距，env 函数目前能做的为数不多的工作之一

_Tips：env 传入的属性名是区分大小写的_

_Tips:viewport-fit 目前（2022-06-10 15:55:50）在标准文档中还没有规范化，仅仅是 IOS 平台适配，因此可能查不到_

```css
/* 直接使用4个安全内边距值 */
padding-top: env(safe-area-inset-top);
padding-right: env(safe-area-inset-right);
padding-bottom: env(safe-area-inset-bottom);
padding-left: env(safe-area-inset-left);
/* 使用4个安全内边距值，同时设置兜底尺寸值 */
padding-top: env(safe-area-inset-top, 20px);
padding-right: env(safe-area-inset-right, 1em);
padding-bottom: env(safe-area-inset-bottom, 0.5vh);
padding-left: env(safe-area-inset-left, 1.4rem);
```

**重点：要想使 safe-area-inset-\*属性表现出准确的间距，一定要确保 viewport 相关的`<meta>`信息如下：**

```html
<meta name="viewport" content="viewport-fit=cover" />
```

## 移动端布局适配（vw 与 rem 搭配）最佳实践

原理：将 html 的 font-size 基于屏幕宽度 100vw 进行动态计算调整，然后页面布局使用 rem 完成，最终得到的呈现效果如果换到其他分辨率的设备也能沟将布局与字体大小等比例缩放，整个布局是弹性的，在不同设备上呈现的效果就与设计稿一致了

简单样例：

```css
html {
  font-size: 16px;
}
@media screen and (min-width: 375px) {
  html {
    /* 375px宽度使用16px基准尺寸，414px宽度时根字号大小正好是18px */
    font-size: calc(16px + 2 * (100vw - 375px) / 39);
  }
}
@media screen and (min-width: 414px) {
  html {
    font-size: 18px;
  }
}
```

> 最佳实践

```css
html {
  font-size: 16px;
}
@media screen and (min-width: 375px) {
  html {
    /* 375px作为16px基准，414px宽度时正好对应18px的根字号大小 */
    font-size: calc(16px + 2 * (100vw - 375px) / 39);
  }
}
@media screen and (min-width: 414px) {
  html {
    /* 屏幕宽度从414px到1000px，根字号大小累积增加4px（18px-22px）*/
    font-size: calc(18px + 4 * (100vw - 414px) / 586);
  }
}
@media screen and (min-width: 1000px) {
  html {
    /* 屏幕宽度从1000px往后每增加100px，根字号大小就增加0.5px */
    font-size: calc(22px + 5 * (100vw - 1000px) / 1000);
  }
}
```

精简一点的，但是没有那么精细化的控制（不支持 IE）：

```css
html {
  font-size: 16px;
  font-size: clamp(16px, calc(16px + 2 * (100vw - 375px) / 39), 22px);
}
```

### rem 所带来的问题

> 当 SVG 图标尺寸不是整数的时候，边缘可能会出现奇怪的间隙；又如，需要精确知道若干个列表的高度之和的时候，如果列表的高度不是整数，则最终的高度值和实际的渲染高度值会有误差。在这些场景下，可以将对应元素的 rem 单位改成 px 单位进行表示

## 移动端事件控制

### 取消移动端点击事件 300ms 的延迟

移动端为了避免点击事件和双击事件发生冲突，设计了点击事件延迟 300ms 触发，如果我们禁止元素触发双击事件，则这个问题就解决了：

```css
/* 只允许进行滚动和持续缩放操作 */
touch-action: manipulation;
```

### touch-action:none 解决 treated as passive 错误

取值：

- touch-action: auto;
- touch-action: manipulation; 表示浏览器只允许进行滚动和持续缩放操作
- touch-action: none;不进行任何手势相关的行为
- touch-action: pan-x;表示支持手指头水平移来移去的操作。
- touch-action: pan-y;表示支持手指头垂直移来移去的操作。
- touch-action: pan-left;
- touch-action: pan-right;
- touch-action: pan-up;
- touch-action: pan-down;
- touch-action: pinch-zoom;表示支持手指头缩放页面的操作

_Tips:上述部分属性值可以组合使用，pan-x、pan-left 和 panright 一组，pan-y、pan-up 和 pan-down 一组，pan-zoom 单独一组。这 3 组属性值可以任意组合_

```css
touch-action: pan-left pan-up pan-zoom;
```

### 解决报错

```css
touch-action: none;
```

```js
// js 正常执行，不会报错了
document.addEventListener("touchmove", function (event) {
  event.preventDefault();
});
```

上述方法 CSS 改变了了元素默认行为，如果是一般场景，需要通过 js 动态控制，则最好使用下面的方法：

```js
document.addEventListener(
  "touchmove",
  function (event) {
    event.preventDefault();
  },
  {
    // 告知引擎，此事件有可能被阻止，默认值是TRUE，因此回调事件中默认是无法调用preventDefault的
    passive: false,
  }
);
```

[参考说明 1](https://www.cnblogs.com/L-xmin/p/12495065.html)&nbsp;|&nbsp;
[参考说明 2](https://www.jianshu.com/p/04bf173826aa)

## 关于多倍图的加载

```css
.image-set {
  width: 128px;
  height: 96px;
  background: url(fallback.jpg);
  background: image-set(
    url(w128px.jpg) 1x,
    url(w256px.jpg) 2x,
    url(w512px.jpg) 3x
  );
  background-size: cover;
}
```

HTML 中有一个名为 srcset 的属性，这个属性与 image-set() 函数无论是名称还是语法都有相似之处，例如：

```html
<img src="1.jpg" srcset="1-2x.png 2x" />
```

使用 media 完成：

```css
@media (resolution: 2dppx) {
  .example {
    background: url(1-2x.jpg);
  }
}
@media (min-resolution: 3dppx) {
  .example {
    background: url(1-3x.jpg);
  }
}
```
