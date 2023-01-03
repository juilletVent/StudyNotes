<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CSS 变量基本使用与规则](#css-%E5%8F%98%E9%87%8F%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8%E4%B8%8E%E8%A7%84%E5%88%99)
- [变量使用](#%E5%8F%98%E9%87%8F%E4%BD%BF%E7%94%A8)
- [关于 var 函数参数非法的很有用的表现](#%E5%85%B3%E4%BA%8E-var-%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E9%9D%9E%E6%B3%95%E7%9A%84%E5%BE%88%E6%9C%89%E7%94%A8%E7%9A%84%E8%A1%A8%E7%8E%B0)
- [var 的空格尾随特性](#var-%E7%9A%84%E7%A9%BA%E6%A0%BC%E5%B0%BE%E9%9A%8F%E7%89%B9%E6%80%A7)
- [CSS 变量的作用域与继承性](#css-%E5%8F%98%E9%87%8F%E7%9A%84%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%8E%E7%BB%A7%E6%89%BF%E6%80%A7)
- [实现细节与特点](#%E5%AE%9E%E7%8E%B0%E7%BB%86%E8%8A%82%E4%B8%8E%E7%89%B9%E7%82%B9)
- [CSS 自定义属性的设置与获取](#css-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E7%9A%84%E8%AE%BE%E7%BD%AE%E4%B8%8E%E8%8E%B7%E5%8F%96)
  - [在 JavaScript 中设置和获取 CSS 自定义属性](#%E5%9C%A8-javascript-%E4%B8%AD%E8%AE%BE%E7%BD%AE%E5%92%8C%E8%8E%B7%E5%8F%96-css-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7)
- [小技巧：使用 content 属性显示 CSS 自定义属性值的技巧](#%E5%B0%8F%E6%8A%80%E5%B7%A7%E4%BD%BF%E7%94%A8-content-%E5%B1%9E%E6%80%A7%E6%98%BE%E7%A4%BA-css-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%9E%E6%80%A7%E5%80%BC%E7%9A%84%E6%8A%80%E5%B7%A7)
- [模拟自定义 CSS 方法](#%E6%A8%A1%E6%8B%9F%E8%87%AA%E5%AE%9A%E4%B9%89-css-%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## CSS 变量基本使用与规则

变量命名规则支持使用数字、横线与空格以及 CJK 文本，不需要转义，特殊符号需要转义

```css
:root {
  --primary-color: deepskyblue;
}
button {
  background-color: var(--primary-color);
}
```

## 变量使用

标准语法：`var( <custom-property-name> [, <declaration-value> ]? )`

`<custom-property-name>`指的就是自定义属性名；`<declaration-value>`指的是声明值，可以理解为备选值或缺省值，当前面的自定义属性一定无效时，就会使用`<declarationvalue>`定义的值

## 关于 var 函数参数非法的很有用的表现

只要第一个参数值可能有效，哪怕这个参数值是一个乱七八糟的东西，这个 var()函数依然会正常解析。下面重点来了：如果第一个参数值是不合法的，则 var()函数解析为当前 CSS 属性的初始值或继承值（如果有继承性），也就是按照 unset 全局关键字的规则渲染。（注意，只是渲染规则类似，并不等同于直接设置 unset 关键字。）

举个栗子：

```css
body {
  --color: 20px;
  background-color: deeppink;
  background-color: var(--color, deepskyblue);
}
```

这里的 var 引用了一个长度值作为颜色属性的值，显然非法，但是整个语法依然有效，那么就解析为该目标属性的初始值或继承值， background-color 没有继承性，因此解析为初始值：transparent

一个应用样例：

```css
button {
  --open: ; /* 这里的空格不能省略 */
  color: #2a80eb;
  -webkit-text-fill-color: #fff;
  border-radius: 4px;
  padding: 9px 20px;
  border: 1px solid var(--open, rgba(0, 0, 0, 0.1));
  box-shadow: var(--open, inset 0 1px 2px rgba(0, 0, 0, 0.1));
  background: var(--open, linear-gradient(#0003, transparent)) currentColor;
  text-shadow: var(--open, -1px -1px #0003);
  transition: 0.15s;
}

button:active {
  --open: inherit;
}
```

默认情况下--open 解析为空格，这是一个有可能有效的语法，因此不会使用默认值

点击按钮触发:active 伪类后，会运行--open: inherit 这个 CSS 声明，全局 CSS 关键字作为 CSS 自定义属性值一定无效，因此 var()函数会使用后备 CSS 属性值进行渲染

## var 的空格尾随特性

使用 var 进行变量引用时，默认会在尾部有一个空格，因此如果变量引用进行属性值组合时需要注意这个特性：

```css
:root {
  --rootsize: 20;
}

body {
  /* 失败，因为空格导致最终结果为：20 px */
  /* font-size: var(--rootSize)px; */
  /* 借助calc完成 */
  font-size: calc(var(--rootSize) * 1px);
}
```

## CSS 变量的作用域与继承性

CSS 变量始终作用于定义的元素位置及其子元素中，一个非常重要的特点：CSS 变量的作用域可以拓展到 Shadow DOM 中，Shadow DOM 可以引用到外界的 CSS 变量，因此可以借助这一特性，在外部修改 Shadow DOM 中的样式（另一个方法是借助::part 进行修改）

## 实现细节与特点

- 自定义变量值可以使任意值或表达式
- CSS 自定义属性值可以相互传递与引用（一个变量引用另一个变量）
- 可以应用在 calc 函数中
- 不允许自引用
- 不支持用在媒体查询中

## CSS 自定义属性的设置与获取

直接在标签的 style 属性上设置即可：

```html
<div style="--color: deepskyblue;">
  <img src="1.jpg" style="border: 10px solid var(--color);" />
</div>
```

### 在 JavaScript 中设置和获取 CSS 自定义属性

```js
// 设置
domItem.style.setProperty("--ngColor", "deepskyblue");
// 获取
getComputedStyle(domItem).getPropertyValue("--ngColor");
```

## 小技巧：使用 content 属性显示 CSS 自定义属性值的技巧

虽然 content 属性本身不支持 CSS 自定义属性值，但是 counter-reset 属性后面的计数器初始值是支持的，于是我们可以来一招“移花接木”，从而让 CSS 自定义属性值作为字符在页面中显示，这种实现可以将表现与内容均使用同一个 CSS 变量完成，可维护性很好：

```css
/* 无效 */
.bar::before {
  content: var(--percent);
}
/* 有效 */
.bar::before {
  counter-reset: progress var(--percent);
  content: counter(progress);
}
```

## 模拟自定义 CSS 方法

样例一：[（实现纯自定义 CSS 方法）](./example-src/keyword-color.js)

样例二：[（与 HTML 属性配合的自定义 CSS 方法）](./example-src/css-attr.js)

_Tips:样例一无法响应自定义 CSS 函数中引用的 CSS 变量的二次变化，需要改写，思路是将原始表达式暂存在元素的 data-set 上，依赖的 css 变量变换时再从 data-set 上取回原始表达式重新计算值_
