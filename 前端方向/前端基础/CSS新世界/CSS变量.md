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
