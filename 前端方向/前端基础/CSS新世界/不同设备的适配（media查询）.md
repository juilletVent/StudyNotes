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
